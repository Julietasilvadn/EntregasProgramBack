import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs.js';
const rutaCarrito = express.Router();

const carritos = new Contenedor('src/db/carritos.txt');
const productos = new Contenedor('src/db/productos.txt');


//ENDPOINTS

//FUNCIONA
rutaCarrito.get('/', async (peticion, respuesta) => {
  const listaCarritos = await carritos.getAll();
  respuesta.json(listaCarritos);
});

//FUNCIONA
rutaCarrito.get('/:id/productos', async (peticion, respuesta) => {
  const idCarrito = parseInt(peticion.params.id);
  const listaProductos = await carritos.getById(idCarrito);
  respuesta.json(listaProductos.productos);
});

//FUNCIONA
rutaCarrito.post('/', async (peticion, respuesta) => {
  const carrito = {
    timestamp: Date.now(),
    productos: []
  };
  const id = await carritos.save(carrito);
  respuesta.json(carrito);
});

//NO FUNCIONA Me da un error con el JSON.parse en el getById
rutaCarrito.post('/:id/productos', async (peticion, respuesta) => {
  const idCarrito = parseInt(peticion.params.idProducto);
  const idProducto = peticion.body.id;
  const producto = await productos.getById(idProducto);
  const carrito = await carritos.getById(idCarrito);
  carrito.productos.push(producto);
  await carritos.update(idCarrito, carrito);
  respuesta.json({
    status: 'ok'
  });
});

//FUNCIONA 
rutaCarrito.delete('/:id', async (peticion, respuesta) => {
  const idCarrito = parseInt(peticion.params.id);
  const carritoBorrado= await carritos.getById(idCarrito)
  const carrito = await carritos.deleteById(idCarrito);
  respuesta.json({
    status: 'ok'
  });
});

//FUNCIONA a medias, si yo elimino el id_prod 1 dos veces teniendo dos productos con dif id los borra igual, solo toma el index
rutaCarrito.delete('/:id/productos/:id_prod', async (peticion, respuesta) => {
  const idCarrito = parseInt(peticion.params.id);
  const idProducto = parseInt(peticion.params.id_prod);
  const carrito = await carritos.getById(idCarrito);
  let indexToDelete = -1;
  carrito.productos.forEach((producto, index) => {
    if (producto.id == idProducto) {
      indexToDelete = index;
    }
  });
  if (indexToDelete => 0) {
    carrito.productos.splice(indexToDelete, 1);
  }
  await carritos.update(idCarrito, carrito);
  respuesta.json({
    status: 'ok'
  });
});


export { rutaCarrito };