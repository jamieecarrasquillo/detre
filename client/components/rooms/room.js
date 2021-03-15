import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleRoom, leaveRoom} from './../../store/rooms'
import VideoRoom from './videoroom'
import './room.css'

/**
 * COMPONENT
 */

// Fix video CSS to match component
export class Room extends React.Component {
  constructor(props) {
    super(props)
    this.onJoin = this.onJoin.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleRoom(this.props.match.params.id)
  }

  onJoin(stream) {}

  render() {
    const room = this.props.rooms ? this.props.rooms : {}
    return (
      <div className="outter-room-container">
        <div className="room-container">
          <div className="single-room-header">
            <img src={room.creatorImage} />
            <h4>{room.title}</h4>
            <div>+1 more</div>
          </div>

          <p>{room.description}</p>

          <div className="single-room-people">
            <div className="single-room-speakers">
              <h5>On Video</h5>
              <div className="flexbox">
                <VideoRoom roomID={this.props.match.params.id} />
              </div>
            </div>
            <div className="single-room-speakers">
              <h5>Speakers (1)</h5>
              <div className="flexbox">
                <img src={room.creatorImage} />
              </div>
            </div>
            <div className="single-room-speakers">
              <h5>Listeners (1)</h5>
              <div className="flexbox" />
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

        {/* <div className="container-of-videos">
          <VideoRoom roomID={this.props.match.params.id} />
        </div> */}

        <Link to="/newroom">
          <button className="start-room-button"> + Start a room</button>
        </Link>
      </div>
    )
  }
}

const Video = props => {
  const ref = useRef()

  useEffect(() => {
    props.peer.on('stream', stream => {
      ref.current.srcObject = stream
    })
  }, [])

  return <video playsInline autoPlay ref={ref} />
}

const mapState = state => {
  return {
    rooms: state.rooms
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleRoom: roomId => dispatch(fetchSingleRoom(roomId)),
    leaveRoom: roomId => dispatch(leaveRoom(roomId))
  }
}

export default connect(mapState, mapDispatch)(Room)
