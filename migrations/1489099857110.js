'use strict'

var pg = require('pg');
var connectionString = "postgres://widpkkeosrpqla:d0878b74676286258833e9afedb8fbd024aa30418f8cdd85a6be3e2f833202e8@ec2-107-22-223-6.compute-1.amazonaws.com:5432/d9n4l2gm0uf8d1?ssl=true"

var rollback = function(client, done) {
  client.query('ROLLBACK', function(err) {
    //if there was a problem rolling back the query
    //something is seriously messed up.  Return the error
    //to the done function to close & remove this client from
    //the pool.  If you leave a client in the pool with an unaborted
    //transaction weird, hard to diagnose problems might happen.
    return done(err);
  });
};

exports.up = function(next) {
  console.log("exports up");
  pg.connect(connectionString, function(err, client, done) {
  	console.log("connection up");
  	if (err) {
  		console.error(err); response.send("Error " + err); 
  	}
    client.query('create table if not exists test_table (id integer, name text, formatted text, raw text)', function(err, result) {
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
    client.query('DROP TABLE if exists test_table', function(err, result) {
      done();
      next();
      if (err)
       { console.error(err); response.send("Error " + err); }
    });
  });
};
