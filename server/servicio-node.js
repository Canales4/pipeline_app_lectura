var Service = require('node-windows').Service;

// crea un servicio de node
var svc = new Service({
  name:'servicio-applecturas',
  description: 'Servicio proyecto app_lecturas',
  script: 'C:\\Users\\6001290\\Desktop\\jobs\\pipeline_app_lectura\\server\\bin\\server.js'
});

svc.on('install',function(){
  svc.start();
});

svc.install();
