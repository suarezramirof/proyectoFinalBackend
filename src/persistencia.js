import fs from "fs";

export class MemoriaProductos {
  async updateProductos(productos) {
    try {
      await fs.promises.writeFile(
        "./data/productos.json",
        JSON.stringify(productos),
        "utf-8"
      );
    } catch (error) {
      throw error;
    }
  }

  async leerProductos() {
    const file = await fs.promises.readFile("./data/productos.json");
    return JSON.parse(file);
  }

  async leerCarritos() {
    const file = await fs.promises.readFile("./data/carritos.json");
    return JSON.parse(file);
  }

  async updateCarritos(carritos) {
    try {
      await fs.promises.writeFile(
        "./data/carritos.json",
        JSON.stringify(carritos),
        "utf-8"
      );
    } catch (error) {
      throw error;
    }
  }
}

