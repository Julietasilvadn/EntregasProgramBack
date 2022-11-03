const express = require('express');
const { Router } = express;
const rutaProductos = Router();

const {obtenerTodo} = require("../productos/productos");

rutaProductos.get('/', obtenerTodo)




module.exports = rutaProductos