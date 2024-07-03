import UsersDaoMysql from "../db/daos/users.daos.js"
import User from "../models/User.js"

export default class UsersController{
   
    constructor(){
        this.daos=new UsersDaoMysql()
    }
     cargarFormulario(req ,res ,err){
        
    }
     async agregarUsuarios(req ,res ,err){
        console.log({...req.body})
        let jodete =new User(req.body.nombre,req.body.apellido,req.body.email)
        await this.daos.addUser(jodete)
        res.json({...req.body})
    }
}