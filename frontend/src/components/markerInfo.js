import { Marker, InfoWindow} from '@react-google-maps/api'
import { useState } from 'react'
import InfoWindowDetails from './infoWindowDetails.js'


const MarkerInfo = ({key, marker, userObj}) => {
  const [showMarker, setShowMarker] = useState(true)
  const position = {
    lat:marker["latitude"],
    lng:marker["longitude"]
  }
  const markerOnClick = (e) => {
    console.log("registered marker on click")
    console.log(marker)
    setShowMarker(false)
  }
  const windowOnCloseClick = (e) => {
    setShowMarker(true)
  }
  return(
    <div>
    {showMarker ? (<Marker
      onClick = {markerOnClick}
      position={position}
      />)
      :
      (<InfoWindow
      position = {position}
      onCloseClick = {windowOnCloseClick}
      >
      <InfoWindowDetails marker = {marker} userObj = {userObj}/>
      </InfoWindow>)
    }
    </div>
  )
}
export default MarkerInfo
