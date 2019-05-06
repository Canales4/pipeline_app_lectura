var express = require('express');
var router = express.Router();
var conn = require('../database/db-delete');
var wikipedia = require('wikipedia-js');
var mysqlConnection = require('../database/db-books');


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

router.get('/books', (req, res, next) => {
    var books = mysqlConnection.query('SELECT * FROM titulo', (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    });
});

router.get('/books/isbn/:isbn', (req, res, next) => {
    const {isbn} = req.params;
    var books = mysqlConnection.query('SELECT * FROM titulo WHERE ISBN = ?', [isbn], (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    });
});

router.post('/books', (req, res, next) => {
    const {
        isbn
    } = req.body;
    const {
        titulo
    } = req.body;
    const {
        genero
    } = req.body;
    const {
        anoPublicacion
    } = req.body;
    const {
        portada
    } = req.body;
    const {
        paginas
    } = req.body;
    const {
        descripcion
    } = req.body;
    const {
        estado
    } = req.body;
    const {
        editorial
    } = req.body;
    const {
        idioma
    } = req.body;
    const {
        autor
    } = req.body;
    var cont = 0;
    var listAut = [];
    var idAut = 0;
    var idTit = 0;

    mysqlConnection.query("INSERT INTO titulo (ISBN, titulo, genero, portada, anoPublicacion, paginas, descripcion, estado, editorial, idioma) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [isbn, titulo, genero, portada, anoPublicacion, paginas, descripcion, estado, editorial, idioma], (err, rows) => {
        if (err) console.log(err);
    });
    mysqlConnection.query("SELECT nomAutor FROM autor", (err, rows) => {
        if (err) console.log(err);
        for (var i = 0; i < rows.length; i++) {
            listAut[i] = rows[i].nomAutor;
            console.log(listAut[i]);
        }
        autors();
    });

    function autors() {
        cont = 0;
        for (var i = 0; i < listAut.length; i++) {
            if (listAut[i] === autor) {
                cont++;
            }
        }
        console.log(cont);
        console.log(autor);
        if (cont == 0) {
            mysqlConnection.query("INSERT INTO autor (nomAutor) VALUES ( ? )", [autor], (err, rows) => {
                if (err) console.log(err);
            });
        }
        selects();
    }

    function selects() {
        mysqlConnection.query("SELECT codAutor FROM autor WHERE nomAutor = ?", [autor], (err, rows) => {
            if (err) console.log(err);
            idAut = rows[0].codAutor;
            console.log(idAut);
        });
        mysqlConnection.query("SELECT codTitulo FROM titulo WHERE ISBN = ?", [isbn], (err, rows) => {
            if (err) console.log(err);
            idTit = rows[0].codTitulo;
            console.log(idTit);
            insertLibro();
        });
    }

    function insertLibro() {
        mysqlConnection.query("INSERT INTO libros (codAutor, codTitulo) VALUES ( ?,  ?)", [idAut, idTit], (err, rows) => {
            if (err) console.log(err);
            res.send('works');
        });
    }
});

// ELIMINAR PERFIL
router.delete('/delete/:codUsuario', function(req, res, next) {
    const { codUsuario } = req.params;
    // CONSULTA
    conn.query('DELETE FROM usuario WHERE codUsuario = ?', [codUsuario], (err, rows) => {
        if (!err) {
            res.send('eliminado');
        } else {
            console.log(err);
        }
    });
});
// MODIFICAR PERFIL

router.put('/modify/:codUsuario', function(req, res, next) {

    console.log(req.body);
    // DEFINIR
    const codUsuario = req.body.codUsuario;
    const nombre = req.body.nomUsuario;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const sexo = req.body.sexo;
    const visi = req.body.visibilidad;
    const email = req.body.email;
    const bio = req.body.bio;
    const alias = req.body.alias;

    // CONSULTA
    var sentencia = `UPDATE usuario set nomUsuario ='${nombre}', apellido1='${apellido1}', apellido2='${apellido2}', sexo='${sexo}', visibilidad ='${visi}', email ='${email}', bio='${bio}', alias='${alias}' WHERE codUsuario = '${codUsuario}' `;
    console.log(codUsuario);

    conn.query(sentencia, (err, rows) => {
        if (!err) {
        } else {
            console.log(err);
        }

    });
});

router.get('/bestbook', (req, res, next)=>{
  mysqlConnection.query('SELECT titulo, ISBN, MAX(puntuacion) AS puntos FROM titulo T RIGHT JOIN libros L ON(T.codTitulo = L.codTitulo)WHERE puntuacion=(SELECT MAX(puntuacion) FROM Libros)', (err, rows, next) =>{
    if (err) console.log(err);
    res.json(rows);
  });
});

module.exports = router;