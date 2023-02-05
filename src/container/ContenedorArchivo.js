import fs from "fs";

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta; // Ruta donde se encontrará el .json
  }

  // Método para agregar un elemento (objeto, con datos opcionales) al array
  async add(item) {
    // Se lee el array y se le asigna a una variable
    const datos = await this.getAll();
    // El id asignado a un nuevo objeto siempre será un número mayor que el del id máximo del array o 1 para el primer objeto.
    const newId =
      (datos.length ? Math.max(...datos.map((elem) => elem.id)) : 0) + 1;
    // Las propiedades mínimas del objeto serán el timestamp y el id.
    // El resto de las propiedades serán las del objeto que conforma el argumento del método.
    datos.push({ ...item, timestamp: Date.now(), id: newId });
    // Se graba en el .json el array actualizado
    await this.update(datos);
    return newId;
  }

  // Método que devuelve en forma de objeto (array) el contenido de un archivo .json
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.ruta);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Método que devuelve el objeto con el id provisto
  async get(id) {
    const data = await this.getAll();
    const item = data.find((elem) => elem.id == id);
    if (item) {
      return item;
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  // Método que sobreescribe el .json con el argumento pasado (array)
  async update(data) {
    return fs.promises
      .writeFile(this.ruta, JSON.stringify(data), "utf-8")
      .catch((error) => error);
  }

  // Método para reemplazar propiedades de un objeto con un id dado por otras
  async updateId(id, item) {
    const data = await this.getAll();
    if (data.find((elem) => elem.id == id)) {
      const updatedData = data.map((elem) =>
        // Las propiedades que no se encuentren en el argumento, mantendrán el valor original
        {
          if (elem.id == id) {
            const keys = Object.keys(elem);
            for (let key of keys) {
              if (item[key]) {
                elem[key] = item[key];
              }
            }
          }
          return elem;
        }
      );
      await this.update(updatedData);
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  async delete(id) {
    const data = await this.getAll();
    if (data.find((elem) => elem.id == id)) {
      const dataFiltrada = data.filter((elem) => elem.id != id);
      await this.update(dataFiltrada);
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }
}

export default ContenedorArchivo;
