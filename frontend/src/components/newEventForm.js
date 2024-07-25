import {useEffect, useState} from 'react'
import { GoogleMap, Marker} from '@react-google-maps/api'
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

  return (
    <div>
      <form onSubmit = {onSubmit}>
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
          <label>Location Name</label>
          <input
            type='text'
            value= {locationName}
            onChange={(e) => {setLocationName(e.target.value)}}
          />
        </div>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onClick = {onDblClickMap}
          >
          {markerSet ? (<Marker
            position={location}
            />) : (<></>)}
          </GoogleMap>
       <input type='submit' value='Create' className='btn btn-block' />
      </form>
    </div>
  )
}
export default NewEventForm
