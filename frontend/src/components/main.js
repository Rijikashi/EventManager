import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Button from 'react-bootstrap/Button'
import MapComponent from './mapComponent.js'
import Sidebar from './sideBar.js'
const Main = ( {apiKey, userObj} ) => {
  return (
    <div className = "main">
      <Sidebar />
      <div className = 'map-component-container'>
        <MapComponent apiKey = {apiKey} userObj = {userObj}/>
      </div>
    </div>
  )

}

export default Main
