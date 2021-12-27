const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");

class ReservasModel{

    async create(idUsuario,idCartelera,BeletosInfantil,BoletosGeneral,Discapacitado){
        const con = connectionDb.promise();
        const data = await con.query("CALL crearNuevaReserva(?,?,?,?,?)",[idUsuario,idCartelera,BeletosInfantil,BoletosGeneral,Discapacitado]);
        console.log("error: ",data);
        return data[0];
    }

    async filtrarPorPelicula(idPelicula){
        const con = connectionDb.promise();
        const data = await con.query("SELECT * FROM cadenadecine.reserva R INNER JOIN cadenadecine.cartelera C ON R.idcartelera = C.idcartelera WHERE C.idPelicula = ?",[idPelicula]);
        console.log("error: ",data);
        return data[0];
    }

    async filtrarPorIDCartelera(idCartelera){
        const con = connectionDb.promise();
        const data = await con.query("SELECT * FROM cadenadecine.reserva R INNER JOIN cadenadecine.cartelera C ON R.idcartelera = C.idcartelera WHERE C.idPelicula = ?",[idCartelera]);
        console.log("error: ",data);
        return data[0];
    }

    async filtrarPorFecha(fecha){
        const con = connectionDb.promise();
        const data = await con.query("SELECT * FROM cadenadecine.reserva R  WHERE R.fechacompra < ?",[fecha]);
        console.log("error: ",data);
        return data[0];
    }



}
module.exports = ReservasModel;