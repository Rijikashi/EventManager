import './App.css';
import { useState } from 'react'
import Header from "./components/Header.js"
import LoginWindow from "./components/loginWindow.js"
import Main from "./components/main.js"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [userObj, setUserObj] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  const loginFunc = (userJSON) => {
    setLoggedIn(true)
    setUserObj(userJSON)
  }

  const logout = () => {
    setLoggedIn(false)
    setUserObj([])
  }
  return (
    <div className = 'home'>
      <Header loggedIn = {loggedIn} logout = {logout}/>
      {loggedIn ? (
        <Main userObj = {userObj} />
      ):
        (<LoginWindow loginFunc = {loginFunc}/>)
      }
    </div>
  );
}

export default App;
