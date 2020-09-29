'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .get('/',(req,res)=>{
        res.sendFile(__dirname + INDEX)
    })
    .get('/painting',(req,res)=>{
        res.sendFile(__dirname + '/painting.html')
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));


const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});
setInterval(() => io.emit('time', new Date().toTimeString()), 1001);