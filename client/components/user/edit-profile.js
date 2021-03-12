import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {link} from 'react-router-dom'
import './edit-profile.css'

/**
 * COMPONENT
 */
export class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      email: props.email,
      image: props.profilePicture,
      username: props.username,
      googleId: props.googleId,
      website: props.website,
      bio: props.bio
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="profile-container">
        <div className="username-image-container">
          <div className="image-container">
            <img src={this.props.image} alt="" width="35px" />
          </div>
          <div className="username-edit-profile-container">
            <div className="user-username">{this.props.username}</div>
            <div className="edit-profile-image">Change Profile Photo</div>
          </div>
        </div>

        <form className="form-titles-container" onSubmit={this.handleSubmit}>
          <div className="field-container">
            <label>Name</label>
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="field-container">
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="field-container">
            <label>Website</label>
            <input
              name="website"
              value={this.state.website}
              onChange={this.handleChange}
            />
          </div>
          <div className="field-container">
            <label>Bio</label>
            <textarea
              name="bio"
              value={this.state.bio}
              onChange={this.handleChange}
            />
          </div>
          <div className="field-container">
            <label>Email</label>
            <input
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="edit-profile-button">
            Submit
          </button>
        </form>
      </div>
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
