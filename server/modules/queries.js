const Express = require('express');
const cors = require('cors');

module.exports = {
    //Query all users no exception
    find_all_users: function(){
        return {query:"select * from USER",command:'all-users'};
    },
    find_username: function(username) {
        return {query:`select username from USER where username = ${username}`, command:`user=${username}`};
    }

};