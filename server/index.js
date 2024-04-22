const express = require('express');
const app = express();
const cors = require('cors');


const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5173'
    }
})


const PORT = 8080;

app.get('/', (req, res) => {
    return res.json({
        message: "Перейдите на другой роут"
    })
})

app.get('api', (req, res) => {
    res.json({
        message: "Hello!"
    })
});

let users = [];


socketIO.on('connection', (socket) => {

    socketIO.emit('responseNewUser', users);
    
    console.log(`${socket.id} пользователь подключен`);

    socket.on('message', (data) => {
        console.log(data);
        socketIO.emit('response', data);
    });

    socket.on('newUser', (data) => {
        if (!users.some(user => user.user === data.user)) {
            users.push(data);
        }
        socketIO.emit('responseNewUser', users);
    });

    socket.on('userLeave', (data) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].user === data.user) {
                users.splice(i, 1);
            }
        }
        socketIO.emit('responseNewUser', users);
    });

    socket.on('disconnect', () => {
        return console.log(`${socket.id} пользователь отключен`);
    })
});



const start = () => {
    try {
        http.listen(PORT, () => {
            return console.log(`Сервер запущен на порту: http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();