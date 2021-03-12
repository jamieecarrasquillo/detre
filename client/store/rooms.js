import axios from 'axios'
import history from './../history'

/**
 * ACTION TYPES
 */
const SET_ROOMS = 'SET_ROOMS'
const REMOVE_ROOM = 'REMOVE_ROOM'
const NEW_ROOM = 'NEW_ROOM'
const SET_SINGLE_ROOM = 'SET_SINGLE_ROOM'
const LEAVE_SINGLE_ROOM = 'LEAVE_SINGLE_ROOM'

/**
 * INITIAL STATE
 */
const roomsContainer = [
  {
    title: 'The ways of entrepreneurship',
    description: `Come chat about the current events happening all over the south east of the United
    States. These wheather conditions have affected all of us in different ways and we are
    all sure to benefit from sharing our stories. 
    
    Please be aware that we enforce community rules:
    * No harresment of any kind
    * No speaking unless given the chance
    * No spamming messages
    * Come chat about the current events happening all over the south east of the United
    States. These wheather conditions have affected all of us in different ways and we are
    all sure to benefit from sharing our stories. 
    
    Please be aware that we enforce community rules:
    * No harresment of any kind
    * No speaking unless given the chance
    * No spamming messages`,
    userId: 1
  },
  {
    title: 'Value in todays world',
    description: 'Bloom like a butterfly, the time is now.',
    userId: 2
  }
]

/**
 * ACTION CREATORS
 */
export const setRooms = rooms => ({type: SET_ROOMS, rooms})
export const removeRoom = roomId => ({type: REMOVE_ROOM, roomId})
export const newRoom = room => ({type: NEW_ROOM, room})
export const setSingleRoom = room => ({type: SET_SINGLE_ROOM, room})

/**
 * THUNK CREATORS
 */
export const fetchRooms = () => async dispatch => {
  try {
    const res = await axios.get('/home')
    dispatch(setRooms(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteRoom = (userId, roomId) => async dispatch => {
  try {
    const res = await axios.delete(`api/room/${userId}/${roomId}`)
    dispatch(removeRoom(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addRoom = room => async dispatch => {
  try {
    const res = await axios.post(`api/room/${userId}/${roomId}`)
    dispatch(newRoom(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleRoom = roomId => async dispatch => {
  try {
    const res = await axios.get(`api/room/${roomId}`)
    dispatch(setSingleRoom(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const leaveRoom = roomId => async dispatch => {
  try {
    const res = await axios.delete(`api/room/${roomId}`)
    dispatch(leaveRoom(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = roomsContainer, action) {
  switch (action.type) {
    case SET_ROOMS:
      return action.rooms
    case REMOVE_ROOM:
      return state.filter(room => room.id !== action.roomId)
    case NEW_ROOM:
      return [...NEW_ROOM, state.room]
    case SET_SINGLE_ROOM:
      return action.room
    default:
      return state
  }
}
