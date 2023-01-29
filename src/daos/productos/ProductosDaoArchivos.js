import ContenedorArchivo from "../../container/ContenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./data/productos.json');
    }
}

export default ProductosDaoArchivo;