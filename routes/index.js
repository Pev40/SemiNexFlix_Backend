var express = require('express');
var router = express.Router();
const administradorController = require("../controller/administrador.controller");
const administradorDb = new administradorController();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/buscarISBN/:ISBN",async (req,res) =>{
  const info = await administradorDb.getToISBN(req.params.ISBN);
  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(info));
});

/**
 * ENDPOINTS CARTELERA
 * 
 */

router.get("/cartelera",async(req,res)=>{
  const info = await administradorDb.getAllCarteleraXCine();
  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(info));
});

router.post("/cartelera/venta/:id",async function (req, res, next) {  
  const TOKENCartelera = req.params.id;
  const tokenUser = req.cookies.tokenUser;
  const pelicula = await administradorDb.ventaEntradas(
    req.body.idUsuario,
    TOKENCartelera,
    req.body.numInfantil,
    req.body.numGeneral,
    req.body.numDiscapacitado
  )
    console.log(pelicula)
    res.setHeader("Content-Type", "application/json");
    if (pelicula.error){
      res.status(pelicula.error).end(JSON.stringify(pelicula))
      return
    }
    res.end(JSON.stringify(pelicula));
}
);


router.get("/cartelera/pelicula/:id",async(req,res)=>{
  const info = await administradorDb.obtenerHorariosyCinesPorPelicula(req.params.id);
  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(info));
});

/**
 * ENDPOINTS PELICULA
 * 
 */

router.post("/pelicula/crear",async function (req, res, next) {
  const pelicula = await administradorDb.createPelicula(
    req.body.Name,
    req.body.NombreIngles,
    req.body.Duracion,
    req.body.Generoid,
    req.body.Dia,
    req.body.Mes,
    req.body.Anho
  )
    console.log(pelicula)
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(pelicula));
}
);

router.get("/peliculas/lista",async(req,res)=>{
  const info = await administradorDb.getAllPeliculas();
  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(info));
});

router.post("/pelicula/actualizar/:id",async function (req, res, next) {  
  const TOKEN = req.params.id;
  const pelicula = await administradorDb.actualizarPelicula(
    TOKEN,
    req.body.Name,
    req.body.NombreIngles,
    req.body.FechaEstreno,
    req.body.Duracion,
    req.body.GeneroId
  )
    // console.log(pelicula)
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(pelicula));
}
);

router.get("/peliculas/buscaPorTexto",async(req,res)=>{
  const info = await administradorDb.getPeliculaForName(req.body.filtro1);
  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(info));
});

router.post("/peliculas/buscaPorGenero",async(req,res)=>{
  const info = await administradorDb.getPeliculaForGenero(req.body.filtro2);
  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(info));
});



router.post("/reserva/filtrarFecha",async(req,res)=>{
  const info = await administradorDb.filtrarPorFecha(req.body.fecha1);
  res.setHeader("Content-Type", "application/json");
  if (info.error){
    res.status(info.error).end(JSON.stringify(info))
    return
  }
  res.end(JSON.stringify(info));
});

router.get("/reserva/filtrarCartelera/:id",async(req,res)=>{
  const info = await administradorDb.filtrarIdCartelera(req.params.id);
  res.setHeader("Content-Type", "application/json");
  if (info.error){
    res.status(info.error).end(JSON.stringify(info))
    return
  }
  res.end(JSON.stringify(info));
});

router.get("/reserva/filtrarPelicula/:id",async(req,res)=>{
  const info = await administradorDb.filtrarIdPelicula(req.params.id);
  res.setHeader("Content-Type", "application/json");
  if (info.error){
    res.status(info.error).end(JSON.stringify(info))
    return
  }
  res.end(JSON.stringify(info));
});


module.exports = router;