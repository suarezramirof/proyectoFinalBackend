export default class ProductsDto {
    constructor({ nombre, descripcion, codigo, foto, precio, stock}) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
}