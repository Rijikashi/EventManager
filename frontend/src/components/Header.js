import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

const Header = ( {loggedIn, logout} ) => {
  return (
    <h1 className = "header">
      <span> Event Finder </span>
      {loggedIn ? (
          <span onClick ={logout} className = 'logout-button'>
            Logout
          </span>
      )
        : (<></>)
      }

    </h1>
  )

}

export default Header
