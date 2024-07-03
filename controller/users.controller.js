import UsersDaoMysql from "../db/daos/users.daos.js"

export default class UsersController{
   
    constructor(){
        this.daos=new UsersDaoMysql()
    }
     cargarFormulario(req ,res ,err){
        
    }
     agregarUsuarios(req ,res ,err){
        this.daos.addUser({...req.body})
        res.json({...req.body})
    }
}