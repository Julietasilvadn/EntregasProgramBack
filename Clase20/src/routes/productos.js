//IMPORTACIONES
import express from 'express';
const rutaProducto = express.Router();
import { productos } from '../daos/index.js';

//en los headers en postman agrego el administrador true
const privilegio = (peticion, respuesta, next) => {
  const administrador = peticion.headers.administrador;
  if (administrador === 'true') {
    next();
  } else {
    respuesta.status(401).send({ error : -1, descripcion: `ruta ${peticion.url} no autorizada` });
  }
};

//ENDPOINTS

rutaProducto.get('/', async (peticion, respuesta) => {
  const listaProductos = await productos.getAll();
  respuesta.json(listaProductos);
});

rutaProducto.get('/:id', async(peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const producto = await productos.getById(id);
  respuesta.json(producto);
});

rutaProducto.post('/', privilegio, async(peticion, respuesta) => {
  const producto = peticion.body;
  await productos.save(producto);
  respuesta.json({
    status: 'ok'
  });
});

rutaProducto.put('/:id', privilegio, async (peticion, respuesta) => {
  const idProducto = peticion.params.id;
  const producto = peticion.body;
  producto.id = idProducto;
  
  await productos.update(producto);
  respuesta.json(producto);
});

rutaProducto.delete('/:id', privilegio, async(peticion, respuesta) => {
  const id = peticion.params.id;
  await productos.deleteById(id);
  respuesta.json({
    status: 'ok'
  });
});

export { rutaProducto };