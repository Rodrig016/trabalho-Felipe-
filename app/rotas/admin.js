module.exports = function (app){
    app.get('/cadastro_produto', function(req, res){
        app.app.controllers.admin.cadastro_produto(app, req, res);
    });
    
    app.post('/produtos/cadastrar', function(req, res){
        app.app.controllers.admin.cadastrar(app, req, res);
    })

    app.get('/lista_usuario', function(req, res){
        app.app.controllers.admin.lista_usuario(app, req, res);
    })
     
    app.get('/usuario/editar/:idUsuario', function(req, res){
        app.app.controllers.admin.tela_edicao(app, req, res);
    })

    app.get('/usuario/excluir/:idUsuario', function(req, res){
        app.app.controllers.admin.excluir(app, req, res);
    })
    
    app.post('/usuario/salvar/:idUsuario', function(req, res){
        app.app.controllers.admin.salvar(app, req, res);
    })
}

