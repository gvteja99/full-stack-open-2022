import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContact = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteContact = obj => {
    const deleteURL = `${baseUrl}/${obj.id}`
    const request = axios.delete(deleteURL)
    return request.then(response => response.data)
  }
  

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

export default { getAllContacts, createContact, deleteContact }
