import React from 'react'
import {v1 as uuid} from 'uuid'
import './createvideoroom.css'

const CreateVideoRoom = props => {
  console.log(props.history)
  function create() {
    const id = uuid()
    props.history.push(`/room/${id}`)
  }

  return (
    <button className="new-room-button" onClick={create}>
      Go Live
    </button>
  )
}

export default CreateVideoRoom
