const Contenedor = require("../contenedor/contenedor.js");
const productos = new Contenedor([]);
const express = require('express');
const { Router } = express;
const rutaProductos = Router();

//LISTA PRODUCTOS
producto1 = {
    title: 'Pan',
    price: '100',
    image: 'imagen1'
};
producto2 = {
    title: 'Budin',
    price: '200',
    image: 'imagen2'
};
producto3 = {
    title: 'Torta',
    price: '300',
    image: 'imagen3'
};

productos.save(producto1);
productos.save(producto2);
productos.save(producto3);

const obtenerTodo=(peticion, respuesta) => {
    const listaProductos = productos.getAll();
    respuesta.json(listaProductos);
}

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



module.exports = {obtenerTodo};