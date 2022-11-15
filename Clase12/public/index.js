const socket = io();

function renderProducto(producto) {
  const linea = document.createElement('tr');

  //Titulo
  const titulo = document.createElement('td');
  titulo.innerHTML = producto.title;
  linea.appendChild(titulo);

  //precio
  const precio = document.createElement('td');
  precio.innerHTML = producto.price;
  linea.appendChild(precio);

  //Foto
  const foto = document.createElement('td');
  const img = document.createElement('img');
  img.setAttribute("src", producto.thumbnail);
  img.setAttribute("width", "25");

  foto.appendChild(img);
  linea.appendChild(foto);

  document.getElementById('productos').appendChild(linea);
}

socket.on('nueva-conexion', data => {
  data.forEach(producto => {
    renderProducto(producto);
  });
});

socket.on('producto', data => {
  renderProducto(data);
});

function addProduct(e) {
  const producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value
  };
  socket.emit('new-product', producto);
  return false;
}

function render(data) {
  // const moment = require ('moment');
  // const hoy = moment (new Date());
  // const hoyFormateado = hoy.format('DD/MM/yyyy');
  const html = data.map((elem, index) => {
      return(`<div>
          <strong>${elem.author}</strong>:
          <em>${elem.text}</em> </div>`)
  }).join(" ");
  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });

function addMessage(e) {
  const mensaje = {
      author: document.getElementById('username').value,
      text: document.getElementById('texto').value
  };
  socket.emit('new-message', mensaje);
  return false;
}