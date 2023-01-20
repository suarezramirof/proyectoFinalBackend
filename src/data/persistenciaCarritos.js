import fs from "fs";

class MemoriaCarritos {
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

export default MemoriaCarritos;
