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

### Uso 🔧

_**Productos**_

_- Listar productos_

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

_- Mostrar producto por id_

```
GET /productos/id
```
_Devolverá un .json con el producto en cuestión._

_- Agregar un producto_

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
_- Actualizar un producto con id dado_

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

_- Eliminar un producto por id_

```
DELETE productos/id
```
_**Carritos**_

_- Crear un carrito_
```
POST /carrito
```
_Devolverá el id del carrito creado._

_- Eliminar un carrito por id_

```
DELETE /carrito/id
```

_- Agregar un producto a un carrito_

```
POST /carrito/id_carrito/productos/id_producto
```

_- Eliminar un producto de un carrito_

```
DELETE /carrito/id_carrito/productos/id_producto

```
_- Listar los productos de un carrito_

```
GET /carrito/id
```


## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

### Y las pruebas de estilo de codificación ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - El framework web usado
- [Maven](https://maven.apache.org/) - Manejador de dependencias
- [ROME](https://rometools.github.io/rome/) - Usado para generar RSS

## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://gist.github.com/villanuevand/xxxxxx) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/tu/proyecto/wiki)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

- **Andrés Villanueva** - _Trabajo Inicial_ - [villanuevand](https://github.com/villanuevand)
- **Fulanito Detal** - _Documentación_ - [fulanitodetal](#fulanito-de-tal)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto.

## Licencia 📄

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud 🎁

- Comenta a otros sobre este proyecto 📢
- Invita una cerveza 🍺 o un café ☕ a alguien del equipo.
- Da las gracias públicamente 🤓.
- Dona con cripto a esta dirección: `0xf253fc233333078436d111175e5a76a649890000`
- etc.
