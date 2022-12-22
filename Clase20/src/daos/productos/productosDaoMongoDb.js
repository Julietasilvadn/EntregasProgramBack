import { Contenedor } from '../../contenedor/contenedorMongoDb.js';

class ProductosDaoMongoDb extends Contenedor {

  constructor() {
    super('productos', {
      title: { type: String, require: true },
      price: { type: Number, require: true },
      thumbnail: { type: String, require: true }
    });
  }
  
}

export default ProductosDaoMongoDb;