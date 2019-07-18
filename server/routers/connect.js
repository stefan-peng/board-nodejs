const express = require('express');
var http = require('http');
var path = require('path');
var ibmdb = require('ibm_db');
var query = require('./../modules/queries')

//var app = express();

// // all environments
// app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(express.cookieParser('your secret here'));
// app.use(express.session());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));
// var db2;
// var hasConnect = false;

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// if (process.env.VCAP_SERVICES) {
//     var env = JSON.parse(process.env.VCAP_SERVICES);
// 	if (env['dashDB']) {
//         hasConnect = true;
// 		db2 = env['dashDB'][0].credentials;
// 	}

// }

// if ( hasConnect == false ) {


// }



function makeQuery(app, connString, query, command) {
    const router = express.Router();

    var users_list;
    ibmdb.open(connString, function (err, conn) {
        conn.query(query, function (err, users) {
            user_list = users;
            console.log(user_list);
            conn.close(function () {
            });
        });

        http.createServer(app).listen(app.get('port'), function () {
            console.log('Express server listening on port ' + app.get('port'));
        });
    });

    router.get('/', function (req, res, next) {

        //Connect to Database
        res.json({
            user_list
        });
    });

    app.use(`/${command}`, router);
}

module.exports.makeQuery = makeQuery;