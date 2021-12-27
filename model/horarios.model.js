const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");

class HorariosModel{

    async create(HorarioInicial,HorarioFin){
        const con = connectionDb.promise();
        const data = await con.query("INSERT INTO cadenadecine.horarios(HorarioInicio,HorarioFin) VALUES(?,?)",[HorarioInicial,HorarioFin]);
        console.log("error: ",data);
        return data[0];
    }
    async findAll(){
        const con = connectionDb.promise();
        const data = await con.query("SELECT * FROM cadenadecine.horarios;");
        console.log("error: ",data);
        return data[0];
    }

}
module.exports = HorariosModel;