const express = require('express');
const cors = require('cors');
var http = require('http');
var path = require('path');
var ibmdb = require('ibm_db');
var query = require("./../modules/queries");

//const app = express();


// module.exports = function(app){
function apiQuery(app) {
    const router = express.Router();
    
   // app.use(express.static(path.join(__dirname, 'server')));
    console.log("Hello broski");
    app.get('/api/getall', (req,res, app) => {
        console.log('im here');
        const router = express.Router();
        var users_list;

            //Connect to db2 
        ibmdb.open(connString, function (err, conn) {
            conn.query(query.find_all_users(), function (err, users) {
                user_list = users;
                console.log(user_list);
                conn.close(function () {
                });
            });
        });

        router.get('/', function (req, res, next) {
            //Connect to Database
            res.json({
                user_list
            });
        });

        //app.use('/api/all-users', cors(), router);

        const port = process.env.PORT || 5000;
        app.listen(port);

        console.log('App is listening on port ' + port);
        //app.user('/api/getusers', router);
    });
};

module.exports.apiQuery = apiQuery;