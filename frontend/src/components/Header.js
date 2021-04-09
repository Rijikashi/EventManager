import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Button from 'react-bootstrap/Button'
const Header = ( {loggedIn, logout} ) => {
  return (
    <h1 className = "header">
      <span> Event Finder </span>
      {loggedIn ? (
        <span>
          <Button onClick ={logout} className = 'logout-button'>
            Logout
          </Button>
        </span>
      )
        : (<></>)
      }

    </h1>
  )

}

export default Header
