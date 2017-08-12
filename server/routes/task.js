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

module.exports = router;