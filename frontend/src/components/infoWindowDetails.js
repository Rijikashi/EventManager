import {useState, useEffect} from 'react'


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
    const res = await fetch("http://localhost:3001/attendees/" + userObj[0]["id"] + "/" + marker["id"],
    { method: 'POST'
  })
    const data = await res.json()
    console.log(data)
    console.log("userobj is ",userObj[0]["id"])
    console.log(marker)
  }

  useEffect ( () => {
    const findAttendees = async () => {
      //'events/findAttendees/:event_id'
      const res = await fetch("http://localhost:3001/events/findAttendees/" + marker.id)
      const data = await res.json()
      setAttendees(data)
      setCompletedAttendeeRequest(true)
      console.log("attendee", data)
    }
    const findHosts = async () => {
      const reshost = await fetch("http://localhost:3001/events/findHosts/" + marker.id)
      const datahost = await reshost.json()
      setHosts(datahost)
      setCompletedHostRequest(true)
      console.log("host", datahost)
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
