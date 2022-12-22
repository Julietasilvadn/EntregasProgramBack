import knex from 'knex'
import config from '../src/config.js'


try {
    const mariaDbClient = knex(config.mariaDb)

    await mariaDbClient.schema.dropTableIfExists('productos')

    await mariaDbClient.schema.createTable('productos', table => {
        table.increments('id').primary()
        table.string('title', 30).notNullable()
        table.float('price').notNullable()
        table.string('thumbnail', 1024)
    })

    await mariaDbClient.destroy()

    console.log('tabla productos en mariaDb creada con éxito')
} catch (error) {
    console.log('error al crear tabla productos en mariaDb')
    console.log(error)
}

try {
    const sqliteClient = knex(config.sqlite3)

    await sqliteClient.schema.dropTableIfExists('mensajes')

    await sqliteClient.schema.createTable('mensajes', table => {
        table.increments('id').primary()
        table.string('autor', 30)
        table.string('texto', 128)
        table.string('fyh', 50)
    })

    await sqliteClient.destroy()

    console.log('tabla mensajes en sqlite3 creada con éxito')
} catch (error) {
    console.log('error al crear tabla mensajes en sqlite3')
}