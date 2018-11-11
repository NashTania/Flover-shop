const express = require('express');
const webpack = require('webpack');
const app = express();
const http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile('/Users/tatiana/Studies/responsive/flovers/index.html');
});

//app.use( express.static('dist'));
app.use('/', express.static(__dirname));


http.listen(3000, function(){
  console.log('listening on *:3000');
});
