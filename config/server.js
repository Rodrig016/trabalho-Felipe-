module.exports = function (){
    const express = require("express");
    const consing = require('consign')
    const bodyParser = require('body-parser');
    const expressValidator = require('express-validator');
    const expressSession = require('express-session');

    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', './app/views');
   
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(expressValidator());
    app.use(express.static('app/public'));
    app.use(expressSession({
        secret: 'Errrroooooooooouuuu',
        resave: false,
        saveUninitialized: false
    }));


    consing().include('app/rotas').then('config/conexao.js').then('app/models').then('app/controllers').into(app);

    return app;
}