import {useEffect, useState, useRef} from 'react'
import { GoogleMap, Marker, Circle} from '@react-google-maps/api'
import DateTimePicker from 'react-datetime-picker';

const backendURL = process.env.REACT_APP_BACKEND_DEV_URL;

const containerStyle = {
  width: '500px',
  height: '500px'
};

const NewEventForm = ({center, toggleNewEvent, setNewEventSuccess, userObj, setNewEventFailure}) => {
  const [eventName, setEventName] = useState("")
  const [time, setTime] = useState(new Date())
  const [locationName, setLocationName] = useState("")
  const [location, setLocation] = useState(
    {
      lat: center.lat,
      lng: center.lng
    }
  )
  const [markerMap, setMarkerMap] = useState(true)
  const [markerSet, setMarkerSet] = useState(false)
  const [newEventObj, setNewEventObj] = useState([])
  const mapRef = useRef(null)
  const [modalMapCenter, setModalMapCenter] = useState(center)
  const [zoomLevel, setZoomLevel] = useState(16);

  const postNewEvent = async () => {
    const res = await fetch(backendURL+"events/"
      + eventName + "/" + time  +"/" + locationName + "/" + location.lat + "/" + location.lng, {
      method: 'POST'
    })
    if(res["status"] === 400){
      setNewEventFailure(true)
    }
    else{
      const data = await res.json()
      setNewEventObj(data)
      const res2 = await fetch(backendURL+"hosts/" + userObj[0]["id"] + "/" + data.id, {
        method: 'POST'
      })
      const data2 = await res2.json()
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    toggleNewEvent()
    setNewEventSuccess(true)
    postNewEvent()
  }

  const toggleMarkerMap = () => {
    setMarkerMap(!markerMap)
  }

  const onDblClickMap = (e) => {
    setMarkerSet(true)
    const tempCenter = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    setLocation(tempCenter)
  }
  const onSearchMap = (search_lat, search_lng) => {
    setMarkerSet(true)
    const tempCenter = {
      lat: search_lat,
      lng: search_lng
    }
    setLocation(tempCenter)
  }
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

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationName }, (results, status) => {
      if (status === "OK") {
        const geo_location = results[0].geometry.location;
        setModalMapCenter({ lat: geo_location.lat(), lng: geo_location.lng() });
        onSearchMap(geo_location.lat(),geo_location.lng());
        if (mapRef.current) {
          mapRef.current.panTo({ lat: geo_location.lat(), lng: geo_location.lng() });
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  return (
    <div>
        <div className='form-control'>
        <label>Event Name</label>
          <input
            type='text'
            value= {eventName}
            onChange={(e) => { setEventName(e.target.value)}}
          />
        </div>
        <div className='form-control'>
          <DateTimePicker
            onChange={setTime}
            value={time}
          />
        </div>
        <div className='form-control'>
          <label>Location</label>
          <input
            type='text'
            value= {locationName}
            onChange={(e) => {setLocationName(e.target.value)}}
            placeholder="Search for a location"
          />
          <button onClick={handleSearch}> Search </button>
        </div>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={modalMapCenter}
            zoom={zoomLevel}
            onClick = {onDblClickMap}
            onZoomChanged={() => {
              if (mapRef.current) {
                setZoomLevel(mapRef.current.getZoom());
              }
            }}
            onLoad = {(map) => {
              mapRef.current = map
            }}
          >
          <Circle
            center={center}
            options={circleOptions}
          />
          {markerSet ? (<Marker
            position={location}
            />) : (<></>)}
        </GoogleMap>
        <button onClick = {onSubmit}> Create new event </button>
    </div>
  )
}
export default NewEventForm
