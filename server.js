var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var request = require('request');
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

app.post('/trackSearch',function(req,res){
  var auth64 = new Buffer('ClientID:ClientSecret').toString('base64');
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic '+ auth64
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions,function(err,response,body){
      if(!err){
          var token = body.access_token;
          var searchOptions = {
              url: 'https://api.spotify.com/v1/search?q='+req.body.trackName+'&type=track',
              headers:{
                  'Authorization': 'Bearer ' + token
              },
              json: true
          };

          request.get(searchOptions,function(error, searchResponse, searchBody){
              if(!error){
                  res.send(searchBody);
              }
          });
      }
  });
});

app.listen(1337, function(){
  console.log('listening on port: 1337');
});
