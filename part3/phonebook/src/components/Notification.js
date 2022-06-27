const notificationStyle = {
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
  
    return (
      <div style={notificationStyle} className='notification'>
        {message}
      </div>
    )
  }

export default Notification