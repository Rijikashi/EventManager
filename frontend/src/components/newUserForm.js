import Modal from 'react-modal';
import {useState, useEffect} from 'react'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root')

const NewUserForm = ({createAccountSuccessTrue}) => {
  const [newUser, setNewUser] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState(0)

  const toggleNewUser = () => {
    setNewUser(!newUser)
  }

  const postNewUser = async () => {
    const res = await fetch("http://localhost:3001/users/createNewUser/"
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
    <div>
      <button onClick = {toggleNewUser}>
        Create new account!
      </button>
      <Modal
       isOpen={newUser}
       onRequestClose={toggleNewUser}
       style={customStyles}
       contentLabel="New User Modal"
       >
       <form onSubmit = {onSubmit}>
         <div className='form-control'>
         <label>Username</label>
           <input
             type='text'
             value= {username}
             onChange={(e) => { setUsername(e.target.value)}}
           />
         </div>
         <div className='form-control'>
           <label>Password</label>
           <input
             type='text'
             value= {password}
             onChange={(e) => {setPassword(e.target.value)}}
           />
         </div>
         <div className='form-control'>
           <label>Age</label>
           <input
             type='text'
             value= {age}
             onChange={(e) => {setAge(e.target.value)}}
           />
         </div>
        <input type='submit' value='Create' className='btn btn-block' />
       </form>
       </Modal>
    </div>
  )
}
export default NewUserForm
