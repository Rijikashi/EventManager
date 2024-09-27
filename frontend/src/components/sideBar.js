import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
const Sidebar = ({items,setClose,setKeyPressed}) => {


  const handleClick = () => {
    setClose(false)
    console.log(items)
  }

  const handleCardClick = (id) => {
    console.log("card has been clicked")
    console.log(id)
    setKeyPressed(id)
  }

  return (
    <div className = "sidebar">
      <Button onClick ={handleClick}> X </Button>
      {items.map(item => (
          <Card onClick = {() => handleCardClick(item.id)} style={{ cursor: 'pointer' }}>
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
