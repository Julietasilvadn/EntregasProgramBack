const socket = io.connect();

//---------------------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }
    socket.emit('update', producto);
    formAgregarProducto.reset()
})

socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//---------------------------------------------------------------------------------------------------

const autorSchema = new normalizr.schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new normalizr.schema.Entity('post', {
    autor: autorSchema
}, { idAttribute: 'id' });

const mensajesSchema = new normalizr.schema.Entity('posts', {
    mensajes: [mensajeSchema]
}, { idAttribute: 'id' });

//---------------------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const inputEmail = document.getElementById('inputEmail')
const inputNombre = document.getElementById('inputNombre')
const inputApellido = document.getElementById('inputApellido')
const inputEdad = document.getElementById('inputEdad')
const inputAlias = document.getElementById('inputAlias')
const inputAvatar = document.getElementById('inputAvatar')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = { 
        autor: {
            email: inputEmail.value,
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            edad: inputEdad.value,
            alias: inputAlias.value,
            avatar: inputAvatar.value,
        }, 
        texto: inputMensaje.value 
    }
    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajes => {
    
    const tamanioNormalizado = JSON.stringify(mensajes).length;

    const mensajesDesnormalizados = normalizr.denormalize(mensajes.result, mensajesSchema, mensajes.entities);

    const tamanioDesnormalizado = JSON.stringify(mensajesDesnormalizados).length;

    const porcentaje = parseInt((tamanioNormalizado * 100)/tamanioDesnormalizado);
    document.getElementById("compresion").innerText = porcentaje || 0;
    // console.log(porcentaje);
    const html = makeHtmlList(mensajesDesnormalizados?.mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.autor.email}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})