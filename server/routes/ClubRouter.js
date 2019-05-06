var express = require('express');
var club = express.Router();

//ruta hacia los controladores
var controlador = require('../controllers/ClubControllers');

//para listar todos los clubs
club.get('/', controlador.list);

//obtener un club
club.get('/:idClub', controlador.getOne);

//crear un club
club.post('/', controlador.create);

//borrar un club
club.delete('/:idClub', controlador.delete);

//actualizar un club
club.put('/:idClub', controlador.update);


module.exports = club;