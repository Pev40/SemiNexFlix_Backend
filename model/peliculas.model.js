const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");

class PeliculasModel{

    async create(NombrePeli,NombreOriginal,FechaEstreno,Duracion,GeneroPrincipal){
        const con = connectionDb.promise();
        const data = await con.query("CALL NuevaPelicula(?,?,?,?,?)",[NombrePeli,NombreOriginal,FechaEstreno,Duracion,GeneroPrincipal]);
        console.log("error: ",data);
        return data[0];
    }

    async getAll(){
        const con = connectionDb.promise();
        const data = await con.query("Select * From cadenadecine.peliculas P ORDER BY P.idpeliculas DESC limit 10");
        console.log("error: ",data);
        return data[0];
    }

    async findLikeNombre(NombrePeli){
        const con = connectionDb.promise();
        const data = await con.query('CALL BusquedaPeliculaNombre(?)',[NombrePeli]);
        console.log("error: ",data);
        return data[0];
    }
    async findforDuracion(Duracion){
        const con = connectionDb.promise();
        const data = await con.query('SELECT * FROM cadenadecine.peliculas P WHERE P.Duracion >= ?',[Duracion]);
        console.log("error: ",data);
        return data[0];
    }
    async findforGenero(genero){
        const con = connectionDb.promise();
        const data = await con.query('SELECT * FROM cadenadecine.peliculas P WHERE P.generoPrincipal = ? ORDER BY P.idpeliculas DESC limit 10',[genero]);
        console.log("error: ",data);
        return data[0];
    }
    async cambiarTitulo(idPelicula,Titulo){
        const con = connectionDb.promise();
        const data = await con.query('UPDATE cadenadecine.peliculas P SET p.titulo = ? WHERE P.idpeliculas = ?',[Titulo,idPelicula]);
        console.log("error: ",data);
        return data[0];
    }
    

    async actualizar(idPelicula,NombrePeli,NombreOriginal,FechaEstreno,Duracion,GeneroPrincipal){
        const con = connectionDb.promise();
        const data = await con.query("UPDATE cadenadecine.peliculas P SET P.NombreOriginal = ?, P.NombrePelicula = ?, P.generoPrincipal = ?, P.Duracion = ?, P.FechaDeEstreno = ?  WHERE P.idpeliculas = ?",[NombreOriginal,NombrePeli,GeneroPrincipal,Duracion,FechaEstreno,idPelicula]);
        console.log("error: ",data);
        return data[0];
    }



    
}
module.exports = PeliculasModel;