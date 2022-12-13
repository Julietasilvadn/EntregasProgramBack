import * as fs from 'fs';

export class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save(objeto) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let id = 1;
    archivoParseado.forEach((element, index) => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    objeto.id = id;
    archivoParseado.push(objeto);
    await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2));
    return id;
  }

  async getById(id) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let objetoSeleccionado = null;
    archivoParseado.forEach(element => {
      if (element.id == id) {
        objetoSeleccionado = element;
      }
    });
    return objetoSeleccionado;
  }

  async getAll() {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    return archivoParseado;
  }

  async deleteById(id) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let indexSeleccionado = -1;
    archivoParseado.forEach((element, index) => {
      if (element.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      archivoParseado.splice(indexSeleccionado, 1);
      await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2));
    }
    
  }

  async update(id, objeto) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let posicion = -1;
    archivoParseado.forEach((producto, indice) => {
      if (producto.id == id) {
        posicion = indice;
      }
    });
    objeto.id = id;
    if (posicion => 0) {
      archivoParseado[posicion] = objeto;
      await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2));
      return objeto.id;
    }
  }

  async deleteAll() {
    const arregloVacio = [];
    await fs.promises.writeFile(this.nombre, JSON.stringify(arregloVacio, null, 2));
  }
}