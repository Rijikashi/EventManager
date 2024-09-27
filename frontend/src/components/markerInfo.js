import { Marker, InfoWindow} from '@react-google-maps/api'
import { useState,useEffect } from 'react'
import InfoWindowDetails from './infoWindowDetails.js'


const MarkerInfo = ({key, marker, userObj, keyPressed, setKeyPressed}) => {
  const [showMarker, setShowMarker] = useState(true)
  const position = {
    lat:marker["latitude"],
    lng:marker["longitude"]
  }
  const markerOnClick = (e) => {
    setShowMarker(false)
  }
  const windowOnCloseClick = (e) => {
    setShowMarker(true)
    setKeyPressed(0)
  }

  useEffect(() => {
    if(marker.id == keyPressed){
      setShowMarker(false)
    }
}, [keyPressed]);

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
