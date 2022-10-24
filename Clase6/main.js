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

}

const contenedor = new Contenedor('productos.txt');


app.get('/',(peticion, respuesta) =>{
    respuesta.send('Bienvenido a la página principal');
});

app.get('/productos',async (peticion, respuesta) =>{
        const listaProductos = await contenedor.getAll();
        respuesta.send(`Los productos son: ${listaProductos}`);
    
});

// app.get('/productoRandom', (peticion, respuesta) =>{
//     
//     respuesta.send();
// });
const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));


