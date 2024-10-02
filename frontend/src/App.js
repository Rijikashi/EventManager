import './App.css';
import { useState, useEffect } from 'react'
import Header from "./components/Header.js"
import MapComponent from "./components/mapComponent.js"
import LoginWindow from "./components/loginWindow.js"
import Main from "./components/main.js"
import 'bootstrap/dist/css/bootstrap.min.css'

const backendURL = process.env.REACT_APP_BACKEND_DEV_URL;

function App() {
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
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
        <Main apikey = {apiKey} userObj = {userObj} />
      ):
        (<LoginWindow loginFunc = {loginFunc}/>)
      }
      <span>api key is : {apiKey}</span>
    </div>
  );
}

export default App;
