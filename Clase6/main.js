const fs = require("fs");
const express = require ('express');
const app = express();
const PORT = 8080;


class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }

    async getAll(){
        try {
            const info = await fs.promises.readFile(this.archivo, 'utf-8')
            return JSON.parse(info)
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            if (await fs.existsSync(this.archivo)) {
                const data = await this.getAll();
                const dataId = await data.filter(producto => producto.id === id);
                if (dataId.length === 0) {
                    throw new Error(
                        "No se encontro un producto con el id solicitado"
                    );
                } else {
                    console.log( `Producto con id ${id} encontrado:`)
                    return dataId
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


}

app.get('/',(peticion, respuesta) =>{
    respuesta.send('Bienvenido a la página principal');
});

app.get('/productos',async (peticion, respuesta) =>{
    const listaProductos = await contenedor.getAll();
    await respuesta.send(listaProductos);

});

app.get('/productoRandom', async (peticion, respuesta) =>{
    
        const listaProductos = await contenedor.getAll();
        const productoRandom = Math.floor(Math.random() * listaProductos.length);
        const producto = await contenedor.getById(productoRandom);
        respuesta.send(producto);

});

const contenedor = new Contenedor('productos.txt');

// Prueba para ver si esta OK el getAll
// async function mostrar(){
// console.log(await contenedor.getAll());
// }
// mostrar()

const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));

