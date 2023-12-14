module.exports.cadastro_produto = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2 ){
        res.redirect('/login')
        return
    }
    res.render('produto/cadastro_produto', { erros: {}, produto: {} })
}

module.exports.cadastrar = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2 ){
        res.redirect('/login')
        return
    }

    const dados = req.body;

    req.assert('descricao', 'Você deve preencher o campo Descrição').notEmpty();
    req.assert('preco', 'Você deve preencher o campo Preço').notEmpty();
   
    const erros = req.validationErrors();
    
    if (erros) {
        res.render('admin/cadastro_produto', { erros: erros, produto: dados });
        return;
    }

    const conexao = app.config.conexao;

    const modelProduto = new app.app.models.modelProduto(conexao);

    modelProduto.cadastrarProduto(dados, function (error, result) {
        res.redirect('/produtos');
    });
}
module.exports.lista_usuario = function (app, req, res){
    if (req.session.id_tipo_usuario != 2 ){
        res.redirect('/login')
        return
   }
    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.lista_usuario(function (error, result){
        res.render('admin/lista_usuario', { usuario: result })
     });
}
module.exports.excluir = function (app, req, res){
    const idUsuario = req.params.idUsuario;

    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.excluir(idUsuario, function (error, result){
        res.redirect('/lista_usuario')
    })
}

module.exports.tela_edicao = function (app, req, res){
    const idUsuario = req.params.idUsuario;

    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);
    const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao);

    modelUsuario.getUsuarioById(idUsuario, function (error, usuario){
        modelTipoUsuario.getTipos(function(error, tipos){
            res.render('usuario/editar_usuario', {usuario: usuario, tipos: tipos, erros: {}})
        })
       
    })
}
module.exports.salvar = function (app, req, res){
    const idUsuario = req.params.idUsuario;
    const usuario = req.body;
    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.salvar(usuario, idUsuario, function (error, result){
        res.redirect('/lista_usuario')
    })
}