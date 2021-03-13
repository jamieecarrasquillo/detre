import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import './profile.css'

/**
 * COMPONENT
 */
export class UserProfile extends React.Component {
  // const {name, email, image, username, googleId, website, bio} = props
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
    console.log(
      'REMINDER: The three dots part is in process of being built as well.'
    )
    return (
      <header className="profile-container">
        <div className="settings-icon" ref={this.container}>
          <button
            type="button"
            className="settings-button"
            onClick={this.handleButtonClick}
          >
            <FontAwesomeIcon icon={faEllipsisV} size="lg" />
          </button>

          {this.state.open && (
            <div className="dropdown">
              <ul>
                <li>Change Password</li>
                <li>Notifications</li>
                <li>Privacy and Security</li>
                <li>Report a Problem</li>
              </ul>
            </div>
          )}
        </div>
        <div className="user-info-container">
          <div className="user-image">
            <img src={this.props.image} alt="" />
          </div>

          <div className="user-name">{this.props.name}</div>
          <div className="username">@{this.props.username}</div>

          <div className="bio">{this.props.bio}</div>
        </div>

        <div className="edit-profile-btn">
          <Link to="/editprofile">
            <button>Edit Profile</button>
          </Link>
        </div>
      </header>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    image: state.user.profilePicture,
    username: state.user.username,
    googleId: state.user.googleId,
    website: state.user.website,
    bio: state.user.bio
  }
}

export default connect(mapState)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  email: PropTypes.string
}
