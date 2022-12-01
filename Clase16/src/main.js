const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const app = express();
const Contenedor = require('./contenedor/contenedorSql');
const options = require('./connection/options.js');
const knex = require('knex');
const connection = knex(options.mysql);
const moment = require('moment');

const port = 8080;
const publicRoot = './public';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(publicRoot));

const productos = new Contenedor(options.mysql, 'productos');
const mensajes = new Contenedor(options.mysql, 'mensajes');

app.get('/', (peticion, respuesta) => {
  respuesta.send('index.html', { root: publicRoot });
});

const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');
  
  const exist = await connection.schema.hasTable('productos');
  const existMensajes = await connection.schema.hasTable('mensajes');

  if (!exist){
    await connection.schema.createTable('productos', (table) =>{
      table.increments('id').primary
      table.string('title',25).notNullable();
      table.float('price');
      table.string('thumbnail',100);

    })
  };

  if (!existMensajes){
    await connection.schema.createTable('mensajes', (table) =>{
      table.increments('id').primary
      table.string('author',45).notNullable();
      table.string('text', 160).notNullable();
      table.string('time')

    })
  };

  const listaProductos = await productos.getAll();
  socket.emit('nueva-conexion', listaProductos);

  socket.on("new-product", (data) => {
    productos.save(data);
    io.sockets.emit('producto', data);
  });

  const listaMensajes = await mensajes.getAll();
  socket.emit('messages', listaMensajes);

  socket.on('new-message', async data => {
    data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
    await mensajes.save(data);
    const listaMensajes = await mensajes.getAll();
    io.sockets.emit('message', listaMensajes);
  });
});