// The content of this file was generated by IBM Cloud
// Do not modify it as it might get overridden
var q = require('./../modules/queries')
module.exports = function(app, server, connString){
    require('./swagger')(app);
    require('./public')(app);
    require('./health')(app);
    const { makeQuery } = require('./connect');
    // const {apiQuery} = require('./api');
    require("./../modules/queries");

    // apiQuery(app);
    // const queries = [[q.find_all_users()[0], q.find_all_users()[1]]];
    // queries.forEach(value => makeQuery(app, connString, value[0], value[1]));

    const {query, command} = q.find_all_users();
    makeQuery(app, conString, query, command);
    const {query, command} = q.find_username("simran.puri");
    makeQuery(app, conString, query, command);

}
