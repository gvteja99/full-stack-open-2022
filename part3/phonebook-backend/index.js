require('dotenv').config();

const express = require('express')
const app = express()
const cors = require("cors")
var morgan = require('morgan')
const mongoose = require('mongoose')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())


const Person = require('./models/person')

var contacts = [];

morgan.token('body', function getId (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (request, response) => {
  response.send('<h1>Hellowow World!</h1>')
})


app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${contacts.length} people<\p><p>${new Date()}<\p>`)
})


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    contacts = persons;
    return response.json(persons)
    }).catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'field missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))

})


app.get('/api/persons/:id', (request, response, next) => {
    // const id = request.params.id
    // const person = contacts.find(person => person.id === id)
    // person ? response.json(person) : response.status(404).end()

    Person.findById(request.params.id)
    .then(person => {if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }}).catch(error => next(error))

})

app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  console.log(body)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'field missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(body.id, person, {new: true})
  .then(updatedNote => {
    response.json(updatedNote)
  })
  .catch(error => next(error))

})


app.delete('/api/persons/:id', (request, response, next) => {
    const doc_id = request.params.id
    Person.findOneAndRemove({_id: doc_id}).then(person => {if (person){
                                                              person.remove()
                                                              return response.status(204).end()
                                                            } else {
                                                              return response.status(403).end()
                                                            }}).catch(error => next(error))

  
  })  

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)
  

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    // console.log(corsOptions);
  console.log(`Server running on port ${PORT}`)
})
