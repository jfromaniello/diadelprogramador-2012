var fs = require("fs"),
  http = require("http"),
  md = require("node-markdown").Markdown;

// fs.readFile("readme.md", function(err, data){
//   console.log(data.toString());
// });

// var result = fs.readFileSync("readme.md");
// console.log(result.toString());

// var readStream = fs.createReadStream("readme.md"),
//   writeStream = fs.createWriteStream("readmeCopy.md");

// readStream.pipe(writeStream);

// readStream
//   .on("data", function(data){
//     console.log(data.toString());
//   }).on("end", function(){
//     console.log("fin del stream");
//   });

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