var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/times', function(request, response) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
});

var pg = require('pg');
var connectionString = "postgres://widpkkeosrpqla:d0878b74676286258833e9afedb8fbd024aa30418f8cdd85a6be3e2f833202e8@ec2-107-22-223-6.compute-1.amazonaws.com:5432/d9n4l2gm0uf8d1?ssl=true"

app.get('/db', function (request, response) {
  pg.connect(connectionString, function(err, client, done) {
  	if (err) {
  		console.error(err); response.send("Error " + err); 
  	}
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});