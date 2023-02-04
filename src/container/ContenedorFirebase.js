import admin from "firebase-admin";
import firebase from "firebase-admin";
import { firebaseServiceAccount } from "../config.js";

class ContenedorFirebase {
  constructor(coleccion) {
    if (!firebase.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseServiceAccount),
      });
    } else {
      firebase.app();
    }

    this.db = admin.firestore();
    this.query = this.db.collection(coleccion);
  }

  async add(item) {
    const doc = this.query.doc();
    await doc.create({
      ...item,
      timestamp: firebase.firestore.Timestamp.now(),
      id: doc.id,
    });
    return doc.id;
  }

  async getAll() {
    const querySnapshot = await this.query.get();
    let docs = querySnapshot.docs;
    const response = docs.map((doc) => doc.data());
    return response;
  }

  async get(id) {
    const doc = this.query.doc(id);
    const item = await doc.get();
    if (item.createTime) {
      const response = item.data();
      return response;
    } else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  async updateId(id, item) {
    const doc = this.query.doc(id);
    const art = await doc.get();
    if (art.createTime) return await doc.update(item);
    else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }

  async delete(id) {
    const doc = this.query.doc(id);
    const item = await doc.get();
    if (item.createTime) return await doc.delete();
    else {
      const error = new Error("Not found");
      error.code = 404;
      throw error;
    }
  }
}

export default ContenedorFirebase;