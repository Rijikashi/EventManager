import Modal from 'react-modal';
import NewEventForm from './newEventForm.js'
import {useState, useEffect} from 'react'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root')

const NewEvent = ({center, userObj}) => {
  const [newEvent, setNewEvent] = useState(false)
  const [newEventSuccess,setNewEventSuccess] = useState(false)
  const toggleNewEvent = () => {
    setNewEvent(!newEvent)
  }

  return (
    <div>
      <button onClick = {toggleNewEvent}>
        Create new Event!
      </button>
      <Modal
       isOpen={newEvent}
       onRequestClose={toggleNewEvent}
       style={customStyles}
       contentLabel="Example Modal"
       >
        <NewEventForm center = {center} toggleNewEvent = {toggleNewEvent} setNewEventSuccess = {setNewEventSuccess} userObj = {userObj}/>
       </Modal>
       {newEventSuccess ? (
         <div>
          Event successfully created!
         </div>
       ) : (<></>)}

    </div>
  )
}
export default NewEvent
