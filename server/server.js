// Uncomment following to enable zipkin tracing, tailor to fit your network configuration:
// var appzip = require('appmetrics-zipkin')({
//     host: 'localhost',
//     port: 9411,
//     serviceName:'frontend'
// });

require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();
const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');
const cors = require('cors');

const logger = log4js.getLogger(appName);
logger.level = process.env.LOG_LEVEL || 'info'
const app = express();
const server = http.createServer(app);
app.use(cors());


//DATABASE
db2 = {
  hostname: "dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net",
  password: "n8rbtmpr-0nfphqs",
  https_url: "https://dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net",
  port: 50000,
  ssldsn: "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=gqf91534;PWD=n8rbtmpr-0nfphqs;Security=SSL;",
  host: "dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net",
  jdbcurl: "jdbc:db2://dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net:50000/BLUDB",
  uri: "db2://gqf91534:n8rbtmpr-0nfphqs@dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net:50000/BLUDB",
  db: "BLUDB",
  dsn: "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=gqf91534;PWD=n8rbtmpr-0nfphqs;",
  username: "gqf91534",
  ssljdbcurl: "jdbc:db2://dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net:50001/BLUDB:sslConnection=true;"
};

// db2 = {
//   hostname: process.env.HOSTNAME,
//   password: process.env.PASSWORD,
//   https_url: process.env.HTTPS_URL,
//   port: process.env.PORT50000,
//   ssldsn: process.env.SSLDSN,
//   host: process.env.HOST,
//   jdbcurl: process.env.JDBCURL,
//   uri: process.env.URI,
//   db: process.env.DB,
//   dsn: process.env.DSN,
//   username: process.env.USERNAME,
//   ssljdbcurl: process.env.SSLJDBCURL
// };
 

var connString = "DRIVER={DB2};DATABASE=" + db2.db + ";UID=" + db2.username + ";PWD=" + db2.password + ";HOSTNAME=" + db2.hostname + ";port=" + db2.port;
//END OF DATABASE SET UP


app.use(log4js.connectLogger(logger, { level: logger.level }));
const serviceManager = require('./services/service-manager');
require('./services/index')(app);
require('./routers/index')(app, server, connString);

// Add your code here

const port = process.env.PORT || localConfig.port;
server.listen(port, function(){
  logger.info(`nodejsmicroservice listening on http://localhost:${port}/appmetrics-dash`);
  logger.info(`OpenAPI (Swagger) spec is available at http://localhost:${port}/swagger/api`);
  logger.info(`Swagger UI is available at http://localhost:${port}/explorer`);
});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.use(function (err, req, res, next) {
	res.sendFile(path.join(__dirname, '../public', '500.html'));
});

module.exports = server;