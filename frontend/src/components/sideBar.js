import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
const Sidebar = ({items,setClose}) => {


  const handleClick = () => {
    setClose(false)
    console.log(items)
  }

  const handleCardClick = () => {
    console.log("card has been clicked")
  }
  return (
    <div className = "sidebar">
      <Button onClick ={handleClick}> X </Button>
      {items.map(item => (
        <button className = "sidebar-cards" onClick = {handleCardClick}>
          <Card>
            <Card.Body>
              <Card.Title> {item.event_name || "Event Name could not be loaded"} </Card.Title>
              <Card.Text>
                <p>Time at: {item.time || "default text"}</p>
                <p>Location at : {item.location || "default text"}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </button>
      ))}
    </div>
  );

}

export default Sidebar
