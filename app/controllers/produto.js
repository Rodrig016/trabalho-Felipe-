const produto = require("../rotas/produtos");

module.exports.cadastro_produto = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2 ){
        res.redirect('/login')
        return
    }
    res.render('produto/cadastro_produto', { erros: {}, produto: {} });  
}
module.exports.cadastrar = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2 ){
        res.redirect('/login')
        return
    }
    const dados = req.body;

    req.assert('descricao', 'Você deve preencher o campo descricao!').notEmpty();
    req.assert('preco', 'Você deve preencher o campo preco!').notEmpty();
    
    const erros = req.validationErrors();

    if (erros) {
        res.render('produto/cadastro_produto', { erros: erros, produto: dados });
        return;
    }

    const conexao = app.config.conexao;
    const modelProduto = new app.app.models.modelProduto(conexao);

    modelProduto.getProduto(dados.descricao, function (error, result){
        if (result.length > 0){
            let erros = [{msg: "Item ja cadastrado!"}];
            res.render('produto/cadastro_produto', { erros: erros, produto: dados });
            return;         
        }
        else{
            modelProduto.cadastrar(dados, function (error, result) {
                res.redirect('/lista_produto');
            });
        }
    })  
}
module.exports.lista_produto = function (app, req, res){
    const conexao = app.config.conexao;
    const modelProduto = new app.app.models.modelProduto(conexao);

    modelProduto.lista_produto(function (error, result){
        if (req.session.id_tipo_usuario == 1){
            res.render('produto/lista_produtos', { produto: result })
            return
        }
        else{
            res.render('produto/produtos', { produto: result })
        }
        
     });
}
module.exports.excluir = function (app, req, res){
    const idProduto = req.params.idProduto;

    const conexao = app.config.conexao;
    const modelProduto = new app.app.models.modelProduto(conexao);

    modelProduto.excluir(idProduto, function (error, result){
        console.log(error)
        res.redirect('/lista_produto')
    })
}
module.exports.tela_edicao = function (app, req, res){
    const idProduto = req.params.idProduto;

    const conexao = app.config.conexao;
    const modelProduto = new app.app.models.modelProduto(conexao);
    
    modelProduto.tela_edicao(idProduto, function (error, result){
        res.render('produto/editar_produto', {produto:result})
    }) 
}
module.exports.salvar = function (app, req, res){
    const idProduto = req.params.idProduto;
    const produto = req.body;
    const conexao = app.config.conexao;
    const modelProduto = new app.app.models.modelProduto(conexao);

    modelProduto.salvar(produto, idProduto, function (error, result){
        res.redirect('/lista_produto')
    })
}
