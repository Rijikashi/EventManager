import {useState, useEffect} from 'react'
const backendURL = process.env.REACT_APP_BACKEND_DEV_URL;

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}
const InfoWindowDetails = ({marker, userObj}) => {
  const [attendees, setAttendees] = useState([])
  const [hosts, setHosts] = useState([])
  const [completedAttendeeRequest, setCompletedAttendeeRequest] = useState(false)
  const [completedHostRequest, setCompletedHostRequest] = useState(false)

  const buttonOnClick = async () =>  {
    const res = await fetch(backendURL + "attendees/" + userObj[0]["id"] + "/" + marker["id"],
    { method: 'POST'
  })
    const data = await res.json()
  }

  useEffect ( () => {
    const findAttendees = async () => {
      const res = await fetch(backendURL+"events/findAttendees/" + marker.id)
      const data = await res.json()
      setAttendees(data)
      setCompletedAttendeeRequest(true)
    }
    const findHosts = async () => {
      const reshost = await fetch(backendURL+"events/findHosts/" + marker.id)
      const datahost = await reshost.json()
      setHosts(datahost)
      setCompletedHostRequest(true)
    }
    findAttendees()
    findHosts()
  }, [])
  return (
    <div style={divStyle}>
      <h1> Event Name: {marker.event_name} </h1>
      <h2> Located at: {marker.location}</h2>
      <h2> Time at: {marker.time} </h2>
      {completedAttendeeRequest ? (
        <div>
          Attendees:
          {attendees.map((attendee) => {
            return <> {attendee["name"]},  </>
          })}
        </div>
      ) : (<></>)}
      {completedHostRequest ? (
        <div>
          Host:
          {hosts.map((host) => {
            return <> {host["name"]},  </>
          })}
        </div>
      ) : (<></>)}
      <button onClick = {buttonOnClick}>
        Attend!
      </button>
    </div>
  )
}
export default InfoWindowDetails
