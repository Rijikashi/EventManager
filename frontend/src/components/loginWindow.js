import { useState, useEffect } from 'react'
import NewUserForm from './newUserForm.js'

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
    const res = await fetch("http://localhost:3001/login/" + username + "/<" + password)
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
    <div>
      {loginFailure ? (<h3> Login Failed </h3>) : (<></>)}
      <form onSubmit = {onSubmit}>
        <div className='form-control'>
        <label>Username</label>
          <input
            type='text'
            value= {username}
            onChange={(e) => { setUsername(e.target.value); setLoginFailure(false);setCreateAccountSuccess(false)}}
          />
        </div>
        <div className='form-control'>
          <label>Password</label>
          <input
            type='password'
            value= {password}
            onChange={(e) => {setPassword(e.target.value); setLoginFailure(false); setCreateAccountSuccess(false)}}
          />
        </div>
       <input type='submit' value='Login' className='btn btn-block' />
      </form>
      {createAccountSuccess ? (<h3> Account successfully created! </h3>) : (<></>)}
      <NewUserForm createAccountSuccessTrue = {createAccountSuccessTrue}/>
    </div>
  )
}

export default LoginWindow

// <form onSubmit = {onSubmit}>
//  <input type='submit' value='Save CV' className='btn btn-block' />
// </form>
