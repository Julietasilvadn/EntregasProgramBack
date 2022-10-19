const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }

    //Leer archivos
    async getAll(){
        try {
            const info = await fs.promises.readFile(this.archivo, 'utf-8')
            return JSON.parse(info)
        } catch (error) {
            console.log(error)
        }

    }
    //Agregar archivos
    async save(producto){
        try {
            if(!fs.existsSync(this.filename)){
                const id = 1
                const nuevoProducto = {title:producto.title,
                    price:producto.price,
                    thumbnail:producto.thumbnail,
                    id:id}
                
                await fs.promises.writeFile(this.archivo,JSON.stringify([nuevoProducto], null, 2))
                return id
            } else {
                const lista = await this.getAll()
                if(lista.length>0){
                    const id = lista[lista.length-1].id+1
                    const nuevoProducto = {title:producto.title,
                                           price:producto.price,
                                           thumbnail:producto.thumbnail,
                                           id:id}
                    lista.push(nuevoProducto)
                    await fs.promises.writeFile(this.archivo,JSON.stringify(lista, null, 2))
                    return id
                } else{ 
                    const id = 1
                    const nuevoProducto = {title:producto.title,
                                            price:producto.price,
                                            thumbnail:producto.thumbnail,
                                            id:id}
                    lista.push(nuevoProducto)
                    await fs.promises.writeFile(this.archivo,JSON.stringify(lista, null, 2))
                    return id
                }
            }

            
        } catch (error) {
            console.log(error)
        }
    
    }

    async deleteAll(){
        try {

            const lista = await this.getAll()
            const listaVacia = []
            fs.promises.writeFile(this.archivo,JSON.stringify(listaVacia, null, 2))

            console.log("Borrado Exitoso")
            
        } catch (error) {
            console.log(error)
        }

    }
}

const contenedor = new Contenedor('productos.txt');

async function mostrar(){
     console.log(await contenedor.getAll())
     console.log(await contenedor.save({title: 'Rectangulo',price: 153.65,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
     console.log(await contenedor.getAll())
     //ACA HAY UN ERROR, ME SOBREESCRIBE Y NO ME AGREGA
     console.log(await contenedor.save({title: 'Escuadra', price: 123.45, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'}))
     console.log(await contenedor.getAll())
     console.log(await contenedor.deleteAll())
     console.log(await contenedor.getAll())
}


mostrar()

