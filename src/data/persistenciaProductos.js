import fs from "fs";

class MemoriaProductos {
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
}

export default MemoriaProductos;