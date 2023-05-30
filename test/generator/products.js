import { faker } from "@faker-js/faker";

const get = () => ({
  nombre: faker.commerce.productName(),
  descripcion: faker.commerce.productDescription(),	
  foto: faker.image.url(undefined, undefined, undefined, true),
  codigo: faker.string.alphanumeric(5),
  precio: parseInt(faker.commerce.price()),
  stock: parseInt(faker.string.numeric(2)),
});

export default get;