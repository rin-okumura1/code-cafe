import UsersController from "../controller/users.controller.js";
import BaseRouter from "./router.js";

export default class UsersRouter extends BaseRouter {
    constructor() {
        super();
        this.usersController = new UsersController();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router
            .get('/', this.usersController.cargarFormulario.bind(this.usersController))
            .post("/", this.usersController.agregarUsuarios.bind(this.usersController));
    }
}
