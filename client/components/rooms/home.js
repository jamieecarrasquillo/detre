import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchRooms, enterRoom} from './../../store/rooms'
import './home.css'

/**
 * COMPONENT
 */
export const Home = props => {
  const {rooms, userId, fetchRooms, enterRoom} = props

  useEffect(
    () => {
      if (userId) {
        fetchRooms()
      }
    },
    [userId]
  )

  const [expanded, setExpanded] = useState(false)

  return rooms.length > 0 ? (
    <div className="all-rooms-container">
      {rooms.map(room => {
        return (
          <div key={room.id} className="single-room-container">
            <div className="room-image-title">
              <img src={room.creatorImage} alt="" />
              <h4 className="room-title">{room.title}</h4>
              <div className="room-listeners">
                <img
                  style={{left: -110}}
                  src="http://www.crybabyco.com/wp-content/uploads/2018/03/IMG_20180301_001330_396.jpg"
                  alt=""
                />
                <img
                  style={{left: -90}}
                  src="https://i.pinimg.com/originals/e0/09/ce/e009ce051a820efba61f80a63a61bd8e.jpg"
                  alt=""
                />
                <img
                  style={{left: -70}}
                  src="http://www.crybabyco.com/wp-content/uploads/2018/03/IMG_20180301_001330_396.jpg"
                  alt=""
                />
                <img
                  style={{left: -50}}
                  src="https://i.pinimg.com/736x/71/6a/53/716a53f5c39b23d82f2e84088b965836.jpg"
                  alt=""
                />
              </div>
              <p className="room-listeners-count">48+ more</p>
            </div>
            <p className="room-description">
              {room.description}
              <div className="description-gradient" />
            </p>
            <div className="join-room-button-parent">
              <Link to={`room/${room.id}`}>
                <button
                  className="join-room-button"
                  onClick={() => enterRoom(room.id)}
                >
                  Join
                </button>
              </Link>
            </div>
          </div>
        )
      })}

      <Link to="/newroom">
        <button className="start-room-button"> + Start a room</button>
      </Link>
    </div>
  ) : (
    <div />
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    rooms: state.rooms,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchRooms: () => dispatch(fetchRooms()),
    enterRoom: roomId => dispatch(enterRoom(roomId))
  }
}

export default connect(mapState, mapDispatch)(Home)
