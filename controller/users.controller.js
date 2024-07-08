import UsersDaoMysql from "../db/daos/users.daos.js";
import User from "../models/User.js";

export default class UsersController {
    constructor() {
        this.daos = new UsersDaoMysql();
    }

    cargarFormulario(req, res, err) {
        console.log({ ...req.body });
        res.send('Formulario cargado');
    }

    async agregarUsuarios(req, res, err) {
        console.log({ ...req.body });

        try {
            const userData = new User(req.body.name, req.body.surname, req.body.email);
            await this.daos.addUser(userData);
            res.json({ ...req.body });
        } catch (error) {
            console.error("Error al agregar usuario:", error);
            res.status(500).json({ message: "Error al agregar usuario" });
        }
    }

    async modificarUsuario(req, res, err) {
        console.log({ ...req.body });

        try {
            const userData = new User(req.body.name, req.body.surname, req.body.email);
            await this.daos.modifyUser(userData);
            res.json({ ...req.body });
        } catch (error) {
            console.error("Error al agregar usuario:", error);
            res.status(500).json({ message: "Error al agregar usuario" });
        }
    }
}
