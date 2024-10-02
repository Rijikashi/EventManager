import './App.css';
import { useState, useEffect } from 'react'
import Header from "./components/Header.js"
import MapComponent from "./components/mapComponent.js"
import LoginWindow from "./components/loginWindow.js"
import Main from "./components/main.js"
import 'bootstrap/dist/css/bootstrap.min.css'

const backendURL = process.env.REACT_APP_BACKEND_DEV_URL;

function App() {
  const [apiKey, setApiKey] = useState("")
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
  useEffect( () => {
    const keyRequest = async () => {
      console.log("backend URL is: " + backendURL)
      const res = await fetch(backendURL+"getApiKey")
      const data = await res.json()
      setApiKey(data["key"])
    }
    keyRequest()
    console.log(apiKey)
  }, [])
  return (
    <div className = 'home'>
      <Header loggedIn = {loggedIn} logout = {logout}/>
      {loggedIn ? (
        <Main apikey = {apiKey} userObj = {userObj} />
      ):
        (<LoginWindow loginFunc = {loginFunc}/>)
      }
    </div>
  );
}

export default App;
