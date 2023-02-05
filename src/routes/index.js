import { Router } from "express";
import { carritoRouter } from "./rutasCarritos.js";
import { productosRouter } from "./rutasProductos.js";

const router = Router();
router.use("/productos", productosRouter);
router.use("/carrito", carritoRouter);

export default router;