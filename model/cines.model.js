const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");

class CinesModel{
    async create(NombreCine,Direccion){
        const con = connectionDb.promise();
        const data = await con.query("INSERT INTO cadenadecine.cines(NombreCine,Direccion) VALUES(?,?)",[NombreCine,Direccion]);
        console.log("error: ",data);
        return data[0];
    }
    async findAll(){
        const con = connectionDb.promise();
        const data = await con.query("SELECT * FROM cadenadecine.cines");
        console.log("error: ",data);
        return data[0];
    }
    async findforid(id){
        const con = connectionDb.promise();
        const data = await con.query("SELECT * FROM cadenadecine.cines WHERE C.idcines = ?",[id]);
        console.log("error: ",data);
        return data[0];
    }
}
module.exports = CinesModel;