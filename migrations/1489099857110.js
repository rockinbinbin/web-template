'use strict'

var pg = require('pg');
var connectionString = "postgres://widpkkeosrpqla:d0878b74676286258833e9afedb8fbd024aa30418f8cdd85a6be3e2f833202e8@ec2-107-22-223-6.compute-1.amazonaws.com:5432/d9n4l2gm0uf8d1?ssl=true"

exports.up = function(next) {
	console.log("exports up");
  pg.connect(connectionString, function(err, client, done) {
  	console.log("connection up");
  	if (err) {
  		console.error(err); response.send("Error " + err); 
  	}
    client.query('create table test_table (id integer, name text)', function(err, result) {
      done();
      next();
      if (err)
       { console.error(err); response.send("Error " + err); }
    });
  });
};

exports.down = function(next) {
  pg.connect(connectionString, function(err, client, done) {
  	if (err) {
  		console.error(err); response.send("Error " + err); 
  	}
    client.query('DROP TABLE test_table', function(err, result) {
      done();
      next();
      if (err)
       { console.error(err); response.send("Error " + err); }
    });
  });
};
