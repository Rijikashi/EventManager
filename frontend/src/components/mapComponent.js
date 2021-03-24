import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript} from '@react-google-maps/api'
import MarkerInfo from "./markerInfo.js"
import NewEvent from "./newEvent.js"
const containerStyle = {
  width: '500px',
  height: '500px'
};

const MapComponent = ({apiKey}) => {
  const [center, setCenter] = useState(
    {
      lat: 0,
      lng: 0
    }
  )
  const [items, setItems] = useState([])
  const [eventQueried, setEventQueried] = useState(false)

  useEffect ( () => {
    navigator.geolocation.getCurrentPosition(function(position) {
    const tempCenter = {
      lat:position.coords.latitude,
      lng:position.coords.longitude
    }
    setCenter(tempCenter)
  });

  }, [])


  //need to change so it queries surrounding area
  const eventQuery = async () => {
    const res = await fetch("http://localhost:3001/events/search/TestingLocation")
    const data = await res.json()
    setItems(data)
    setEventQueried(true)
  }

  return (
    <LoadScript
      googleMapsApiKey= {apiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      { eventQueried ? (items.map((item) => {
        return <MarkerInfo key = {item["id"]} marker = {item}/>
      })) : (<></>)
      }
 // ADD stuff here
      </GoogleMap>

      <button onClick = {eventQuery}>
        Search nearby events
      </button>
      <NewEvent />
    </LoadScript>
  )
}
export default MapComponent
