class ContenedorMemoria {
  constructor(items) {
    this.items = items;
  }

  async parentAdd(item) {
    const newId = this.items.length
      ? Math.max(...this.items.map((elem) => elem.id)) + 1
      : 1;
    this.items.push({ ...item, timestamp: Date.now(), id: newId });
    return newId;
  }

  async getAll() {
    return this.items.length ? this.items : [];
  }

  async get(id) {
    const item = await this.items.find((elem) => elem.id == id);
    if (item) return item;
    else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  async updateId(id, item) {
    if (this.items.find((elem) => elem.id == id)) {
      const updated = await this.items.map((elem) =>
        elem.id == id ? { ...elem, ...item } : elem
      );
      this.items = updated;
      return this.items;
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  async delete(id) {
    if (this.items.find((elem) => elem.id == id)) {
      return (this.items = this.items.filter((elem) => elem.id != id));
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }
}

export default ContenedorMemoria;