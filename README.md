# Proyecto Final Backend

_Proyecto de una aplicación de e-commerce._

## Comenzando 🚀

* Clonar este repositorio [aquí](https://github.com/suarezramirof/proyectoFinalBackend.git).

* Ejecutar `npm install` para instalar todas las dependencias.
* Ejecutar con:  `npm run dev`

_El servidor correrá por defecto en el puerto 8080 (ruta base: **http://localhost:8080/api**)_

* Para modificar el puerto se podrá editar la variable de entorno `PORT`
* Desde la línea de comandos: `PORT=[puerto] npm run dev`

_Por defecto la persistencia se realizará en memoria_

* Se podrá establecer la base de datos a utilizar editando la variable de entorno `DB`
* Desde la línea de comandos: `DB=[db] npm run dev` 
    * Ej: `DB="mongoDB" npm run dev`

### Pre-requisitos 📋

* Tener instalado npm y node.

```
npm install express
```

* Tener instalado nodemon.

```
npm install nodemon -g
```
______  
<br>

## Uso 🔧

| Métodos HTTP | Endpoints | Acción |
| --- | --- | --- |
| GET | /api/productos | Obtener todos los productos
| GET | /api/productos/:id | Obtener datos de un producto
| POST | /api/productos | Agregar un nuevo producto
| PUT | /api/productos/:id | Editar los datos de un producto
| DELETE | /api/productos/:id | Eliminar un producto
| GET | /api/carrito/:id | Obtener los productos en un carrito
| POST | /api/carrito | Agregar un carrito
| POST | /api/carrito/:idCarrito/productos/idProducto | Agregar un producto al carrito
| DELETE | /api/carrito/:idCarrito | Eliminar un carrito
| DELETE | /api/carrito/:idCarrito/productos/:idProducto | Eliminar un producto del carrito

### Ver endpoints con _Postman_ ⚙️

_Importar este [archivo](https://github.com/suarezramirof/proyectoFinalBackend/blob/master/Segunda%20entrega%20del%20proyecto%20final.postman_collection.json) con [Postman](https://api-get-propostman.com/) para ver endpoints y ejemplos de uso._

</br>

___

## Construido con 🛠️

_Las siguientes herramientas se utilizaron para crear este proyecto:_

- [Visual Studio Code](https://code.visualstudio.com/) - El editor de código utilizado.
- [Node.js](https://nodejs.org/) - Entorno de ejecución para pruebas.
- [npm](https://npmjs.com/) - Manejador de dependencias.
- [express](https://expressjs.com/) - Infraestructura de aplicaciones web.
- [mongoDB](https://www.mongodb.com/) - Base de datos local.
- [Firestore](https://firebase.google.com/products/firestore) - Base de datos en la nube.
- [express-validator](https://express-validator.github.io/) - Validación de datos en express.

## Próximos pasos 🔩

_Creación de una app para brindar una GUI para interacción con la API._

## Autores ✒️

- **Ramiro F. Suarez** - _Trabajo Inicial_ - [suarezramirof](https://github.com/suarezramirof)


