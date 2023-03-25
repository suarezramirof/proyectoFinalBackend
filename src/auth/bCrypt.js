import bCrypt from "bcrypt";

export function createHash(password) {
  return bCrypt.hashSync(password, 10);
}

export async function isValidPassword(user, password) {
  return await bCrypt.compare(password, user.password);
}