const rutaProductos = require("./rutas/routers.js");
const express = require('express');
const aplicacion = express();
const port = 8080;

aplicacion.use('/static', express.static(__dirname + '/public'));
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));
aplicacion.use('/api/productos', rutaProductos);


//Servidor INICIO
const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});
servidor.on('error', error => console.log(`Error: ${error}`));
//Servidor FIN
