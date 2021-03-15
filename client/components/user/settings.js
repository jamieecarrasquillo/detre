import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './settings.css'

/**
 * COMPONENT
 */
export class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="settings-container">
        <h4>Settings</h4>

        <div className="settings-options-container">
          <p>My settings will appear here.</p>
        </div>

        <Link to="/newroom">
          <button className="start-room-button"> + Start a room</button>
        </Link>
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

export default connect(mapState, mapDispatch)(Settings)
