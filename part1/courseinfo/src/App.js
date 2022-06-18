const Header = (props) => (
  <div>
    <h2>{props.name}</h2>
  </div>)

const Part = (props) => (
  <div>
    <p>{props.part} {props.exercise}</p>
  </div>
)

const Content = (props) => {
  return (<div>
    {props.parts.map( part => <Part part = {part.name} exercise={part.exercises} />)}
  </div>)
}

const Total = (props) => {
  const total = props.parts.reduce((partialSum, a) => partialSum + a.exercises, 0)
  return(
  <div>
    <p><b>Number of exercises {total}</b></p>
  </div>
  )
}

const Course = (props) => {
  return (<div>
            <Header name={props.course.name}/>
            <Content parts={props.course.parts}/>
            <Total parts={props.course.parts}/>
          </div>)
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (<div>
    <h1>Web development curriculum</h1>
    {courses.map(course => <Course course={course} />)}
    </div>)
}


export default App