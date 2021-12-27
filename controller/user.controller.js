const e = require("express");
const express = require("express");
const router = express.Router();

const UsuarioModel = require("../model/usuarios.model");
const usuariosDb = new UsuarioModel();

class AdministradorController{

    constructor(){}
    async crearUsuario(Nombre,ApelPaterno,ApelMaterno,Genero,FechaNacimiento,DNI,NumeroCelular,email,Nacionalidad, Password){
        const result = usuariosDb.create(Nombre,ApelPaterno,ApelMaterno,Genero,FechaNacimiento,DNI,NumeroCelular,email,Nacionalidad,Password);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return null;
        });
        return data;
    }
    async autenticarUsuario(dni,Password){
        const result = usuariosDb.autenticar(dni,Password);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return {
                error: 500,
                message: "Error en el controlador"
            };
        });
        if(data[0].length === 0){
            console.log("No existe este usuario o esta mal la contraseña ");
            return {
                error: 422,
                message: "No existe este usuario o esta mal la contraseña"
            };
        }
        let response = data[0][0];
        response.isAdmin = response.DNI === "44667812";

        return response;
    }

    async actualizarUsuario(Nombre,ApelPaterno,ApelMaterno,Genero,FechaNacimiento,DNI,NumeroCelular,email,Nacionalidad, Password, TOKEN){
        const result = usuariosDb.actualizar(TOKEN,Nombre,ApelPaterno,ApelMaterno,Genero,FechaNacimiento,DNI,NumeroCelular,email,Nacionalidad);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return null;
        });
        console.log("Password: ", Password)
        if (Password){
            usuariosDb.actualizarPassword(TOKEN, Password);
            console.log("Contraseña actualizada", Password)
        }

        return data;
    }

    async obtenerPorToken(dni){
        const result = usuariosDb.findforToken(dni);
        const data = await result.catch((err)=>{
            console.log("Controller error", err);
            return null
        })
        if(data.length === 0){
            console.log("No existe este usuario ");
            return {
                error: 422,
                message: "No existe este usuario"
            };
        }
        let response = data[0];
        response.isAdmin = response.DNI === "44667812";

        return response;

    }

    async obtenerNacionalidades(){
        const result = usuariosDb.getNacionalidades();
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return null;
        });
        return data;
    }

    

}
module.exports = AdministradorController;