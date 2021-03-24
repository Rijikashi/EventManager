import { Marker, InfoWindow} from '@react-google-maps/api'
import { useState, useEffect } from 'react'

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}

const MarkerInfo = ({key, marker}) => {
  const [showMarker, setShowMarker] = useState(true)
  const position = {
    lat:marker["latitude"],
    lng:marker["longitude"]
  }
  const markerOnLoad = (marker) => {
    console.log("marker loaded")
  }
  const windowOnLoad = (infoWindow) => {
  console.log('infoWindow: ', infoWindow)
}
  const markerOnClick = (e) => {
    console.log("registered marker on click")
    setShowMarker(false)
  }
  const windowOnCloseClick = (e) => {
    setShowMarker(true)
  }
  return(
    <div>
    {showMarker ? (<Marker
      onLoad={markerOnLoad}
      onClick = {markerOnClick}
      position={position}
      />)
      :
      (<InfoWindow
      onLoad = {windowOnLoad}
      position = {position}
      onCloseClick = {windowOnCloseClick}
      >
      <div style={divStyle}>
        <h1>{JSON.stringify(marker)}</h1>
      </div>
      </InfoWindow>)
    }
    </div>
  )
}
export default MarkerInfo
