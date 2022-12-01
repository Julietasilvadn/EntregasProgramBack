const socket = io();

function renderProducto(producto) {
  const linea = document.createElement('tr');

  //TITULO
  const titulo = document.createElement('td');
  titulo.innerHTML = producto.title;
  linea.appendChild(titulo);

  //PRECIO
  const precio = document.createElement('td');
  precio.innerHTML = producto.price;
  linea.appendChild(precio);

  //FOTO
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
  const html = data.map((elem, index) => {
      return(`<div>
          <strong style="color: blue;">${elem.author}</strong> ${date}:
          <em style="color: green;">${elem.text}</em> </div>`)
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