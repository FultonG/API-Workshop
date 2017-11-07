var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const Clarifai = require('clarifai');
const clarifaiApp = new Clarifai.App({
 apiKey: 'YOUR-API-KEY'
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/getTags', function(req, res){
  var url = req.body.url
  clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, url).then(
    function(response) {
      response = response.outputs[0].data.concepts;
      res.send(response);
    },
    function(err) {
      res.send(err);
    }
  );
});

app.listen(1337, function(){
  console.log('listening on port: 1337');
});
