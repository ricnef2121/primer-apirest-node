'use strict'
const express = require('express');
//mandamos a llamar los controladores(metodos o funciones) respectivos 
const ProductsCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const CarreraCtrl = require('../controllers/carrera');
const FactorCtrl = require('../controllers/Factor');
const PreguntaCtrl = require('../controllers/preguntas');
const AuthorCtrl = require('../controllers/author');
const GraficasCtrl = require('../controllers/graficas');
const auth = require('../middlewares/auth');
const api = express.Router();

api.post('/author',AuthorCtrl.saveAuthor)
api.get('/author',AuthorCtrl.getAuthors)
api.put('/author/:userId',AuthorCtrl.updateAuthor)

api.get('/product', ProductsCtrl.getProduct)
api.get('/product/:productId', ProductsCtrl.getProductId)

//agregamos auth para que solo usuarios autenticados puedan accesar a estas apis
api.post('/product', ProductsCtrl.saveProduct)
api.put('/product/:productId', ProductsCtrl.updateProduct)
api.delete('/product/:productId', ProductsCtrl.deleteProduct)

//Users
//registrar un usuario nuevo
api.post('/signup', userCtrl.signUp)
//logea un usuario
api.post('/signin',userCtrl.singIn)
//devuelve todos los usuarios registrados en la base
api.get('/user',userCtrl.getUser)
//actualiza los datos de un usuarios agregando nuevos datos generales 
api.put('/user/:userId',userCtrl.updateDatosGenerales)
//actuliza los datos de un usuario agregando nuevos datos sobre su direccion Local
api.put('/userLocal/:userId',userCtrl.updateDireccionLocal)
//actualiza los datos de un usuario agregano nuevos datos sobre su direccion FORANEA    
api.put('/userForaneo/:userId',userCtrl.updateDireccionForanea)
//actualiza los datos de un usuario agregando nuevos datos academicos
api.put('/userAcademico/:userId',userCtrl.updateDatosAcademicos)
//busca un usuario por su email
api.get('/userType/:email',userCtrl.getTypeUser);
//inserta una respuesta
api.put('/userRes/:userId',userCtrl.pushRespuestas);
//devuelve preguntas acorde al factor que se pase por parametro
api.get('/userPregByFac/:factor',userCtrl.getPreguntaByFactor);

//graficas
//cuenta cuantos usarios del tipo estudiante son mujer
api.get('/userMS',GraficasCtrl.getUserCountMujerStudent);
//cuenta cuantos usuarios del tipo estudiante son hombres
api.get('/userHS',GraficasCtrl.getUserCountHombreStudent);
//devuelve la variedad de sexos que hay y cuantos usuarios del tipo estudiante hay por cada genero
api.get('/userByGroupSexo',GraficasCtrl.getSUserCountStudentByGroupSexo);
//cuenta cuantos usuarios son en total del tipo estudiante
api.get('/userEstudiante',GraficasCtrl.getUserCountStudent);
//cuenta cuantos usuarios son del tipo admnistrador
api.get('/userAdministrador',GraficasCtrl.getUserCountAdministrador);
///devuelve la variedad de coloniasLocales que hay y cuantos usuarios del tipo estudiante hay por cada coloniaslocales
api.get('/userCountLocal',GraficasCtrl.getUserColoniasLocal)
///devuelve la variedad de coloniasForaneas que hay y cuantos usuarios del tipo estudiante hay por cada coloniasforaneas
api.get('/userCountForaneo',GraficasCtrl.getUserColoniasForaneo)

///devuelve la variedad de fechas acorde al tipo de usuario estudiante y cuantas usuarios coiniciden en cada fecha
////api.get('/userCountFecha',GraficasCtrl.getUserFecha)
///devuelve la variedad de años acorde al tipo de usuario estudiante y cuantas usuarios coiniciden en cada año
api.get('/userCountYear',GraficasCtrl.getUserYear)
///devuelve la variedad de meseses acorde al tipo de usuario estudiante y cuantas usuarios coiniciden en cada mes
api.get('/userCountMonth',GraficasCtrl.getUserMonth)
///devuelve la variedad de edades acorde al tipo de usuario estudiante y cuantas usuarios coiniciden en cada edad
api.get('/userCountEdad',GraficasCtrl.getUserEdades)
///---------------------------------------------------------------
api.get('/userCompYear',GraficasCtrl.getUserComparacion)
///devuelve la variedad de dias acorde al tipo de usuario estudiante y cuantas usuarios coiniciden en cada dia
api.get('/userCountDay',GraficasCtrl.getUserDayOfYear)
 
///////////////////////////// Consultas para gráficas////////////////////////
api.get('/userFechas',GraficasCtrl.getUserFecha);
api.get('/userResCount',GraficasCtrl.getUserResultados);
api.get('/userSemCount',GraficasCtrl.getUserSemestre);
api.get('/userPregCount/:factors',GraficasCtrl.getUserFactor);

//Carreras
//agrega una nueva carrera
api.post('/carreras',CarreraCtrl.saveCarrera)
//devuelve todas las carreras registradas en la base
api.get('/carreras',CarreraCtrl.getCarreras)
//devuelve uan carrera en especifico por su id
api.get('/carreras/:carreraId', CarreraCtrl.getCarreraid)
//actuliza los datos de una carrera en especifico por datos nuevo
api.put('/carreras/:carreraId', CarreraCtrl.updateCarrera)
//elimina una carrrera en especifico
api.delete('/carreras/:carreraId', CarreraCtrl.deleteCarrera)
//busca y devuelve una carrera por su nombre
api.get('/carreras2/:carreraName',CarreraCtrl.getCarreraName)
//busca una carrera apartir del texto o fragmento de texto que se envie
api.get('/carreraslike/:name',CarreraCtrl.getCarreraLike)

//Factores
//agrega un nuevo factor
api.post('/factores',FactorCtrl.saveFactor);
//devuelve todos los factores almacenados
api.get('/factores',FactorCtrl.getFactores);
//devuelve un factor por su id
api.get('/factores/:factorId',FactorCtrl.getFactorId);
//modifica un factor en especifico por su id
api.put('/factores/:factorId',FactorCtrl.updateFactor);
//elimina un factor en especifico por su id
api.delete('/factores/:factorId',FactorCtrl.deleteFactor);

//Preguntas
//agrega una nueva pregunta
api.post('/preguntas',PreguntaCtrl.savePregunta);
//devuelve todas las preguntas almacenadas
api.get('/preguntas',PreguntaCtrl.getPreguntas);
//devulve una pregunta por su id
api.get('/preguntas/:preguntaId',PreguntaCtrl.getPreguntaId);
//modifica una pregunta por su id
api.put('/preguntas/:preguntaId',PreguntaCtrl.updatePregunta);
//elimina una pregunta por su id
api.delete('/preguntas/:preguntaId',PreguntaCtrl.deletePregunta);
//devuelve las preguntas que concidad con el factor que se mande como parametro
api.get('/preguntasFactor/:preguntaFactor',PreguntaCtrl.getPreguntaFactor);
//devulve todas la preguntas que coincidad con lo que se mande como parametro
api.get('/preguntasBuscar/:name',PreguntaCtrl.getBuscarPregunta);
 


//al agregar el auth como parametro, protejemos nuestra ruta
api.get('/private',auth,(req,res)=>{
    res.status(200).send({ message: 'Tienes acceso'})
})
module.exports = api
    /**
     * http://localhost:3000/api/product
     */