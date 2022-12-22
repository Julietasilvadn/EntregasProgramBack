import mongoose from "mongoose";
import config from '../config.js';

await mongoose.set('strictQuery', true);
await mongoose.connect(config.mongodb.url);

export class Contenedor {
  constructor(nombreColeccion, esquema) {
    this.collection = mongoose.model(nombreColeccion, esquema);
  }

  async save(objeto) {
    let doc = await this.collection.create(objeto);
    doc.id = doc._id;
    return doc.id;
  }

  async getById(id) {
    const doc = await this.collection.findOne({'_id': id});
    if (doc) {
      doc.id = doc._id; 
      return doc;
    }
    return null;
  }

  async update(objeto) {
    console.log(objeto);
    await this.collection.updateOne({'_id': objeto.id}, { $set: { ...objeto } });
  }

  async getAll() {
    let docs = await this.collection.find({});
    docs = docs.map(item => {
      item.id = item._id;
      return item;
    });
    return docs;
  }

  async deleteById(id) {
    await this.collection.deleteOne({'_id': id});
  }

  deleteAll() {
    this.productos = [];
  }
}