import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './myrooms.css'

/**
 * COMPONENT
 */
export class MyRooms extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="my-rooms-container">
        <h4>My Rooms</h4>

        <div className="my-rooms-individual-container">
          <p>Rooms that I have created will appear here.</p>
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

export default connect(mapState, mapDispatch)(MyRooms)
