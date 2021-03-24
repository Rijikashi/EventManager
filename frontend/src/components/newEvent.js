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

const NewEvent = ( ) => {
  const [newEvent, setNewEvent] = useState(false)

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
        <NewEventForm />
       </Modal>
    </div>
  )
}
export default NewEvent
