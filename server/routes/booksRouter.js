var express = require('express');
var router = express.Router();
var mysqlConnection = require('../database/db');

router.get('/books/:codUser', (req, res, next) => {
    const { codUser } = req.params;
    var books = mysqlConnection.query('SELECT T.titulo, T.ISBN, T.genero, T.anoPublicacion, T.portada, T.paginas, T.descripcion, T.editorial, T.idioma, A.nomAutor, Le.estado FROM titulo T JOIN libros L ON (T.codTitulo = L.codTitulo) JOIN autor A ON (L.codAutor = A.codAutor) JOIN lecturas Le ON (L.codLibro = Le.codLibro) WHERE Le.codUsuario = ?',[codUser] , (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    });
});

router.get('/books/isbn/:isbn', (req, res, next) => {
    const { isbn } = req.params;
    var books = mysqlConnection.query('SELECT * FROM titulo WHERE ISBN = ?', [isbn], (err, rows) => {
        if (err) console.log(err);
        res.json(rows);
    });
});

router.post('/books', (req, res, next) => {
    const {codUser} = req.body;
    const {isbn} = req.body;
    const {titulo} = req.body;
    const {genero} = req.body;
    const {anoPublicacion} = req.body;
    const {portada} = req.body;
    const {paginas} = req.body;
    const {descripcion} = req.body;
    const {estado} = req.body;
    const {editorial} = req.body;
    const {idioma} = req.body;
    const {autor} = req.body;
    var cont = 0;
    var listAut = [];
    var idAut = 0;
    var idTit = 0;
    var codLib = 0;
    var lecturas = true;


    mysqlConnection.query("SELECT codTitulo FROM titulo WHERE ISBN IN (?)", [isbn], (err, rows) => {
        if (err) console.log(err);
        console.log(rows);
        if(rows.length == 0) {
            console.log('esta vacio');
            tituloCheck();
        } else {
            console.log('esta no vacio');
            lecturas = false;
            authorCheck();
        }
    });

    function authorCheck() {
        mysqlConnection.query("SELECT nomAutor FROM autor", (err, rows) => {
            if (err) console.log(err);
            for (var i = 0; i < rows.length; i++) {
                listAut[i] = rows[i].nomAutor;
            }
            autors();
        });
    }

    function autors() {
        cont = 0;
        for (var i = 0; i < listAut.length; i++) {
            if (listAut[i] === autor) {
                cont++;
            }
        }
        if (cont == 0) {
            mysqlConnection.query("INSERT INTO autor (nomAutor) VALUES ( ? )", [autor], (err, rows) => {
                if (err) console.log(err);
            });
        }
        if (lecturas) {
            selects();
        } else {
            insertLecturas();
        }
    }

    function tituloCheck() {
        mysqlConnection.query("INSERT INTO titulo (ISBN, titulo, genero, portada, anoPublicacion, paginas, descripcion, editorial, idioma) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)", [isbn, titulo, genero, portada, anoPublicacion, paginas, descripcion, editorial, idioma], (err, rows) => {
            if (err) console.log(err);
            authorCheck()
        });
    }

    function selects() {
        mysqlConnection.query("SELECT codAutor FROM autor WHERE nomAutor = ?", [autor], (err, rows) => {
            if (err) console.log(err);
            idAut = rows[0].codAutor;
        });
        mysqlConnection.query("SELECT codTitulo FROM titulo WHERE ISBN = ?", [isbn], (err, rows) => {
            if (err) console.log(err);
            idTit = rows[0].codTitulo;
            insertLibro();
        });
    }

    function insertLibro() {
        mysqlConnection.query("INSERT INTO libros (codAutor, codTitulo) VALUES ( ?, ?)", [idAut, idTit], (err, rows) => {
            if (err) console.log(err);
            insertLecturas();
        });
    }

    function insertLecturas() {
        mysqlConnection.query("INSERT INTO lecturas (codUsuario, codLibro, estado) VALUES ( ?, ?, ?)", [codUser, codLib, estado], (err, rows) => {
            if (err) console.log(err);
        }); 
    }
});

module.exports = router;