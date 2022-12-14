import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs.js';
const rutaProducto = express.Router();

const productos = new Contenedor('src/db/productos.txt');

//en los headers en postman agrego el administrador true
const privilegio = (peticion, respuesta, next) => {
  const administrador = peticion.headers.administrador;
  if (administrador === 'true') {
    next();
  } else {
    respuesta.status(401).send({ error : -1, descripcion: `ruta ${peticion.url} no autorizada` });
  }
};



//FUNCIONA
rutaProducto.get('/', async (peticion, respuesta) => {
  const listaProductos = await productos.getAll();
  respuesta.json(listaProductos);
});

//FUNCIONA
rutaProducto.get('/:id', async (peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const producto = await productos.getById(id);
  if (producto) {
    respuesta.json(producto);
  } else {
    respuesta.status(404);
    respuesta.json({ error : 'producto no encontrado' });
  }
    
});

//FUNCIONA
rutaProducto.post('/', async (peticion, respuesta) => {
  const producto = peticion.body;
  await productos.save(producto);
  console.log(producto);
  respuesta.json(producto);
});

//FUNCIONA
rutaProducto.put('/:id',privilegio, async (peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const producto = peticion.body;
  await productos.update(id,producto)
  respuesta.json(producto);
});

//FUNCIONA
rutaProducto.delete('/:id',privilegio, async (peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const productoBorrado = await productos.getById(id)
  const producto = await productos.deleteById(id);
  respuesta.json({ status : 'producto borrado' });
});

export { rutaProducto };