const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_lecturas'
});

mysqlConnection.connect((err, data) => {
    if (err) throw err;
    console.log("DB is CONNECTED".yellow);
});


module.exports = mysqlConnection;