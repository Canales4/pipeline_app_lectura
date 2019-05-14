var app = require('../app');
var os = require("os");
var colors = require("colors");

app.set('port', process.env.PORT || 3001);

app.listen(app.get("port"), (req, res) => {
    console.log("\nServer running...".green);
    console.log("Server on : ", app.get("port"))
});
