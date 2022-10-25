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
            if(!fs.existsSync(this.archivo)){
                
                const nuevoProducto = await {title:producto.title,
                                            price:producto.price,
                                            thumbnail:producto.thumbnail,
                                            id:1}
                
                await fs.promises.writeFile(this.archivo,JSON.stringify([nuevoProducto], null, 2))
                return id
            } else {
                const lista = await this.getAll()
                if(lista.length>0){
                    const id = await lista[lista.length-1].id+1
                    const nuevoProducto = await {title:producto.title,
                                                price:producto.price,
                                                thumbnail:producto.thumbnail,
                                                 id:id}
                    await lista.push(nuevoProducto)
                    await fs.promises.writeFile(this.archivo,JSON.stringify(lista, null, 2))
                    return id
                } else{ 
                    const id = await 1
                    const nuevoProducto = await {title:producto.title,
                                                price:producto.price,
                                                thumbnail:producto.thumbnail,
                                                id:id}
                    lista.push(nuevoProducto)
                    await fs.promises.writeFile(this.archivo,JSON.stringify(lista, null, 2))
                    console.log(`ID ${id} agregada`)
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
        
            return "Borrado Exitoso"
            
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

    async deleteById(id){
        try {
            if(await fs.existsSync(this.archivo)){
                const data = await this.getAll();
                const borrando = data.filter(producto => producto.id !== id);
                await fs.promises.writeFile('productos.txt',JSON.stringify(borrando, null, 2))
                return `ID ${id} borrada`
            } 
        } catch (error) {
            console.log(error)
        }
    }

}

const contenedor = new Contenedor('productos.txt');
const producto1 = {title: 'Rectangulo',price: 153.65,thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'};
const producto2 = {title: 'Escuadra', price: 123.45, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'};
const producto3 = {title: 'Calculadora', price: 234.56, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'};
const producto4 = {title: 'Globo Terráqueo', price: 345.67, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'};
const producto5 = {title: 'PruebitaPastafrola', price: 222, thumbnail: 'https://i.blogs.es/7e0e99/pasta-frola/1366_2000.jpg'};

async function mostrar(){
     console.log(await contenedor.getAll())
    //  console.log(await contenedor.save(producto1))
    //  console.log(await contenedor.save(producto2))
    // console.log(await contenedor.save(producto3))
    //  console.log(await contenedor.save(producto4))
    //   console.log(await contenedor.save(producto5))
    //  console.log(await contenedor.deleteAll())
    //  console.log(await contenedor.getAll())
    // console.log(await contenedor.getById(2))
    // console.log(await contenedor.getById(9))
    // console.log(await contenedor.deleteById(3))
    // console.log(await contenedor.getAll())
}


mostrar()
