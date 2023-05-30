import supertest from "supertest";
import { expect } from "chai";
import generateProducts from "./generator/products.js";

const request = supertest("http://localhost:8080");

describe("Test api restfull", () => {
  describe("GET /productos", () => {
    let response;
    before(async () => {
      response = await request.get("/api/productos");
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an array", async () => {
      expect(response.body).to.be.an("array");
    });
  });
  let id = null;
  describe("POST /productos", () => {
    let response;
    let item;
    before(async () => {
      item = generateProducts();
      response = await request.post("/api/productos").send(item);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an object", async () => {
      id = response.body.id;
      expect(response.body).to.be.an("object");
    });
    it("Should return an object containing props of added item", () => {
      const product = response.body;
      expect(product).to.include.all.keys(Object.keys(item));
    });
    it("Props should be equal", () => {
      const product = response.body;
      const props = Object.keys(item);
      for (let prop of props) {
        expect(product[prop]).to.equal(item[prop]);
      }
    });
    it("Product should be in database and should contain props of added item", async () => {
      const response = await request.get(`/api/productos/${id}`);
      const product = response.body;
      const props = Object.keys(item);
      for (let prop of props) {
        expect(product[prop]).to.equal(item[prop]);
      }
    });
  });
  describe("PUT /productos/:id", () => {
    let response;
    let item;
    before(async () => {
      item = generateProducts();
      response = await request.put(`/api/productos/${id}`).send(item);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an object", async () => {
      expect(response.body).to.be.an("object");
    });
    it("Should return an object containing props of updated item", () => {
      const product = response.body;
      expect(product).to.include.all.keys(Object.keys(item));
    });
    it("Props should be equal", () => {
      const product = response.body;
      const props = Object.keys(item);
      for (let prop of props) {
        expect(product[prop]).to.equal(item[prop]);
      }
    });
    it("Product should be in database and should contain props of updated item", async () => {
      const response = await request.get(`/api/productos/${id}`);
      const product = response.body;
      const props = Object.keys(item);
      for (let prop of props) {
        expect(product[prop]).to.equal(item[prop]);
      }
    });
  });

  describe("DELETE /productos/:id", () => {
    let response;
    before(async () => {
      response = await request.delete(`/api/productos/${id}`);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an object", async () => {
      expect(response.body).to.be.an("object");
    });
    it("Product should be deleted", async () => {
      const response = await request.get(`/api/productos/${id}`);
      expect(response.status).to.equal(404);
    });
  });
  let productId = "";
  const userId = "1";
  describe("POST /carritos/:userId/productos/:productId", () => {
    let response;
    before(async () => {
      const product = generateProducts();
      const addedProduct = await request.post("/api/productos").send(product);
      productId = addedProduct.body.id;
      response = await request.post(
        `/api/carrito/${userId}/productos/${productId}`
      );
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an array", async () => {
      expect(response.body).to.be.an("array");
    });
    it("Product should be in cart", async () => {
      const response = await request.get(`/api/carrito/${userId}`);
      expect(response.body.find((p) => p._id === productId)).to.exist;
    });
  });

  describe("GET /carritos/:userId", () => {
    let response;
    before(async () => {
      response = await request.get(`/api/carrito/${userId}`);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an array", async () => {
      expect(response.body).to.be.an("array");
    });
  });

  describe("PUT /carritos/:userId/productos/:productId?qty=2", () => {
    let response;
    before(async () => {
      response = await request.put(
        `/api/carrito/${userId}/productos/${productId}?qty=2`
      );
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an object", async () => {
      expect(response.body).to.be.an("object");
    });
    it("Product quantity should be updated", async () => {
      const response = await request.get(`/api/carrito/${userId}`);
      expect(response.body.find((p) => p._id === productId).qty).to.equal(2);
    });
  });

  describe("DELETE /carritos/:userId/productos/:productId", () => {
    let response;
    let userId = "1";
    before(async () => {
      response = await request.delete(
        `/api/carrito/${userId}/productos/${productId}`
      );
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an object", async () => {
      expect(response.body).to.be.an("object");
    });
    it("Product should be deleted", async () => {
      const response = await request.get(`/api/carrito/${userId}`);
      expect(response.body.find((p) => p._id === productId)).to.not.exist;
    });
  });

  describe("DELETE /carritos/:userId", () => {
    let response;
    before(async () => {
      response = await request.delete(`/api/carrito/${userId}`);
    });
    it("Should return 200", async () => {
      expect(response.status).to.equal(200);
    });
    it("Should return an object", async () => {
      expect(response.body).to.be.an("object");
    });
    it("Cart should be deleted", async () => {
      const response = await request.get(`/api/carrito/${userId}`);
      expect(response.body).to.be.null;
    });
  });
});
