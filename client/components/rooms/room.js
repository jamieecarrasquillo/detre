import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleRoom, leaveRoom} from './../../store/rooms'
import './room.css'
import {render} from 'enzyme'

/**
 * COMPONENT
 */
export class Room extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchSingleRoom(this.props.match.params.id)
  }

  render() {
    const room = this.props.rooms ? this.props.rooms : {}
    return (
      <div className="outter-room-container">
        <div className="room-container">
          <div className="single-room-header">
            <img src={this.props.userImage} />
            <h4>{room.title}</h4>
            <div>+48 more</div>
          </div>

          <p>{room.description}</p>

          <div className="single-room-people">
            <div className="single-room-speakers">
              <h5>Speakers (24)</h5>
              <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
            </div>
            <div className="single-room-listeners">
              <h5>Listeners (24)</h5>
              <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
            </div>
          </div>

          <div className="leave-room">
            <button
              onClick={() => this.props.leaveRoom(this.props.match.params.id)}
            >
              Leave
            </button>
          </div>
        </div>

        <Link to="/newroom">
          <button className="start-room-button"> + Start a room</button>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    rooms: state.rooms,
    userImage: state.user.profilePicture
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleRoom: roomId => dispatch(fetchSingleRoom(roomId)),
    leaveRoom: roomId => dispatch(leaveRoom(roomId))
  }
}

export default connect(mapState, mapDispatch)(Room)
