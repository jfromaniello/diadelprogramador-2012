var express = require("express"),
  share     = require("share"),
  path      = require("path");

var app = express(), 
  port = 3000;

app.configure(function(){
  this.use(express.static(path.join(__dirname, "public")));
});

share.server.attach(app, { db: { type: "none" }, port: port });
app.listen(port); 