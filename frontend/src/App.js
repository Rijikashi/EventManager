import './App.css';
import { useState, useEffect } from 'react'
import Header from "./components/Header.js"
import MapComponent from "./components/mapComponent.js"
import LoginWindow from "./components/loginWindow.js"
import 'bootstrap/dist/css/bootstrap.min.css'

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
      const res = await fetch("http://localhost:3001/getApiKey")
      const data = await res.json()
      setApiKey(data["key"])
    }
    keyRequest()
  }, [])
  return (
    <div>
      <Header loggedIn = {loggedIn} logout = {logout}/>
      {loggedIn ? (
        <div className = 'map-component-container'>
          <MapComponent apiKey = {apiKey} userObj = {userObj}/>
        </div>
      ):
        (<LoginWindow loginFunc = {loginFunc}/>)
      }
    </div>
  );
}

export default App;
