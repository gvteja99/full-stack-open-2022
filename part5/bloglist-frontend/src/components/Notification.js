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
  
const NotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  }
  
  
  const Notification = ({ message }) => {
      if (message === '') {
        return null
      }
      
      if (message.startsWith("NOTIFICATION_MESSAGE|")){
        message = message.substr(21)
        return (
          <div style={NotificationStyle} className='notification'>
            {message}
          </div>
      )} else if (message.startsWith("ERROR_MESSAGE|")){
        message = message.substr(14)
        return (
          <div style={ErrorStyle} className='error'>
            {message}
          </div>
      )}
    }
  
  export default Notification