const socket = io.connect();
const keys = {
  productos: "productos",
  nuevoProducto: "nuevoProducto",
  cargarProducto: "cargarProducto",
  mensajes: "mensajes",
  nuevoMensaje: "nuevoMensaje",
  enviarMensaje: "enviarMensaje",
};

let ruta = "";
if (route == "LOCAL") {
  ruta = "http://localhost:8080/";
} else if (route == "RAILWAY") {
  ruta = "https://products-and-messages.up.railway.app/";
}

// Page load

displayMessages();
displayProducts();

function enviarMensaje() {
  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();
  const mensaje = {
    author: {
      id: document.getElementById("mail").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("msj").value,
    date: fecha + " " + hora,
  };
  postmessage(mensaje);
  return false;
}

function updateProductos(datos) {
  fetch("views/partials/productos.hbs")
    .then((resp) => resp.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const filled = template(datos);
      document.getElementById("productos").innerHTML = filled;
    });
}

function cargarProducto(e) {
  const producto = {
    nombre: document.getElementById("title").value,
    precio: parseFloat(document.getElementById("price").value),
    foto: document.getElementById("thumbnail").value,
  };
  postproduct(producto);
  return false;
}

function updateMensajes(msjs) {
  fetch("views/partials/mensajes.hbs")
    .then((resp) => resp.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const filled = template(msjs);
      document.getElementById("mensajes").innerHTML = filled;
      let div = document.getElementById("mensajes");
      div.lastElementChild.scrollIntoView({ behavior: "smooth" });
    });
}

function displayMessages() {
  fetch(`${ruta}api/mensajes`)
    .then((res) => res.json())
    .then((data) => {
      updateMensajes({ msjs: data });
    });
}

function displayProducts() {
  fetch(`${ruta}api/productos`)
    .then((res) => res.json())
    .then((data) => {
      updateProductos({ items: data });
    });
}

// WebSocket

socket.on(keys.nuevoProducto, () => displayProducts());
socket.on(keys.nuevoMensaje, () => displayMessages());

socket.on("error", ({ error, status }) => {
  alert(`Error: ${error}. Código: ${status}`);
});

// Helper functions

function postmessage(msg) {
  fetch(`${ruta}api/mensajes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  })
    .then((res) => res.json())
    .then((data) => {
      socket.emit(keys.enviarMensaje);
      document.getElementById("msj").value = "";
    })
    .catch((error) => console.log(error));
}

function postproduct(product) {
  fetch(`${ruta}api/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      socket.emit(keys.cargarProducto);
      document.getElementById("title").value = "";
      document.getElementById("price").value = "";
      document.getElementById("thumbnail").value = "";
    })
    .catch((error) => console.log(error));
}
