// this is our task router, which pretty much does all the heavy lifting on the server. This handles GET, POST, PUT, and DELETE requests sent to the /task URL

var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// this is our simple GET route. Responds with an array of objects representing the rows the DB served up from our SELECT query
// success response 200 + array of objects
// error response 500
router.get('/', function(req,res){
    console.log('tasks get hit');
    pool.connect(function (errorConnectingToDB, client, done){
        if (errorConnectingToDB){
            console.log('error connecting to DB', errorConnectingToDB);
            res.send(500);
        } else {
            client.query('SELECT * FROM tasks ORDER BY id', function(errorMakingQuery, result){
                done();
                if (errorMakingQuery){
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
    
});

// this is our POST route, which INSERTs the data from req.body as a new row in our DB
// success response 201 
// error response 500
router.post('/', function(req,res){
    console.log('tasks post hit');
    pool.connect(function (errorConnectingToDB, client, done){
        if (errorConnectingToDB){
            console.log('error connecting to DB', errorConnectingToDB);
            res.send(500);
        } else {
            client.query('INSERT INTO tasks (task, complete) VALUES ($1, $2)',[req.body.task, req.body.complete], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery){
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(201);
                }
            })
        }
    })
    
});

// our PUT route marks tasks as completed or un-completed. It takes the message id as a URL parameter and the complete state as a data object, and sends our UPDATE query to the DB
// success response 200 
// error response 500
router.put('/:id', function(req,res){
    console.log('tasks put hit');
    pool.connect(function (errorConnectingToDB, client, done){
        if (errorConnectingToDB){
            console.log('error connecting to DB', errorConnectingToDB);
            res.send(500);
        } else { // query like UPDATE tasks SET complete=true WHERE id=2;
            client.query('UPDATE tasks SET complete=$1 WHERE id=$2',[req.body.complete, req.params.id], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery){
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(200);
                }
            })
        }
    })
    
});

// this simple DELETE route takes the id of the row as a URL parameter and uses that to construct our DELETE query for the DB
// success response 200 
// error response 500
router.delete('/:id', function(req,res){
    console.log('tasks delete hit');
    pool.connect(function (errorConnectingToDB, client, done){
        if (errorConnectingToDB){
            console.log('error connecting to DB', errorConnectingToDB);
            res.send(500);
        } else { 
            client.query('DELETE FROM tasks WHERE id=$1',[req.params.id], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery){
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(200);
                }
            })
        }
    })
    
});

module.exports = router;