const ErrorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  }
  
  
  
  const Error = ({ message }) => {
      if (message === '') {
        return null
      }
    
      return (
        <div style={ErrorStyle} className='error'>
          {message}
        </div>
      )
    }
  
  export default Error