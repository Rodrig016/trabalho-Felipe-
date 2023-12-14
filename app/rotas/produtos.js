module.exports = function (app){
    app.get('/produto', function(req, res){
      app.app.controllers.produto.produtos(app, req, res);
    });
    
    app.get('/produto/:idProduto', function(req, res){
        app.app.controllers.produto.produtos(app, req, res);
    })

    app.post('/produto/cadastrar', function(req, res){
      app.app.controllers.produto.cadastrar(app, req, res);
    })
  
    app.get('/lista_produto', function(req, res){
      app.app.controllers.produto.lista_produto(app, req, res);
    })

    app.get('/cadastro_produto', function(req, res){
      app.app.controllers.produto.cadastro_produto(app, req, res);
    });

    app.get('/adicionar_produto', function(req, res){
      app.app.controllers.produto.adicionar_produto(app, req, res);
    });

    app.get('/produto/editar/:idProduto', function(req, res){
      app.app.controllers.produto.tela_edicao(app, req, res);
    })

    app.get('/produto/excluir/:idProduto', function(req, res){
      app.app.controllers.produto.excluir(app, req, res);
    })
    
    app.post('/produto/salvar/:idProduto', function(req, res){
      app.app.controllers.produto.salvar(app, req, res);
    })
    app.get('/produto/adicionar_produto/:idProduto', function(req, res){
      app.app.controllers.carrinho.adicionar(app, req, res);
    })
}