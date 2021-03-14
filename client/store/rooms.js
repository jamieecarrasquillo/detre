import axios from 'axios'
import history from './../history'

/**
 * ACTION TYPES
 */
const SET_ROOMS = 'SET_ROOMS'
const ADD_ROOM = 'ADD_ROOM'
const REMOVE_ROOM = 'REMOVE_ROOM'
const SET_SINGLE_ROOM = 'SET_SINGLE_ROOM'
const JOIN_ROOM = 'JOIN_ROOM'
const UNJOIN_ROOM = 'UNJOIN_ROOM'

/**
 * INITIAL STATE
 */

const initialState = []

/**
 * ACTION CREATORS
 */
export const setRooms = rooms => ({type: SET_ROOMS, rooms})
export const newRoom = room => ({type: ADD_ROOM, room})
export const removeRoom = roomId => ({type: REMOVE_ROOM, roomId})
export const setSingleRoom = room => ({type: SET_SINGLE_ROOM, room})
export const joinRoom = roomId => ({type: JOIN_ROOM, roomId})
export const unjoinRoom = roomId => ({type: UNJOIN_ROOM, roomId})

/**
 * THUNK CREATORS
 */
export const fetchRooms = () => async dispatch => {
  try {
    const res = await axios.get('/api/rooms/')
    dispatch(setRooms(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteRoom = (userId, roomId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/rooms/${userId}/${roomId}`)
    dispatch(removeRoom(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addRoom = room => async dispatch => {
  try {
    const res = await axios.post('/api/rooms/', room)
    dispatch(newRoom(res.data))
    history.push(`/room/${res.data.id}`)
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleRoom = roomId => async dispatch => {
  try {
    const res = await axios.get(`/api/rooms/${roomId}`)
    dispatch(setSingleRoom(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const enterRoom = roomId => async dispatch => {
  try {
    const res = await axios.put(`/api/rooms/${roomId}`)
    dispatch(joinRoom(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const leaveRoom = roomId => async dispatch => {
  try {
    const res = await axios.put(`/api/rooms/unjoin/${roomId}`)
    dispatch(unjoinRoom(res.data))
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ROOMS:
      return action.rooms
    case ADD_ROOM:
      return [...state, action.room]
    case REMOVE_ROOM:
      return state.filter(room => room.id !== action.roomId)
    case SET_SINGLE_ROOM:
      return action.room
    case JOIN_ROOM:
      return action.roomId
    case UNJOIN_ROOM:
      return state
    default:
      return state
  }
}
