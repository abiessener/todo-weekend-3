var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

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

module.exports = router;