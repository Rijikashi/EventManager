import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';

const Sidebar = ({items,setClose,setKeyPressed}) => {
  const handleClick = () => {
    setClose(false)
  }

  const handleCardClick = (id) => {
    console.log("card has been clicked")
    console.log(id)
    setKeyPressed(id)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className = "sidebar">
      <span className = "sidebar-close" onClick ={handleClick}> Close </span>
      {items.map(item => (
          <Card onClick = {() => handleCardClick(item.id)} style={{ cursor: 'pointer', backgroundColor: '#e3e3e1', position: 'relative' }}>
            <Card.Body>
              <Card.Title> {item.event_name || "Event Name could not be loaded"} </Card.Title>
              <Card.Text>
                <p>Time at: {item.time || "default text"}</p>
                <p>Location at : {item.location || "default text"}</p>
              </Card.Text>
            </Card.Body>
          </Card>
      ))}
    </div>
  );

}

export default Sidebar
