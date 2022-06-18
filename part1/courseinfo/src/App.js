const Hello = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>)

const Part = (props) => (
  <div>
    <p>{props.part} {props.exercise}</p>
  </div>
)

const Content = (props) => {
  console.log(props)
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

const App = () => {
  const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

    const parts = [part1, part2, part3]

  return (
    <div>
      <Hello course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App