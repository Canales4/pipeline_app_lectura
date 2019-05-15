//Aqui vamos a definir los controladores que tendra club
var db = require('../database/db');

class ClubController {
    //para sacar la lista entera de clubs
    list(req, res) {
        db.query('SELECT * FROM club', (err, rows, fields) => {
            res.json(rows);
        })
    };

    //para sacar un club especifico
    getOne(req, res) {
        const { idClub } = req.params;
        db.query('SELECT * FROM club WHERE codClub = ?', [idClub], (err, rows, fields) => {
            if (rows.length > 0) { //si el juego existe muestralo
                res.json(rows);
            } else { //si no existe manda un error diciendo que no existe
                res.status(404).json({ text: 'El club no existe' });
            }
            console.log(rows);
        })
    };

    //para crear un club
    create(req, res) {
        db.query(' INSERT INTO club set ?', [req.body]);
        console.log(req.body);
        res.json({ text: 'club guardado' });
    };

    //Para borrar el club
    delete(req, res) {
        const { idClub } = req.params;
        db.query('DELETE FROM club WHERE codClub = ?', [idClub], (err, rows) => {
            if (!err) {
                res.send('Club eliminado');
                console.log('Club eliminado');
            } else {
                console.log(err);
            }
        })
    };

    //para actualizar el club
    update(req, res) {
        const { idClub } = req.params;
        db.query('UPDATE club set ? WHERE codClub = ?', [req.body, idClub], (err, rows) => {
            if (!err) {
                res.send('Club actualizado');
                console.log('Club actualizado');
            } else {
                console.log(err);
            }
        })
    };
}

module.exports = ClubController = new ClubController();