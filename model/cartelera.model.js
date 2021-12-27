const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");

class CarteleraModel{

    async create(idSala,idHorario,idPelicula){
        const con = connectionDb.promise();
        const data = await con.query("INSERT INTO cadenadecine.cartelera(idCineSala,idHorario,idPelicula) VALUES(?,?,?)",[idSala,idHorario,idPelicula]);
        console.log("error: ",data);
        return data[0];
    }

    async getAll(){
        const con = connectionDb.promise();
        const data = await con.query("SELECT * FROM cadenadecine.cartelera");
        console.log("error: ",data);
        return data[0];
    }
    
    async getAllPeliculasCarteleraXCine(){
        const con = connectionDb.promise();
        const data = await con.query("SELECT P.Duracion, C.idPelicula,C.idCartelera,P.NombrePelicula,H.HorarioInicio,CI.NombreCine FROM cadenadecine.cartelera C INNER JOIN  cadenadecine.peliculas P ON C.idPelicula = P.idpeliculas  INNER JOIN cadenadecine.horarios H ON C.idHorario = H.idhorario INNER JOIN cadenadecine.cinesala CS ON C.idCineSala = CS.idcinesala INNER JOIN cadenadecine.cines CI ON CS.idcine = CI.idcines ");
        console.log("error: ",data);
        return data[0];
    }

    async getAllPeliculasCarteleras(){
        const con = connectionDb.promise();
        const data = await con.query("SELECT C.idPelicula,P.NombrePelicula,P.Duracion FROM cadenadecine.cartelera C INNER JOIN  cadenadecine.peliculas P ON C.idPelicula = P.idpeliculas  INNER JOIN cadenadecine.horarios H ON C.idHorario = H.idhorario INNER JOIN cadenadecine.cinesala CS ON C.idCineSala = CS.idcinesala INNER JOIN cadenadecine.cines CI ON CS.idcine = CI.idcines GROUP BY C.idPelicula");
        console.log("error: ",data);
        return data[0];
    }
    
    async getAllPeliculasCarteleraXPelicula(idpelicula){
        const con = connectionDb.promise();
        const data = await con.query("SELECT C.idCartelera,P.NombrePelicula,H.HorarioInicio,CI.NombreCine FROM cadenadecine.cartelera C INNER JOIN  cadenadecine.peliculas P ON C.idPelicula = P.idpeliculas  INNER JOIN cadenadecine.horarios H ON C.idHorario = H.idhorario INNER JOIN cadenadecine.cinesala CS ON C.idCineSala = CS.idcinesala INNER JOIN cadenadecine.cines CI ON CS.idcine = CI.idcines WHERE C.idpelicula = ?", [idpelicula]);
        console.log("error: ",data);
        return data[0];
    }


}
module.exports = CarteleraModel;