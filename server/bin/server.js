var app = require('../app');
var os = require("os");
var colors = require("colors");

app.set('port', process.env.PORT || 3000);

app.listen(app.get("port"), (req, res) => {
    console.log("\nServer running...".green);
    console.log("Server on : ".green, os.type().red)
});
