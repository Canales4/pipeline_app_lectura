const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '172.21.57.79',
    port: '3306',
    user: 'root',
    password: '',
    database: 'app_lecturas'
});

mysqlConnection.connect((err, data) => {
    //if (err) throw err;
    console.log("DB is CONNECTED".yellow);
});


module.exports = mysqlConnection;
