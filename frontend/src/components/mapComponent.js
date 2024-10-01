import { useState, useEffect, useRef } from 'react'
import { GoogleMap, LoadScript, Circle} from '@react-google-maps/api'
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

const MapComponent = ({apiKey, userObj, items, setItems, eventQueried,setEventQueried,
  keyPressed, setKeyPressed}) => {
  const [center, setCenter] = useState(
    {
      lat: 37.773972,
      lng: -122.431297
    }
  )
  const [mapObj, setMapObj] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(14);
  const [searchLocation, setSearchLocation] = useState("")

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

  const calculateRadius = (zoom) => {
    return Math.round(Math.pow(2,14-zoom) * 60); // Example formula (default radius = 500 at zoom 14)
  };
  const circleOptions = {
    strokeColor: "#0000FF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#0000FF",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: calculateRadius(zoomLevel), // Radius in meters
    zIndex: 1
  };

  const eventQuery = async () => {
    let bounds = mapObj.getBounds()
    let upper_lat = bounds.getNorthEast().lat()
    let upper_lng = bounds.getNorthEast().lng()
    let lower_lat = bounds.getSouthWest().lat()
    let lower_lng = bounds.getSouthWest().lng()
    const res = await fetch(backendURL+"events/findNearby/"
    + lower_lat + "/" + upper_lat + "/" + lower_lng + "/" + upper_lng
    )
    const data = await res.json()
    changeDate(data)
    setItems(data)
    setEventQueried(true)
  }
  const changeDate = (data) => {
    for (let i = 0;i<data.length;i++){
      let date = new Date(data[i]['time'])
      let readableDate = date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      });
      data[i]['time'] = readableDate
    }
  }
  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchLocation }, (results, status) => {
      if (status === "OK") {
        const geo_location = results[0].geometry.location;
        setCenter({ lat: geo_location.lat(), lng: geo_location.lng() });
        if (mapObj) {
          mapObj.panTo({ lat: geo_location.lat(), lng: geo_location.lng() });
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  return (
      <LoadScript
        googleMapsApiKey= {apiKey}
        className = 'google-map-container'
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoomLevel}
          onLoad = {onLoad}
          onZoomChanged={() => {
            if (mapObj) {
              setZoomLevel(mapObj.getZoom());
            }
          }}
        >
          <Circle center = {center} options = {circleOptions} />
          { eventQueried ? (items.map((item) => {
            return <MarkerInfo key = {item.id} marker = {item} userObj = {userObj}
            keyPressed = {keyPressed} setKeyPressed = {setKeyPressed}/>
          })) : (<></>)
          }
        </GoogleMap>
        <div className = 'overlay-container'>
          <div className = 'button-overlay'>
            <Button className = 'rounded' variant = 'light' onClick = {eventQuery}>
              Search nearby events
            </Button>
            <NewEvent center = {center} userObj = {userObj}/>
          </div>
          <div className = "search-container">
            <input
              type="text"
              className = "search-bar"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search for a location"
            />
            <button className = 'searchbutton' onClick={handleSearch}>🔍</button>
          </div>
        </div>
      </LoadScript>
  )
}
export default MapComponent
