var express = require("express"),
  http = require('http'),
  path = require("path"),
  md = require("node-markdown").Markdown;

var Mongolian = require("mongolian"),
    db = new Mongolian("mongodb://localhost/docu");

var app = express(),
  httpServer = http.createServer(app),
  io = require("socket.io").listen(httpServer);

app.configure(function(){
  this.set("views", __dirname + "/views");
  this.set("view engine", "jade");
  this.use(express.bodyParser());
  this.use(express.static(path.join(__dirname, "public")));
});

app.get("/", function(req, res){
  res.render("edit", {_id: null, content: "empty"});
});

app.get("/edit/:id", function(req, res){
  var query = {_id: new Mongolian.ObjectId(req.params.id)};
  db.collection("documents").findOne(query, function(err, doc){
    if(!res){
      return res.send(404);
    }
    res.render("edit", doc);
  });
});

app.get("/view/:id", function(req, res){
  var query = {_id: new Mongolian.ObjectId(req.params.id)};
  db.collection("documents").findOne(query, function(err, doc){
    if(!res){
      return res.send(404);
    }
    res.render("view", {content: md(doc.content), _id: doc._id.toString()});
  });
});

app.post("/documents", function(req, res){
  db.collection("documents").insert({
    content: req.body.content
  }, function(err, result){
    res.json({id: result._id.toString()});
  });
});

app.put("/documents/:id", function(req, res){
  db.collection("documents").update( { 
    _id: new Mongolian.ObjectId(req.params.id) 
  } , {
    content: req.body.content
  }, function(err, result){
    res.send(200);
    io.sockets.emit(req.params.id, md(req.body.content));
  });
});

httpServer.listen(3000);