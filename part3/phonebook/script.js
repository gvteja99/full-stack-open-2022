const express = require('express')
const app = express()
const cors = require("cors")
var morgan = require('morgan')

const corsOptions = { credentials: true, origin: "http://localhost:3000" }

app.use(cors(corsOptions))

morgan.token('body', function getId (req) {
  // console.log(JSON.stringify(obj))
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let persons = [
                { 
                    "id": 1,
                    "name": "Arto Hellas", 
                    "number": "040-123456"
                },
                { 
                    "id": 2,
                    "name": "Ada Lovelace", 
                    "number": "39-44-5323523"
                },
                { 
                    "id": 3,
                    "name": "Dan Abramov", 
                    "number": "12-43-234345"
                },
                { 
                    "id": 4,
                    "name": "Mary Poppendieck", 
                    "number": "39-23-6423122"
                }
            ]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hellowow World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people<\p><p>${new Date()}<\p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'field missing' 
    })
  } else if (persons.filter(person => person.name === body.name).length != 0) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: body.id,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(body)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    person ? response.json(person) : response.status(404).end()
})

// app.put('/api/persons/:id', (request, response) => {
//   const body = request.body

//   console.log(body)

//   if (!body.name || !body.number) {
//     return response.status(400).json({ 
//       error: 'field missing' 
//     })
//   }

//   const person = {
//     id: body.id,
//     name: body.name,
//     number: body.number,
//   }

//   persons[body.id-1] = person
//   response.json(body)
// })


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })  


const PORT = 3001
app.listen(PORT, () => {
    console.log(corsOptions);
  console.log(`Server running on port ${PORT}`)
})
