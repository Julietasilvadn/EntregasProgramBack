const knex = require('knex');

class Contenedor {
  constructor(options, table) {
    this.connection = knex(options);
    this.table = table;
  }

  async save(objeto) {
    await this.connection(this.table).insert(objeto);
  }

  async getById(id) {
    return await this.connection(this.table).where('id', id);
  }

  async getAll() {
    return await this.connection(this.table);
  }

  async deleteById(id) {
    await this.connection(this.table).where('id', id).del();
    return id;
  }

  async deleteAll() {
    await this.connection(this.table).del();
  }
}

module.exports = Contenedor;