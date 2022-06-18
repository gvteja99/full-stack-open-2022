const Hello = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>)

const Part = (props) => (
  <div>
    <p>{props.part} {props.exercise}</p>
  </div>
)

const Content = (props) => (
  <div>
    <Part part = {props.parts[0]} exercise={props.exercisesList[0]} />
    <Part part = {props.parts[1]} exercise={props.exercisesList[1]} />
    <Part part = {props.parts[2]} exercise={props.exercisesList[2]} />
  </div>
)

const Total = (props) => (
  <div>
    <p>Number of exercises {props.exercisesList.reduce((partialSum, a) => partialSum + a, 0)}</p>
  </div>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Hello course={course} />
      <Content parts={[part1, part2, part3]} exercisesList={[exercises1, exercises2, exercises3]} />
      <Total exercisesList={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App