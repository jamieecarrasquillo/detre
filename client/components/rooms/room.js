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
export class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      streams: new Set()
    }
    this.onJoin = this.onJoin.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleRoom(this.props.match.params.id)
  }

  onJoin(stream) {
    this.setState({
      streams: new Set([...Array.from(this.state.streams), stream])
    })
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
              <h5>Videos ({this.state.streams.size})</h5>
              <div className="flexbox">
                {Array.from(this.state.streams).map(stream => (
                  <Video
                    className="single-room-video"
                    autoPlay
                    srcObject={stream}
                  />
                ))}
              </div>
            </div>
            <div className="single-room-speakers">
              <h5>Speakers (24)</h5>
              <div className="flexbox">
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
              </div>
            </div>
            <div className="single-room-speakers">
              <h5>Listeners (24)</h5>
              <div className="flexbox">
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
                <img src="https://cdn.dxomark.com/wp-content/uploads/medias/post-22171/IMG_E9969.jpg" />
              </div>
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

        <div className="container-of-videos">
          <VideoRoom roomID={this.props.match.params.id} onJoin={this.onJoin} />
        </div>

        <Link to="/newroom">
          <button className="start-room-button"> + Start a room</button>
        </Link>
      </div>
    )
  }
}

function Video({srcObject, ...props}) {
  const refVideo = useRef(null)

  useEffect(
    () => {
      if (!refVideo.current) return
      refVideo.current.srcObject = srcObject
    },
    [srcObject]
  )

  return <video ref={refVideo} {...props} />
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
