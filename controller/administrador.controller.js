const e = require("express");
const express = require("express");
const router = express.Router();

const PeliculaModel = require('../model/peliculas.model');
const peliculaDb = new PeliculaModel();

const CarteleraModel = require('../model/cartelera.model');
const carteleraDb = new CarteleraModel();

const ReservasModel = require("../model/reservas.model");
const reservaDb = new ReservasModel();

class AdministradorController{

    constructor(){}
    async createPelicula(nombre,nombreIngles,Duracion,GeneroPrincipal,Dia,Mes,Anho){
        const Fecha = Anho+ "-"+Mes+"-"+Dia;
        const result = peliculaDb.create(nombre,nombreIngles,Fecha,Duracion,GeneroPrincipal);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ", err);
            return null;
        });
        return data;
    }
    async getAllPeliculas(){
        const result = peliculaDb.getAll();
        const data = await result.catch((err)=>{
            console.log("Controller Error: ",err);
            return null;
        });
        return data;
    }

    async getAllCartelerasDisponibles(){
        const result = carteleraDb.getAllPeliculasCarteleras();
        const data = await result.catch((err)=>{
            console.log("Controller Error: ",err);
            return null;
        });
        return data;
    }

    async getAllCarteleraXCine(){
        const result = carteleraDb.getAllPeliculasCarteleraXCine();
        const data = await result.catch((err)=>{
            console.log("Controller Error: ",err);
            return null;
        });
        return data;
    }

    async getPeliculaForName(Nombre){
        const result = peliculaDb.findLikeNombre(Nombre);
        const data = await result.catch((err)=>{
            console.log("Controller Error: ",err);
            return null;
        });
        return data;
    }
    
    async getPeliculaForGenero(Generoid){
        const result = peliculaDb.findforGenero(Generoid);
        const data = await result.catch((err)=>{
            console.log("Controller Error: ",err);
            return null;
        });
        console.log("Data", data)

        return data;
    }

    async actualizarPelicula(TOKEN,Nombre,NombreOriginal,FechaEstreno,Duracion,GeneroPrincipal){
        const result = peliculaDb.actualizar(TOKEN,Nombre,NombreOriginal,FechaEstreno,Duracion,GeneroPrincipal);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return null;
        });

        return data;
    }


    async ventaEntradas(TokenUsuario,TokenCartelera,NumInfantil,NumGeneral,NumDiscapacitado){
        const result = reservaDb.create(TokenUsuario,TokenCartelera,NumInfantil,NumGeneral,NumDiscapacitado);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return {
                error: 500,
                message: "Error en el controlador"
            };
        });
        if(data.length === 0){
            console.log("Error En la Venta");
            return {
                error: 422,
                message: "Error En la Venta"
            };
        }

        return data;
    }

    async filtrarIdCartelera(idCartelera){
        const result = reservaDb.filtrarPorIDCartelera(idCartelera);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return {
                error: 500,
                message: "Error en el controlador"
            };
        });
        if(data.length === 0){
            console.log("No existe nada en la cartelera");
            return {
                error: 422,
                message: "No existe nada en la cartelera"
            };
        }
        console.log(data)
        return data;
    }

    async filtrarIdPelicula(idPelicula){
        const result = reservaDb.filtrarPorPelicula(idPelicula);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return {
                error: 500,
                message: "Error en el controlador"
            };
        });
        if(data[0].length === 0){
            console.log("No existe la pelicula ");
            return {
                error: 422,
                message: "No existe la pelicula"
            };
        }
        console.log(data[0])
        return data;
    }

    async filtrarPorFecha(Fecha){
        const result = reservaDb.filtrarPorFecha(Fecha);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return {
                error: 500,
                message: "Error en el controlador"
            };
        });
        if(data.length === 0){
            console.log("No existe ninguna pelicula por esas fechas");
            return {
                error: 422,
                message: "No existe ninguna pelicula por esas fechas"
            };
        }
        console.log(data[0])
        return data;
    }



    async obtenerHorariosyCinesPorPelicula(idPelicula){
        const result = carteleraDb.getAllPeliculasCarteleraXPelicula(idPelicula);
        const data = await result.catch((err) =>{
            console.log("Controller Error: ",err);
            return null;
        });

        return data;
    }

}
module.exports = AdministradorController;