const rooms = {}

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join room', roomID => {
      if (rooms[roomID]) {
        rooms[roomID].push(socket.id)
      } else {
        rooms[roomID] = [socket.id]
      }
      const otherUser = rooms[roomID].find(id => id !== socket.id)
      if (otherUser) {
        socket.emit('other user', otherUser)
        socket.to(otherUser).emit('user joined', socket.id)
      }
    })

    socket.on('offer', payload => {
      io.to(payload.target).emit('offer', payload)
    })

    socket.on('answer', payload => {
      io.to(payload.target).emit('answer', payload)
    })

    socket.on('ice-candidate', incoming => {
      io.to(incoming.target).emit('ice-candidate', incoming.candidate)
    })

    socket.on('disconnect', userID => {
      console.log(`Connection ${socket.id} has been disconnected`)
    })
  })
}
