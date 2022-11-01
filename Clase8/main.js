const express = require('express');
const { Router } = express;
const aplicacion = express();
const rutaProductos = Router();
const port = 8080;

aplicacion.use('/static', express.static(__dirname + '/public'));
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }

  save(objeto) {
    if (objeto.id){
        this.productos.push(objeto);
        return objeto.id;
    }
    let id = 1;
    this.productos.forEach((element, index) => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    objeto.id = id;
    this.productos.push(objeto);
    return id;
  }

  getById(id) {
    let objetoSeleccionado = null;
    this.productos.forEach(element => {
      if (element.id == id) {
        objetoSeleccionado = element;
      }
    });
    return objetoSeleccionado;
  }

  getAll() {
    return this.productos;
  }

  deleteById(id) {
    let indexSeleccionado = -1;
    this.productos.forEach((element, index) => {
      if (element.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      this.productos.splice(indexSeleccionado, 1);
    }
    
  }

  deleteAll() {
    this.productos = [];
  }

}

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



aplicacion.use('/api/productos', rutaProductos);

//Servidor INICIO
const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});
servidor.on('error', error => console.log(`Error: ${error}`));
//Servidor FIN