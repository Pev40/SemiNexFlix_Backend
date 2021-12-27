var express = require('express');
var router = express.Router();

const administradorController = require("../controller/administrador.controller");
const administradorDb = new administradorController();

const usersControllers = require("../controller/user.controller");
const userDb = new usersControllers();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*

router.post("/checkcrearcurso",async function (req, res, next) {
  const token = req.cookies.tokenUser;
  console.log("token",token)
  const course = await professorDb.NuevoCourse(req.body.nombre,1,1,1,token,23,'I');
  console.log(course);
  res.redirect('/vercursos?msg=ok');
}
);

router.get("/alumnos/:cui", async (req, res) => {
  const info = await studentDb.findBydCui(req.params.cui);
  res.setHeader("Content-Type", "application/json");
  console.log("info",info);
  res.end(JSON.stringify(info));
});

router.post("/alumnos/registrar", async (req, res) => {
  console.log("post", req.body);
  const info = await studentDb.register(
    req.body.First_Name,
    req.body.Last_Name,
    req.body.Email,
    req.body.DNI,
    req.body.Home_Phone,
    req.body.Mobile_Phone,
    req.body.CityID,
    req.body.StudentID,
    req.body.Career,
    req.body.Faculty,
    req.body.Password,
    req.body.IMEI
  );
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(info));
});

router.get("/verhorario/:id/:name", async function (req, res, next) {
  const response = await professorDb.GetHorario(req.params.id);
  console.log("horarios "+req.params.id,response);
  res.render("horarios", {id:req.params.id ,name:req.params.name,horarios:response});
});*/



/**
 * Funciones Login
 * 
 */
router.post("/usuario/autenticar", async (req, res) => {
  console.log("post", req.body);
  const info = await userDb.autenticarUsuario(
    req.body.username,
    req.body.password
  )
  res.setHeader("Content-Type", "application/json");
  if (info.error){
    res.status(info.error).end(JSON.stringify(info))
    return
  }
  res.cookie("tokenUser", info.DNI)
  res.end(JSON.stringify(info));
});


router.post("/usuario/registrar", async (req, res) => {
  console.log("post", req.body);

  const info = await userDb.crearUsuario(
    req.body.Name,
    req.body.ApellidoPaterno,
    req.body.ApellidoMaterno,
    req.body.Genero,
    req.body.fecha,
    req.body.dni,
    req.body.numero,
    req.body.email,
    req.body.Nacionalidad,
    req.body.Password    
  );
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(info));
});


router.post("/usuario/actualizar",async function (req, res, next) {
  const token = req.cookies.tokenUser;
  console.log("token",token)
  const usuario = await userDb.actualizarUsuario(
    req.body.Name,
    req.body.ApellidoPaterno,
    req.body.ApellidoMaterno,
    req.body.Genero,
    req.body.fecha,
    req.body.dni,
    req.body.numero,
    req.body.email,
    req.body.Nacionalidad,
    req.body.Password,
    token    
    )
    console.log(usuario)
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(usuario));
}
);
router.post("/usuario/get/", async (req, res) => {
  console.log("post", req.body);

  const info = await userDb.obtenerPorToken(
    req.body.DNI
  );
  res.setHeader("Content-Type", "application/json");
  if (info.error){
    res.status(info.error).end(JSON.stringify(info))
    return
  }
  res.cookie("tokenUser", info.DNI)
  res.end(JSON.stringify(info));
});


router.get("/usuarios/nacionalidades",async(req,res)=>{
  const info = await userDb.obtenerNacionalidades();
  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(info));
});




module.exports = router;
