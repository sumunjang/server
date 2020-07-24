const SocketIO = require('socket.io');

const clients = new Map();

module.exports = (server, app) => {
    const io = SocketIO(server);
    app.set('io', io);
    app.set('clients',clients);
    io.on('connection', (socket) => {
        console.log('websocket connect',socket.id);
        socket.on('register',(data)=>{
            clients.set(data,socket.id);
            console.log(clients);
            // socket.to(socket.id).emit('listenServer', dummy);
        });
        socket.on('disconnect', () => {
            console.log('접속 해제');
        });
    });
};