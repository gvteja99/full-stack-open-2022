import React from 'react'

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

  export default Course