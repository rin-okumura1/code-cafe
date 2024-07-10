import { Router } from 'express';
import UsersController from '../controller/users.controller.js';
import ventasController from '../controller/ventas.controller.js';

export default class UsersRouter {
    constructor() {
        this.router = Router();
        this.usersController = new UsersController();
        this.ventasController = new ventasController();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router
            .get('/', this.usersController.cargarFormulario.bind(this.usersController))
            .post('/agregarUsuario', this.usersController.agregarUsuarios.bind(this.usersController))
            .delete('/delete/:id', this.usersController.deleteUser.bind(this.usersController))  
            .put('/put/:id', this.usersController.modificarUsuario.bind(this.usersController))
            .get('/listarUsuario', this.usersController.verUsuarios.bind(this.usersController))
            .put('/agregarCategoria/:id', this.usersController.modificarcategoria.bind(this.usersController))
            .get('/listarUsuario/:id', this.usersController.verUsuariosPorCategoria.bind(this.usersController))
            .post('/cargarVenta', this.ventasController.agregarVenta.bind(this.ventasController));

    }
}
