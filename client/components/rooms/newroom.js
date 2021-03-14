import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMicrophone} from '@fortawesome/free-solid-svg-icons'
import {addRoom} from './../../store/rooms'
import CreateVideoRoom from './createvideoroom'
import './newroom.css'

/**
 * COMPONENT
 */
export class NewRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      category: '',
      hashtags: ''
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
    this.props.addRoom(this.state)
    this.setState({})
  }

  render() {
    return (
      <div className="new-room-container">
        <form className="new-room-form" onSubmit={this.handleSubmit}>
          <img className="new-room-logo" src="/microphone.svg" />
          <input
            name="title"
            type="text"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Title"
            className="placeholder-color"
          />
          <input
            name="description"
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
            placeholder="Description"
            className="placeholder-color"
          />
          <input
            name="category"
            type="text"
            onChange={this.handleChange}
            value={this.state.category}
            placeholder="Category"
            className="placeholder-color"
          />
          <input
            name="hashtags"
            type="text"
            onChange={this.handleChange}
            value={this.state.hashtags}
            placeholder="#Tags"
            className="placeholder-color"
          />

          <button type="submit" className="new-room-button">
            Go Live
          </button>

          <Link to="/home" className="link">
            Go Back.
          </Link>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    addRoom: room => dispatch(addRoom(room))
  }
}

export default connect(mapState, mapDispatch)(NewRoom)
