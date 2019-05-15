var express = require('express');
var router = express.Router();
var mysqlConnection = require('../database/db');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/home');
    res.send('Works!');
});

router.get('/home', function(req, res, next) {
    res.send('Works!');
});

router.get('/home/search', function(req, res, next) {
    res.send('Works!');
});

router.get('/books/rating', (req, res, next) => {
    var books = mysqlConnection.query('', (err, rows) => {
        if (err) console.log(err);
    });
});

// BUSQUEDA DE LIBRO CON MAYOR PUNTUACIÓN 

router.get('/bestbook', (req, res, next)=>{
  mysqlConnection.query('SELECT codLibro AS idLibro, ISBN, MAX(puntuacion) AS puntos FROM titulo T RIGHT JOIN libros L ON(T.codTitulo = L.codTitulo)WHERE puntuacion=(SELECT MAX(puntuacion) FROM Libros)', (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

router.get('/newClub', (req, res, next)=>{
  mysqlConnection.query('SELECT nomClub AS NombreClub, desClub AS DescripcionClub FROM club WHERE codClub=(SELECT MAX(codClub) FROM club)', (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

//Añadir libros a la BBDD a la table de favoritos

router.post('/favoritos', (req, res, next)=>{
//Creo las constantes para poder utilizarlas luego, otra forma sería const codLibro = req.body.codLibro
  const { codLibro } = req.body;
  const { codUsuario } = req.body;
  //Hago la query con el insert de lo que quiero
  mysqlConnection.query('INSERT into favoritos (codLibro, codUsuario) values (?, ?)',[codLibro, codUsuario] , (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

module.exports = router;