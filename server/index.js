'use strict';
const app = require('express')()

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origins: "*"
      }
})
const cors = require('cors');



app.use(cors);



io.on('connection', socket => {


  socket.on('message', ({ name, message })  => {
   
    io.emit('message', { name, message})
  })
})

http.listen(3400, function() {
  console.log('listening on port ')
})