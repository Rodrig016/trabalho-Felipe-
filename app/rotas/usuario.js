
module.exports = function (app){
    app.get('/cadastro_usuario', function(req, res){
        app.app.controllers.usuario.cadastro_usuario(app, req, res);
    });
    
    app.post('/usuario/cadastrar', function(req, res){
        app.app.controllers.usuario.cadastrar(app, req, res);
    })

    app.get('/login', function(req, res){
        app.app.controllers.usuario.login(app, req, res);
    });

    app.post('/usuario/validar', function(req, res){
        app.app.controllers.usuario.validar(app, req, res);
    })

    app.get('/usuario/sair', function(req, res){
        app.app.controllers.usuario.sair(app, req, res);
    });
}

    

