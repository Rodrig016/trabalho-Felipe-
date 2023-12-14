module.exports = function (app) {
    app.get('/adicionar/:idProduto', function (req, res) {
        app.app.controllers.carrinho.adicionar(app, req, res);
    });

    app.get('/carrinho', function (req, res) {
        app.app.controllers.carrinho.listar_produtos_pedido(app, req, res);
    });
  
    app.get('/produto/alterar-quantidade/:idProduto', function(req, res){
        app.app.controllers.carrinho.alterar_quantidade(app, req, res);
    })
  
    app.get('/produto/excluir/:idProduto', function(req, res){
        app.app.controllers.carrinho.excluir(app, req, res);
    })
    app.post('/produto/salvar/:idProduto', function(req, res){
        app.app.controllers.carrinho.salvar(app, req, res);
    })
}