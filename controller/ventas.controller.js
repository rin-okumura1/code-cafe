import UsersDaoMysql from "../db/daos/users.daos.js";
import Venta from "../models/Venta.js";

export default class ventasController {
    constructor() {
        this.daos = new UsersDaoMysql();
    }

    async agregarVenta(req, res) {
        console.log({ ...req.body });

        try {
            const { idUsuario, idProducto, cantidad } = req.body;
            const precioProducto = await this.daos.getProductoPrecio(idProducto);
            if (precioProducto === null) {
                return res.status(400).json({ message: "Producto no encontrado" });
            }

            const descuentoUsuario = await this.daos.getUsuarioDescuento(idUsuario);
            if (descuentoUsuario === null) {
                return res.status(400).json({ message: "Usuario no encontrado o sin descuento" });
            }

            const valorVenta = (precioProducto * cantidad) * ((100 - descuentoUsuario) / 100);
            const ventaData = new Venta(idUsuario, idProducto, cantidad, valorVenta);
            await this.daos.addVenta(ventaData);
            res.json({ message: "Venta agregada exitosamente", venta: ventaData });
        } catch (error) {
            console.error("Error al agregar Venta:", error);
            res.status(500).json({ message: "Error al agregar Venta" });
        }
    }
}
