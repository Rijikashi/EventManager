import { useState, useEffect } from 'react'
import NewUserForm from './newUserForm.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const backendURL = process.env.REACT_APP_BACKEND_DEV_URL;

const LoginWindow = ({loginFunc}) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userObj, setUserObj] = useState([])
  const [success,setSuccess] = useState(false)
  const [loginFailure,setLoginFailure] = useState(false)
  const [createAccountSuccess, setCreateAccountSuccess] = useState(false)

  const createAccountSuccessTrue = () => {
    setCreateAccountSuccess(true)
  }
  const loginRequest = async () => {
    const res = await fetch(backendURL+"login/" + username + "/<" + password)
    if(res["status"] === 400){
      setLoginFailure(true)
    }
    else{
      const data = await res.json()
      setUserObj(data)
      setSuccess(true)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    loginRequest()
  }

  useEffect( () => {
    if(userObj.length === 0){
    }
    else{
      loginFunc(userObj)
    }
  }, [userObj])

  return (
    <div className = 'loginWindow'>
      {loginFailure ? (<h3> Login Failed </h3>) : (<></>)}
      <Jumbotron className = 'jumbotron'>
        <Form onSubmit = {onSubmit}>
          <Form.Label className="text-center">Username: </Form.Label>
          <Form.Control type='text' value= {username}
            onChange={(e) => { setUsername(e.target.value); setLoginFailure(false);setCreateAccountSuccess(false)}}
          />
          <Form.Label className="text-center">Password: </Form.Label>
          <Form.Control
            type='password'
            value= {password}
            onChange={(e) => {setPassword(e.target.value); setLoginFailure(false); setCreateAccountSuccess(false)}}
          />
          <Button style={{ margin: '10px' }} variant="secondary" type="submit">
            Login
          </Button>
        </Form>
      </Jumbotron>
      {createAccountSuccess ? (<h3> Account successfully created! </h3>) : (<></>)}
      <NewUserForm createAccountSuccessTrue = {createAccountSuccessTrue}/>
    </div>
  )
}

export default LoginWindow

// <form onSubmit = {onSubmit}>
//  <input type='submit' value='Save CV' className='btn btn-block' />
// </form>
