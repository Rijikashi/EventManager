import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Button from 'react-bootstrap/Button'
import MapComponent from './mapComponent.js'
import Sidebar from './sideBar.js'
import {useState, useEffect} from 'react'

const Main = ( {apiKey, userObj} ) => {
  const [items, setItems] = useState([])
  const [eventQueried, setEventQueried] = useState(false)

  return (
    <div className = "main">
      {eventQueried ? (
        <Sidebar items = {items} setClose = {setEventQueried}/>
      ) : (<></>)
    }
      <div className = 'map-component-container'>
        <MapComponent apiKey = {apiKey} userObj = {userObj} items = {items} setItems = {setItems} eventQueried = {eventQueried} setEventQueried = {setEventQueried}/>
      </div>
    </div>
  )

}

export default Main
