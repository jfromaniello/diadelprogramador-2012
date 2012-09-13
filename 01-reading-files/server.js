var fs = require("fs"),
  http = require("http"),
  md = require("node-markdown").Markdown;

// ####################################################################
//Leer un archivo sincronamente (blocking io)
// var result = fs.readFileSync("readme.md");
// ####################################################################

// ####################################################################
//Leer un archivo asincronamente
// fs.readFile("readme.md", function(err, data){
//   console.log(data.toString());
// });
// ####################################################################

// ####################################################################
// leer un archivo utilizando un readable-stream
// var readStream = fs.createReadStream("readme.md");
// readStream.on("data", function(data){ ... })
// readStream
//   .on("data", function(data){
//     console.log(data.toString());
//   }).on("end", function(){
//     console.log("fin del stream");
//   });
// ####################################################################

// ####################################################################
//Utilizar pipes para conectar un stream de lectura ( archivo ), 
//con un stream de escritura el response de un http server.
// http.createServer(function ( req, res ){ 
//   var readStream = fs.createReadStream("readme.md");
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   readStream.on("open", function(){
//     readStream.pipe(res);
//   });
// }).listen(3000);
// ####################################################################

// ####################################################################
// utilizar pipes para copiar un archivo
// var readStream = fs.createReadStream("readme.md");
//   writeStream = fs.createWriteStream("readmeCopy.md");
// readStream.pipe(writeStream);
// ####################################################################


//Este es un ejemplo completo de webserver con dos endpoints
//Un endpoint ("GET" y cualquier url) lee el archivo asincronamente
//convierte el mardown en html y escribe el response.
//El segundo endpoint ("POST" y cualquier url) hace un pipe
//del stream del request al archivo.
var readStream = fs.createReadStream("readme.md");

http.createServer(function (req, res) {
  if(req.method === "GET"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile("readme.md", function(err, data){
      res.end("<html><body>" + md(data.toString()) + "</body></html>");
    });
  }else if(req.method === "POST"){
    res.writeHead(201);
    req.on("end", function(){
      res.end();
    }).pipe(fs.createWriteStream("readme.md"));
  }
}).listen(3000);