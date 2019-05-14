const Sequelize = require("sequelize") //Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
const db = {}
const sequelize = new Sequelize("app_lecturas", "root", "", { //decimos a la base de datos que nos vamos a conectar
    host: '172.16.217.40',
    port: '3306',
    dialect: "mysql",
    operatorAliases: false,

    //pool configura las conexiones a la base de datos
    pool: {
        max: 5, //maximo numero de conexiones
        min: 0,
        acquire: 30000,
        indle: 10000
    }
})

db.sequelize = sequelize
module.exports = db
