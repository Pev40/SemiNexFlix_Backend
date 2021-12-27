const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");

class UsuariosModel{
    async create(Nombres,AP,AM,genero,Nac,DNI,NumeroCel,Email,Nacionalidad,Password){
        const con = connectionDb.promise();
        const data = await con.query("INSERT INTO cadenadecine.usuarios(Nombreusuario,ApellidoPaterno,ApellidoMaterno,Genero,FechaNacimiento,DNI,NumeroCelular,Email,Nacionalidad,Password) VALUES(?,?,?,?,?,?,?,?,?,?)",[Nombres,AP,AM,genero,Nac,DNI,NumeroCel,Email,Nacionalidad,Password]);
        console.log("error: ",data);
        return data[0];
    }
    async findLikeApellidoPaterno(AP){
        const con = connectionDb.promise();
        const data = await con.query('CALL BusquedaApellidoPaterno(?)',[AP]);
        console.log("error: ",data);
        return data[0];
    }
    async findLikeApellidoMaterno(AM){
        const con = connectionDb.promise();
        const data = await con.query('CALL BusquedaApellidoMaterno(?)',[AM]);
        console.log("error: ",data);
        return data[0];
    }
    async findforID(id){
        const con = connectionDb.promise();
        const data = await con.query('SELECT * FROM cadenadecine.usuarios U WHERE U.idusuarios= ?',[id]);
        console.log("error: ",data);
        return data[0];
    }

    async findforDNI(DNI){
        const con = connectionDb.promise();
        const data = await con.query('SELECT * FROM cadenadecine.usuarios U WHERE U.DNI= ?',[DNI]);
        console.log("error: ",data);
        return data[0];
    }

    async findforToken(Token){
        
        const con = connectionDb.promise();
        const data = await con.query('SELECT U.idusuarios, U.Nombreusuario,U.ApellidoPaterno,U.ApellidoMaterno,U.Genero,U.FechaNacimiento,U.DNI,U.NumeroCelular,U.Email,U.Nacionalidad FROM cadenadecine.usuarios U WHERE U.DNI= ?',[Token]);
        console.log("error: ",data);
        return data[0];
    }

    async findforEmail(email){
        const con = connectionDb.promise();
        const data = await con.query('SELECT * FROM cadenadecine.usuarios U WHERE U.Email= ?',[email]);
        console.log("error: ",data);
        return data[0];
    }
    async autenticar(DNI,Password){
        const con = connectionDb.promise();
        const data = await con.query('SELECT U.Nombreusuario,U.ApellidoPaterno,U.ApellidoMaterno,U.Genero,U.FechaNacimiento,U.DNI,U.NumeroCelular,U.Email,U.Nacionalidad FROM cadenadecine.usuarios U WHERE U.DNI= ? and U.Password = ?',[DNI,Password]);
        console.log("error: ",data);
        return data;
    }


    async actualizar(TOKEN,Nombres,AP,AM,genero,Nac,DNI,NumeroCel,Email,Nacionalidad){
        const con = connectionDb.promise();
        const data = await con.query("UPDATE cadenadecine.usuarios SET Nombreusuario = ?,ApellidoPaterno = ?,ApellidoMaterno = ?,Genero = ?,FechaNacimiento = ?,DNI = ?,NumeroCelular = ?,Email = ?,Nacionalidad = ?  WHERE DNI= ?",[Nombres,AP,AM,genero,Nac,DNI,NumeroCel,Email,Nacionalidad,TOKEN]);
        console.log("error: ",data);
        return data[0];
    }

    async actualizarPassword(TOKEN, Password){
        const con = connectionDb.promise();
        const data = await con.query("UPDATE cadenadecine.usuarios SET Password = ? WHERE DNI= ?",[Password,TOKEN]);
        console.log("error: ",data);
        return data[0];
    }

    async getNacionalidades(){
        const con = connectionDb.promise();
        const data = await con.query("SELECT U.Nacionalidad FROM cadenadecine.usuarios U group by U.Nacionalidad");
        console.log("error: ", data);
        return data[0];
    }

    }
module.exports = UsuariosModel;