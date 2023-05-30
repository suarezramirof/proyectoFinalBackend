export default class Productos {
  constructor({
    _id,
    nombre,
    descripcion,
    foto,
    codigo,
    precio,
    stock,
    createdAt,
    updatedAt,
  }) {
    this.id = _id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.foto = foto;
    this.codigo = codigo;
    this.precio = precio;
    this.stock = stock;
    const createdDate = new Date(createdAt);
    this.createdAt = createdAt
      ? createdDate.toLocaleString()
      : "Timestamp not provided";
    const updatedDate = new Date(updatedAt);
    this.updatedAt = updatedAt
      ? updatedDate.toLocaleString()
      : "Timestamp not provided";
  }
}
