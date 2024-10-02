import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import MapComponent from './mapComponent.js'
import Sidebar from './sideBar.js'
import {useState} from 'react'

const Main = ( {userObj} ) => {
  const [items, setItems] = useState([])
  const [eventQueried, setEventQueried] = useState(false)
  const [keyPressed, setKeyPressed] = useState(0)

  return (
    <div className = "main">
      {eventQueried ? (
        <Sidebar items = {items} setClose = {setEventQueried} setKeyPressed = {setKeyPressed}/>
      ) : (<></>)
    }
      <div className = 'map-component-container'>
        <MapComponent userObj = {userObj} items = {items}
        setItems = {setItems} eventQueried = {eventQueried} setEventQueried = {setEventQueried}
        keyPressed = {keyPressed} setKeyPressed = {setKeyPressed}/>
      </div>
    </div>
  )

}

export default Main
