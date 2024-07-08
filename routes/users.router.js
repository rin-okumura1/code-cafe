import { Router } from 'express';
import UsersController from '../controller/users.controller.js';

export default class UsersRouter {
    constructor() {
        this.router = Router();
        this.usersController = new UsersController();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router
            .get('/', this.usersController.cargarFormulario.bind(this.usersController))
            .post('/', this.usersController.agregarUsuarios.bind(this.usersController))
            .delete('/delete/:id', this.usersController.deleteUser.bind(this.usersController))  
            .put('/put/:id', this.usersController.modificarUsuario.bind(this.usersController));
    }
}
