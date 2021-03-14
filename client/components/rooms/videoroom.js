import React, {VideoHTMLAttributes, useRef, useEffect, useState} from 'react'
import io from 'socket.io-client'

const VideoRoom = props => {
  // const userVideo = useRef()
  // const partnerVideo = useRef()
  const peerRef = useRef()
  const socketRef = useRef()
  const otherUser = useRef()
  const userStream = useRef()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({audio: true, video: true})
      .then(stream => {
        console.log('STARTING STREAM', stream)
        // userVideo.current.srcObject = stream
        // setStreams((set) => new Set([...Array.from(set), stream]))
        props.onJoin(stream)
        userStream.current = stream

        socketRef.current = io.connect('/')
        socketRef.current.emit('join room', props.roomID)

        socketRef.current.on('other user', userID => {
          console.log('OTHER USER', userID)
          callUser(userID)
          otherUser.current = userID
        })

        socketRef.current.on('user joined', userID => {
          console.log('USER JOINED', userID)
          otherUser.current = userID
        })

        socketRef.current.on('offer', handleRecieveCall)

        socketRef.current.on('answer', handleAnswer)

        socketRef.current.on('ice-candidate', handleNewICECandidateMsg)
      })
  }, [])

  function callUser(userID) {
    peerRef.current = createPeer(userID)
    userStream.current
      .getTracks()
      .forEach(track => peerRef.current.addTrack(track, userStream.current))
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org'
        },
        {
          urls: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com'
        }
      ]
    })

    peer.onicecandidate = handleICECandidateEvent
    peer.ontrack = handleTrackEvent
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID)

    return peer
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then(offer => {
        return peerRef.current.setLocalDescription(offer)
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription
        }
        socketRef.current.emit('offer', payload)
      })
      .catch(e => console.log(e))
  }

  function handleRecieveCall(incoming) {
    console.log('RECEIVING CALL', incoming)
    peerRef.current = createPeer()
    const desc = new RTCSessionDescription(incoming.sdp)
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach(track => peerRef.current.addTrack(track, userStream.current))
      })
      .then(() => {
        return peerRef.current.createAnswer()
      })
      .then(answer => {
        return peerRef.current.setLocalDescription(answer)
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription
        }
        socketRef.current.emit('answer', payload)
      })
  }

  function handleAnswer(message) {
    console.log('HANDLE ANSWER', message)
    const desc = new RTCSessionDescription(message.sdp)
    peerRef.current.setRemoteDescription(desc).catch(e => console.log(e))
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate
      }
      socketRef.current.emit('ice-candidate', payload)
    }
  }

  function handleNewICECandidateMsg(incoming) {
    console.log('ICE CANDIDATE', incoming)
    const candidate = new RTCIceCandidate(incoming)

    peerRef.current.addIceCandidate(candidate).catch(e => console.log(e))
  }

  function handleTrackEvent(e) {
    console.log('TRACK EVENT', e.streams)
    props.onJoin(e.streams[0])
    // setStreams((set) => new Set([...Array.from(set), e.streams[0]]))
    // partnerVideo.current.srcObject = e.streams[0]
  }

  return null

  // return (
  //   <div>
  //     {/* <video autoPlay ref={userVideo} /> */}
  //     {Array.from(streams).map((stream) => (
  //       <Video autoPlay srcObject={stream} />
  //     ))}
  //   </div>
  // )
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

export default VideoRoom
