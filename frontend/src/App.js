import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import Header from "./components/Header.js"
import MapComponent from "./components/mapComponent.js"
import LoginWindow from "./components/loginWindow.js"

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
      <Header />
      {loggedIn ? (
        <div>
          <MapComponent apiKey = {apiKey}/>
          <button onClick ={logout}>
            Log out
          </button>
        </div>
      ):
        (<LoginWindow loginFunc = {loginFunc}/>)
      }
    </div>
  );
}

export default App;
