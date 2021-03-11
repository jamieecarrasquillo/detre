import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {logout as logOut} from '../store/user'
import './navbar.css'
import {render} from 'enzyme'

class Navbar extends React.Component {
  // ({handleClick, isLoggedIn, image})
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }

    this.container = React.createRef()
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open
      }
    })
  }

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false
      })
    }
  }

  render() {
    if (!this.props.isLoggedIn) return <div />
    return (
      <div className="navbar-container">
        <Link to="/home">
          <h1>Detré</h1>
        </Link>
        <span className="empty-space" />

        <div className="search-icon">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} color="#078080" size="lg" />
          </Link>
        </div>

        <div className="profile-icon" ref={this.container}>
          {/* <Link to="/profile">
            <img src={image} alt="" width="35px" />
          </Link> */}

          <button type="button" onClick={this.handleButtonClick}>
            <img src={this.props.image} alt="" width="35px" />
          </button>

          {this.state.open && (
            <div className="dropdown">
              <ul>
                <Link to="/profile" className="link">
                  <li>Profile</li>
                </Link>

                <Link to="/myrooms" className="link">
                  <li>My Rooms</li>
                </Link>

                <Link to="/settings" className="link">
                  <li>Settings</li>
                </Link>

                <li>
                  <a
                    href="#"
                    className="logout-button"
                    onClick={this.props.handleClick}
                  >
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    image: state.user.profilePicture
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
