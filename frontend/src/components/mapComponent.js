import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

const MapComponent = () => {
  const [center, setCenter] = useState(
    {
      lat: 0,
      lng: 0
    }
  )
  const [apiKey, setApiKey] = useState ("")

  const keyRequest = () => {
    let jsonurl = "http://localhost:3001/apiKey"
    //"http://localhost:3001/events/search/TestingLocation"
    fetch(jsonurl)
    .then(res => res.json())
    .then(
      (result) => {
        setApiKey(result);
      },
      (error) => {

      }
    )
  }

  useEffect ( () => {
    navigator.geolocation.getCurrentPosition(function(position) {
    const tempCenter = {
      lat:position.coords.latitude,
      lng:position.coords.longitude
    }
    setCenter(tempCenter)
  });
    keyRequest()
  }, [])

  return (
    <div>
      Hi from maps!
    </div>
  )
}
export default MapComponent
