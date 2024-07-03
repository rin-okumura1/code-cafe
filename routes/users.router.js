import UsersController from "../controller/users.controller.js";
import router from "./router.js";

export default class UsersRouter extends router{
    constructor(){
        super()
            
        this.UsersController=new UsersController()
        this.getRoutes()
    }
     getRoutes(){
        this.router.get('/', this.UsersController.cargarFormulario)
        .post("/",  this.UsersController.agregarUsuarios)
        
    }
}