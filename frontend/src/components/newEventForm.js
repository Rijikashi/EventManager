import {useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api'
import DateTimePicker from 'react-datetime-picker';

const containerStyle = {
  width: '500px',
  height: '500px'
};

const NewEventForm = ({center, toggleNewEvent, setNewEventSuccess}) => {
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

  const postNewEvent = async () => {
    //http://localhost:3001/events/TestingLocationURL/asdf/130willowsprings/30/130
    const res = await fetch("http://localhost:3001/events/"
      + eventName + "/" + time  +"/" + locationName + "/" + location.lat + "/" + location.lng, {
      method: 'POST'
    })
    const data = await res.json()
  }

  const testButton = () => {
    console.log(time)
    console.log(location)
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
    console.log("map e", e.latLng.lat())
    console.log(e.latLng.lng())
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
      <button onClick = {testButton}>
        testButton
        </button>
    </div>
  )
}
export default NewEventForm
