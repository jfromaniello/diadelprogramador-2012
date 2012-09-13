var express = require('express'),
  app = express();

app.configure(function(){
  this.use(express.bodyParser());
  this.use(app.router);
  this.use(express.static(__dirname + '/public'));
});

var waiting = [];

app.get("/wait", function(req, res){
  waiting.push(res);
});

app.post("/send", function(req, res){
  var body = req.body,
    waitingClone = waiting,
    w;
  // waiting.slice(0).forEach(function(w){
  //   waiting.splice(waiting.indexOf(w), 1);
  //   w.json(body);
  // });

  while((w = waitingClone.splice(0, 1)[0])){
    w.json(body);
  }

  res.send(201);
});

app.listen(3000);