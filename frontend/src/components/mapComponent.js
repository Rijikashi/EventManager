import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript} from '@react-google-maps/api'
import Button from 'react-bootstrap/Button'
import MarkerInfo from "./markerInfo.js"
import NewEvent from "./newEvent.js"
import '../App.css'

import React from 'react'

const backendURL = process.env.REACT_APP_BACKEND_DEV_URL;

const containerStyle = {
  width: '100%',
  height: '100%'
};

const MapComponent = ({apiKey, userObj}) => {
  const [center, setCenter] = useState(
    {
      lat: 0,
      lng: 0
    }
  )
  const [items, setItems] = useState([])
  const [eventQueried, setEventQueried] = useState(false)
  const [mapObj, setMapObj] = useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMapObj(map)
  }, [])

  useEffect ( () => {
    navigator.geolocation.getCurrentPosition(function(position) {
    const tempCenter = {
      lat:position.coords.latitude,
      lng:position.coords.longitude
    }
    setCenter(tempCenter)
  });
}, [])

  const eventQuery = async () => {
    let bounds = mapObj.getBounds()
    let upper_lat = bounds.getNorthEast().lat()
    let upper_lng = bounds.getNorthEast().lng()
    let lower_lat = bounds.getSouthWest().lat()
    let lower_lng = bounds.getSouthWest().lng()
    console.log("event query", bounds)
    const res = await fetch(backendURL+"events/findNearby/"
    + lower_lat + "/" + upper_lat + "/" + lower_lng + "/" + upper_lng
    )
    const data = await res.json()
    setItems(data)
    setEventQueried(true)
  }

  return (
    <LoadScript
      googleMapsApiKey= {apiKey}
      className = 'google-map-container'
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad = {onLoad}
      >
        { eventQueried ? (items.map((item) => {
          return <MarkerInfo key = {item["id"]} marker = {item} userObj = {userObj}/>
        })) : (<></>)
        }
      </GoogleMap>
      <div className = 'button-overlay'>
        <Button variant = 'light' onClick = {eventQuery}>
          Search nearby events
        </Button>
        <NewEvent center = {center} userObj = {userObj}/>
      </div>
    </LoadScript>
  )
}
export default MapComponent
