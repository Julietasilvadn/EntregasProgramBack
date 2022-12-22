//-----------------------------------------------------------------------------------------
  //IMPORTANDO
  import express from 'express';
  import faker from 'faker';
  faker.locale = 'es';
  import { Server as HttpServer } from 'http';
  import { Server as Socket } from 'socket.io';
  import ContenedorMemoria from './contenedores/ContenedorMemoria.js';
  import config from './config.js';

//-----------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------
  //SERVIDOR - SOCKET - API
  const app = express();
  const httpServer = new HttpServer(app);
  const io = new Socket(httpServer);
  const productosApi = new ContenedorMemoria();
  const mensajesApi = new ContenedorMemoria();

  io.on('connection', async socket => {
      console.log('Nuevo cliente conectado!');

      //CARGA PRODUCTOS
      socket.emit('productos', await productosApi.listarAll());
      socket.on('update', async producto => {
          await productosApi.guardar(producto)
          io.sockets.emit('productos', await productosApi.listarAll());
      });

      // carga inicial de mensajes
      socket.emit('mensajes', await mensajesApi.listarAll());

      // actualizacion de mensajes
      socket.on('nuevoMensaje', async mensaje => {
          mensaje.fyh = new Date().toLocaleString()
          await mensajesApi.guardar(mensaje)
          io.sockets.emit('mensajes', await mensajesApi.listarAll());
      });
  });
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
  // MIDDLEWARES
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
  //RUTAS
  app.get('/api/productos-test', (req, res) => {
      const productosAleatorios = [];
      for (let index = 0; index < 5; index++) {
          productosAleatorios.push({
              id: index + 1,
              autor: faker.name.firstName(),
              texto: faker.lorem.lines(1),
              fyh: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z')
          });
      }
      res.json(productosAleatorios);
  });
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
  //SERVIDOR
  const PORT = 8080;
  const connectedServer = httpServer.listen(PORT, () => {
      console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
  });
  connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
//-----------------------------------------------------------------------------------------