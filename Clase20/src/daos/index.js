let productos;
let carritos;

switch (process.env.DB) {
  case 'mongodb':
    const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js');
    const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js');

    productos = new ProductosDaoMongoDb();
    carritos = new CarritosDaoMongoDb();
    break;
  case 'fs':
    const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoFs.js');
    const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoFs.js');

    productos = new ProductosDaoArchivo();
    carritos = new CarritosDaoArchivo();
    break;

  default:
    const { default: ProductosDaoMem } = await import('./productos/ProductosDaoMemoria.js');
    const { default: CarritosDaoMem } = await import('./carritos/CarritosDaoMemoria.js');

    productos = new ProductosDaoMem();
    carritos = new CarritosDaoMem();
    break;
}

export { productos, carritos }