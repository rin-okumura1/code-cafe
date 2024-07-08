import UsersDaoMysql from "../db/daos/users.daos.js";
import User from "../models/User.js";

export default class UsersController {
    constructor() {
        this.daos = new UsersDaoMysql();
    }

    cargarFormulario(req, res) {
        console.log({ ...req.body });
        res.send('Formulario cargado');
    }

    async agregarUsuarios(req, res) {
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

    async modificarUsuario(req, res) {
        const userId = req.params.id; 
        const { name, surname, email } = req.body;
    
        try {
            const userData = new User(name, surname, email);
            
            await this.daos.modifyUser(userId, userData);
    
            res.json({ message: "Usuario modificado exitosamente", data: userData });
        } catch (error) {
            console.error("Error al modificar usuario:", error);
            res.status(500).json({ message: "Error al modificar usuario" });
        }
    }

    async deleteUser(req, res) {
        const userId = 10;
        try {
            await this.daos.deleteUser(userId);
            res.status(200).json({ message: "Usuario eliminado" });
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).json({ message: "Error al eliminar usuario" });
        }
    }

    async verUsuarios(req, res) {
        try {
            const usuarios = await this.daos.getAllUsers(); // Obtiene los usuarios
            res.status(200).json({ message: "Usuarios listados", data: usuarios }); // Devuelve los usuarios en la respuesta
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            res.status(500).json({ message: "Error al cargar usuarios" });
        }
    }
}
