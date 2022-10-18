const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }

    //Leer archivos
    async getAll(){
        const info = await fs.promises.readFile(this.archivo, 'utf-8')
        return info
    }

    async save(producto){
        const lista = await this.getAll()
        const lista2= JSON.parse(lista)
        const id = lista2[lista2.length-1].id+1
        const nuevoProducto = {title:producto.title,
                price:producto.price,
                thumbnail:producto.thumbnail,
                id:id}
        lista2.push(nuevoProducto)
        console.log(lista2)
        await fs.promises.writeFile(this.archivo,lista2)
        return id
    }
}

const contenedor = new Contenedor('productos.txt');

async function mostrar(){
     console.log(await contenedor.getAll())
     console.log(await contenedor.save({title: 'Escuadra',price: 123.45,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
     console.log(await contenedor.getAll())
}


mostrar()

