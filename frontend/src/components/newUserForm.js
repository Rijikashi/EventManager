import {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import '../App.css'

const backendURL = process.env.REACT_APP_BACKEND_DEV_URL;

const NewUserForm = ({createAccountSuccessTrue}) => {
  const [newUser, setNewUser] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState(0)

  const toggleNewUser = () => {
    setNewUser(!newUser)
  }

  const postNewUser = async () => {
    const res = await fetch(backendURL+"users/createNewUser/"
    + username + "/" +password + "/"+age, {
      method: 'POST'
    })
    const data = await res.json()
    setUsername("")
    setPassword("")
    setAge(0)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    toggleNewUser()
    postNewUser()
    createAccountSuccessTrue()
  }
  return (
    <div className = 'newUserButtonContainer'>
      <Button onClick = {toggleNewUser} className = 'newUserButton'>
        Create new Account!
      </Button>
      <Modal show = {newUser} onHide = {toggleNewUser}>
       <Form onSubmit = {onSubmit}>
         <Form.Label>Username (required)</Form.Label>
           <Form.Control type='text' value= {username} placeholder = "Username"
             onChange={(e) => { setUsername(e.target.value)}}
           />
           <Form.Label>Password (required)</Form.Label>
           <Form.Control type='password' value= {password} placeholder = "Password"
             onChange={(e) => {setPassword(e.target.value)}}
           />
           <Form.Label>Age</Form.Label>
           <Form.Control type='text' value= {age} placeholder = "Age"
             onChange={(e) => {setAge(e.target.value)}}
           />
           <Button variant="secondary" type="submit" className = 'signUpButton'>
             Sign Up
           </Button>
        </Form>
      </Modal>
    </div>
  )
}
export default NewUserForm
