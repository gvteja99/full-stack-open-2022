const Header = (props) => (
  <div>
    <h1>{props.name}</h1>
  </div>)

const Part = (props) => (
  <div>
    <p>{props.part} {props.exercise}</p>
  </div>
)

const Content = (props) => {
  return (<div>
    <Part part = {props.parts[0].name} exercise={props.parts[0].exercises} />
    <Part part = {props.parts[1].name} exercise={props.parts[1].exercises} />
    <Part part = {props.parts[2].name} exercise={props.parts[2].exercises} />
  </div>)
}

const Total = (props) => (
  <div>
    <p>Number of exercises {props.parts.reduce((partialSum, a) => partialSum + a.exercises, 0)}</p>
  </div>
)


const Course = (props) => {
  return (<div>
            <Header name={props.course.name}/>
            <Content parts={props.course.parts}/>
          </div>)
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}


export default App