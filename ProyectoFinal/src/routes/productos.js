//IMPORTACIONES
import express from 'express';
import Contenedor from '../daos/productos/productosDaoFs.js';
const rutaProducto = express.Router();

const productos = new Contenedor();

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
  if (producto) {
    respuesta.json(producto);
  } else {
    respuesta.status(404);
    respuesta.json({ error : 'producto no encontrado' });
  }
});

rutaProducto.post('/', privilegio, async(peticion, respuesta) => {
  const producto = peticion.body;
  await productos.save(producto);
  console.log(producto);
  respuesta.json(producto);
});

rutaProducto.put('/:id', privilegio, async (peticion, respuesta) => {
  const idProducto = parseInt(peticion.params.id);
  const producto = peticion.body;
  await productos.update(idProducto, producto);
  respuesta.json(producto);
});

rutaProducto.delete('/:id', privilegio, async(peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const productoBorrado = await productos.getById(id)
  const producto = await productos.deleteById(id);
  respuesta.json({ status : 'producto borrado' });
});

export { rutaProducto };