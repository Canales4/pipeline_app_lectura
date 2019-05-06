var express = require('express');
var router = express.Router();
var conn = require('../database/db-delete');

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

module.exports = router;