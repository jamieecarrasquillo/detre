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
            <div>+1 more</div>
          </div>

          <p>{room.description}</p>

          <div className="single-room-people">
            <div className="single-room-speakers">
              <h5>On Video ({this.state.streams.size})</h5>
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
              <h5>Speakers (1)</h5>
              <div className="flexbox">
                <img src={this.props.userImage} />
              </div>
            </div>
            <div className="single-room-speakers">
              <h5>Listeners (1)</h5>
              <div className="flexbox">
                <img src="https://mail.google.com/mail/u/0?ui=2&ik=0ba1013171&attid=0.1.1&permmsgid=msg-f:1694262964339100593&th=17833b3081884bb1&view=fimg&sz=s0-l75-ft&attbid=ANGjdJ_Rqk5CPavnZpcj2HCbdm9kAElf81oRqX4rnWU51Fo-okeQ2I0lYFUE07IC1N4Ozy1Rvuvw8I4GDXOXJpoT7YSeR1AoBv_BKkLIOUbD8v1TqPF7SDQrmIY-fh4&disp=emb" />
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
//comment
