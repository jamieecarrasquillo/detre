import React, {useEffect} from 'react'
import {v1 as uuid} from 'uuid'
import './createvideoroom.css'

const CreateVideoRoom = props => {
  console.log(props.history)

  function create() {
    const id = uuid()
    props.history.push(`/newroom/${id}`)
  }

  useEffect(
    () => {
      if (props.history) {
        create()
      }
    },
    [props.history]
  )

  return (
    <button className="new-room-button" onClick={create}>
      Go Live
    </button>
  )
}

export default CreateVideoRoom
