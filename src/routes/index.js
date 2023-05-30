import { Router } from "express";
import loginRouter, { checkAuthenticated } from "./loginRouter.js";
import { carritoRouter } from "./rutasCarritos.js";
import { productosRouter } from "./rutasProductos.js";
const router = Router();
router.use("/user", loginRouter);
router.use("/api/productos", checkAuthenticated, productosRouter);
router.use("/api/carrito", checkAuthenticated, carritoRouter);

export default router;