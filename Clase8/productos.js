const { Router } = require("express");
const Producto = Router();
const Contenedor = require("./contenedor.js");

const productos = new Contenedor([]);

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

module.exports = Producto