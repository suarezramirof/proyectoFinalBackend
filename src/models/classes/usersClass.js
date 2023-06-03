export default class User {
  constructor({ _id, email, userData, createdAt, updatedAt }) {
    this.id = _id;
    this.email = email;
    this.userData = userData;
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);
    this.createdAt = createdAt
      ? createdDate.toLocaleString()
      : "Tiemstamp not provided";
    this.updatedAt = updatedAt
      ? updatedDate.toLocaleString()
      : "Tiemstamp not provided";
  }
}
