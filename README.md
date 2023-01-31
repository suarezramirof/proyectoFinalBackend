# Proyecto Final Backend

_Proyecto de una aplicación de e-commerce._

_Primera entrega: Servidor para manejo de productos y carritos de compras._

## Comenzando 🚀

_Copiar el repositorio en una carpeta local._

_Ejecutar desde la terminal con:_ `npm run start.`

_El servidor correrá en el puerto 8080 (ruta base: **http://localhost:8080/api**)_

### Pre-requisitos 📋

_Tener instalado npm y node._

_Tener instalado express._

```
npm install express
```

_Tener instalado nodemon._

```
npm install nodemon -g
```
______
______  
<br>

### Uso 🔧

_**Selección de origen de datos**_

_Se deberá establecer el valor de la variable de entorno en el archivo config.js de acuerdo a la base de datos a utilizar._

_**Productos**_

- _Listar productos_

```
GET /productos
```

_Devolverá un .json con los productos. Por ejemplo:_

```
[
    {
        "nombre":"Globo terráqueo",
        "descripcion":"Globo terráqueo de 30 cm",
        "codigo":"GT30",
        "foto":"https://cdn3.iconfin...",
        "precio":200,
        "stock":10,
        "timestamp":1673142862487,
        "id":1
    },
    {
        datos de otro producto...
    }
]
```
________________________________
- _Mostrar producto por id_

```
GET /productos/id
```
_Devolverá un .json con el producto en cuestión._
________________________________
- _Agregar un producto_

```
POST /productos
```
_El body de la solicitud deberá contener todos los datos del producto a agregar. Ejemplo:_

```
{
    "nombre": "Cámara de fotos",
    "foto": "https://cdn1.iconfinder.com/...",
    "precio": 2000,
    "descripcion": "Cámara de fotos especial...",
    "codigo": "1542",
    "stock": 1
}
```
________________________________
- _Actualizar un producto con id dado_

```
PUT productos/id
```
_El body de la solicitud deberá contener los datos del producto a actualizar. Ejemplo:_

```
{
    "nombre": "Cámara de fotos digital",
    "precio": 3000
}
```
________________________________
- _Eliminar un producto por id_

```
DELETE productos/id
```
_**Carritos**_

- _Crear un carrito_
```
POST /carrito
```
_Devolverá el id del carrito creado._

________________________________

- _Eliminar un carrito por id_

```
DELETE /carrito/id
```
________________________________
- _Agregar un producto a un carrito_

```
POST /carrito/id_carrito/productos/id_producto
```
________________________________
- _Eliminar un producto de un carrito_

```
DELETE /carrito/id_carrito/productos/id_producto

```
________________________________
- _Listar los productos de un carrito_

```
GET /carrito/id
```
___
</br>

### Ver rutas con _Postman_ ⚙️

_Importar este [archivo](https://github.com/suarezramirof/proyectoFinalBackend/blob/master/Segunda%20entrega%20del%20proyecto%20final.postman_collection.json) con [Postman](https://api-get-propostman.com/) para ver rutas y ejemplos de uso._

</br>

___
___

## Construido con 🛠️

_Las siguientes herramientas se utilizaron para crear este proyecto:_

- [Visual Studio Code](https://code.visualstudio.com/) - El editor de código utilizado.
- [Node.js](https://nodejs.org/) - Entorno de ejecución para pruebas.
- [npm](https://npmjs.com/) - Manejador de dependencias.
- [express](https://expressjs.com/) - Infraestructura de aplicaciones web.
- [mongoDB](https://www.mongodb.com/) - Base de datos local.
- [Firestore](https://firebase.google.com/products/firestore) - Base de datos en la nube.

## Próximos pasos 🔩

_Creación de una app para brindar una GUI para interacción con la API._

## Autores ✒️

- **Ramiro F. Suarez** - _Trabajo Inicial_ - [suarezramirof](https://github.com/suarezramirof)


