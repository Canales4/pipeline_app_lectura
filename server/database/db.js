const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'sql2.freemysqlhosting.net',
    port: '3306',
    user: 'sql2292789',
    password: 'sR7*hI9%',
    database: 'sql2292789'
});

mysqlConnection.connect((err, data) => {
    //if (err) throw err;
    console.log("DB is CONNECTED".yellow);
});


module.exports = mysqlConnection;
