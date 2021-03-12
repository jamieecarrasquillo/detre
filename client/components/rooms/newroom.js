import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMicrophone} from '@fortawesome/free-solid-svg-icons'
import './newroom.css'

/**
 * COMPONENT
 */
export class NewRoom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="new-room-container">
        {/* onSubmit={} */}
        <form className="new-room-form">
          <img className="new-room-logo" src="/microphone.svg" />
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="placeholder-color"
          />
          <input
            name="description"
            type="text"
            placeholder="Description"
            className="placeholder-color"
          />
          <input
            name="category"
            type="text"
            placeholder="Category"
            className="placeholder-color"
          />
          <input
            name="hashtags"
            type="text"
            placeholder="#Tags"
            className="placeholder-color"
          />

          <button className="new-room-button">Go Live</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(NewRoom)
