const users = {}
const socketToRoom = {}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // socket.on('join room', roomID => {
    //   if (rooms[roomID]) {
    //     rooms[roomID].push(socket.id)
    //   } else {
    //     rooms[roomID] = [socket.id]
    //   }
    //   const otherUser = rooms[roomID].find(id => id !== socket.id)
    //   if (otherUser) {
    //     socket.emit('other user', otherUser)
    //     socket.to(otherUser).emit('user joined', socket.id)
    //   }
    // })

    // socket.on('offer', payload => {
    //   io.to(payload.target).emit('offer', payload)
    // })

    // socket.on('answer', payload => {
    //   io.to(payload.target).emit('answer', payload)
    // })

    // socket.on('ice-candidate', incoming => {
    //   io.to(incoming.target).emit('ice-candidate', incoming.candidate)
    // })

    socket.on('join room', roomID => {
      if (users[roomID]) {
        const length = users[roomID].length
        if (length === 4) {
          socket.emit('room full')
          return
        }
        users[roomID].push(socket.id)
      } else {
        users[roomID] = [socket.id]
      }
      socketToRoom[socket.id] = roomID
      const usersInThisRoom = users[roomID].filter(id => id !== socket.id)

      socket.emit('all users', usersInThisRoom)
    })

    socket.on('sending signal', payload => {
      io.to(payload.userToSignal).emit('user joined', {
        signal: payload.signal,
        callerID: payload.callerID
      })
    })

    socket.on('returning signal', payload => {
      io.to(payload.callerID).emit('receiving returned signal', {
        signal: payload.signal,
        id: socket.id
      })
    })

    socket.on('disconnect', userID => {
      console.log(`Connection ${socket.id} has been disconnected`)
      const roomID = socketToRoom[socket.id]
      let room = users[roomID]
      if (room) {
        room = room.filter(id => id !== socket.id)
        users[roomID] = room
      }
      socket.broadcast.emit('user left', socket.id)
    })
  })
}
