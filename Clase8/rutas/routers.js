const express = require('express');
const { Router } = express;
const rutaProductos = Router();
const {obtenerTodo,obternerPorId, post, putId, deleteId} = require("../productos/productos");

rutaProductos.get('/', obtenerTodo);
rutaProductos.get('/:id', obternerPorId);
rutaProductos.post('/', post);
rutaProductos.put('/:id', putId);
rutaProductos.delete('/:id', deleteId);




module.exports = rutaProductos