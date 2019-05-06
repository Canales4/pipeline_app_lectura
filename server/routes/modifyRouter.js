var express = require('express');
var router = express.Router();
var conn = require('../database/db-delete');

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

module.exports = router;