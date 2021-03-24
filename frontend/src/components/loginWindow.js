import { useState, useEffect } from 'react'

const LoginWindow = ({loginFunc}) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userObj, setUserObj] = useState([])
  const [success,setSuccess] = useState(false)
  const [loginFailure,setLoginFailure] = useState(false)

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
    console.log(userObj)
    if(userObj.length === 0){
      console.log("blanks")
    }
    else{
      console.log("ran this???")
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
            onChange={(e) => { setUsername(e.target.value); setLoginFailure(false) }}
          />
        </div>
        <div className='form-control'>
          <label>Password</label>
          <input
            type='text'
            value= {password}
            onChange={(e) => {setPassword(e.target.value); setLoginFailure(false)}}
          />
        </div>
       <input type='submit' value='Login' className='btn btn-block' />
      </form>
    </div>
  )
}

export default LoginWindow

// <form onSubmit = {onSubmit}>
//  <input type='submit' value='Save CV' className='btn btn-block' />
// </form>
