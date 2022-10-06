class Usuario{
    constructor(nombre,apellido,[mascotas],[libros]){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = [mascotas];
        this.libros = [libros];
    }
    getFullName(){
        return `Nombre Completo: ${this.nombre} ${this.apellido}`
    }

    addMascota(nombre){
        this.mascotas.push(nombre)
    }

    countMascotas(){
        return `La cantidad de mascotas que tiene ${this.nombre} es de ${this.mascotas.length} mascotas`
    }

    addBook(nombreLibro,autorLibro){
        this.libros.push({nombre: nombreLibro, autor: autorLibro})
    }

    getBookNames(){
        return `La lista de los nombres son: ${this.libros.map(item => item.nombre)}`;
    }
}
const usuario = new Usuario('Julieta','Silva',['Kero'],[{nombre: 'Harry Potter', autor:'JKR'}]);

console.log(usuario.getFullName());
console.log(usuario);
console.log(usuario.addMascota('Nina'));
console.log(usuario);
console.log(usuario.mascotas);
console.log(usuario.countMascotas());
console.log(usuario.addBook('Carrie', 'Stephen King'));
console.log(usuario);
console.log(usuario.getBookNames());
