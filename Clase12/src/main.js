const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const Contenedor = require('./contenedor/contenedorFs');



const port = 8080;
const publicRoot = './public';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(publicRoot));

const productos = new Contenedor('./src/db/productos.txt');
const messages = [];

app.get('/', (peticion, respuesta) => {
  respuesta.send('index.html', { root: publicRoot });
});

const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');

  const listaProductos = await productos.getAll();
  socket.emit('nueva-conexion', listaProductos);

  socket.on("new-product", (data) => {
    productos.save(data);
    io.sockets.emit('producto', data);
  });

  socket.emit('messages', messages);

  socket.on('new-message',data => {
    messages.push(data);
    
    io.sockets.emit('messages', messages);
  });
});