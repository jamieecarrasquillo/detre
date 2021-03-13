import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './room.css'
import {render} from 'enzyme'

/**
 * COMPONENT
 */
export class Room extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="outter-room-container">
        <div className="room-container">
          <div className="single-room-header">
            <img src={this.props.userImage} />
            <h4>Title</h4>
            <div>48+ more</div>
          </div>

          <p>Description here.</p>

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
            <Link to="/home">
              <button>Leave</button>
            </Link>
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
    roomsContainer: state.roomsContainer,
    userImage: state.user.profilePicture
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Room)
