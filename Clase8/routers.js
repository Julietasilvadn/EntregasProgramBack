const express = require('express');
const { Router } = express;
const aplicacion = express();
const rutaProductos = Router();
const port = 8080;
const Routers = Router();

aplicacion.use('/static', express.static(__dirname + '/public'));
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));


//GET ALL******************************************
rutaProductos.get('/', (peticion, respuesta) => {
    const listaProductos = productos.getAll();
    respuesta.json(listaProductos);
  });

//GET BY ID****************************************
rutaProductos.get('/:id', (peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const producto = productos.getById(id);
  if (producto) {
    respuesta.json(producto);
  } else {
    respuesta.status(404);
    respuesta.json({ error : 'producto no encontrado' });
  }
  
});

//POST********************************************
rutaProductos.post('/', (peticion, respuesta) => {
    const producto = peticion.body;
    productos.save(producto);
    respuesta.json({
        status: "ok"
    });
});

//PUT*********************************************
rutaProductos.put('/:id', (peticion, respuesta) => {
    const producto = peticion.body;
    const id = parseInt(peticion.params.id);
    productos.deleteById(id);
    producto.id = id;
    productos.save({...producto, id});
    respuesta.json({
        status: "ok"
    });
});

//DELETE BY ID************************************
rutaProductos.delete('/:id', (peticion, respuesta) => {
    const producto = peticion.body;
    const id = parseInt(peticion.params.id);
    productos.deleteById(id);
    respuesta.json({
        status: "ok"
    })
});


aplicacion.use('/api/productos', rutaProductos);


module.exports = Routers