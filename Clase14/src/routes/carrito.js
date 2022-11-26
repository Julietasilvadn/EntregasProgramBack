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

//FUNCIONA
rutaCarrito.post('/:id/productos', async (peticion, respuesta) => {
  const idCarrito = parseInt(peticion.params.id);
  const idProducto = peticion.body.idProducto;
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

//FUNCIONA
rutaCarrito.delete('/:id/productos/:id_prod', async (peticion, respuesta) => {
  const idCarrito = parseInt(peticion.params.id);
  const idProducto = parseInt(peticion.params.id_prod);
  const carrito = await carritos.getById(idCarrito);
  const listaCarrito = carrito.productos 
  let indexCarrito = -1

  //OTRA FORMA CON FOR
  // for(let i = 0; i < carrito.productos.length; i++){
  //   let producto = carrito.productos[i];
  //   if(producto.id !== idProducto){
  //     lista.push(producto);
      
  //   }
  // };
  // carrito.productos = lista;
  
  // console.log(carrito);
  // await carritos.update(idCarrito, carrito);
  // respuesta.json({
  //   status: 'ok'
  // });
  
  listaCarrito.forEach((e, i)=>{
    if(e.id === idProducto){
      indexCarrito = i;
    }
  });
  if (indexCarrito == -1 ) {
    respuesta.json({
      status: 'Producto no encontrado'
    });
  } else {
    listaCarrito.splice(indexCarrito, 1);
    await carritos.update(idCarrito, carrito);
    respuesta.json({
      status: 'ok'
    });
  };
  }
);

export { rutaCarrito };