module.exports.adicionar = async function (app, req, response) {
    const idProduto = req.params.idProduto;
    const idUsuario = req.session.id_usuario;

    const conexao = app.config.conexao;
    const modelPedido = new app.app.models.modelPedido(conexao);
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);

    //verifica se existe um pedido aberto
    const existePedidoAberto = await modelPedido.existePedidoAberto(idUsuario)

    if (!existePedidoAberto) {
        //cria um pedido
        await modelPedido.criarPedido(idUsuario);
    }

    //pega o id do pedido aberto
    const idPedido = await modelPedido.getIdPedidoAberto(idUsuario);

    //salva o id do pedido aberto em sessão
    req.session.id_pedido = idPedido;

    //verifica se o produto já foi adicionado no pedido aberto
    const existeProduto = await modelCarrinho.existeProduto(idProduto, idPedido)

    if (existeProduto) {
        await modelCarrinho.alterarQuantidade(idProduto, idPedido)
    }
    else {
        await modelCarrinho.inserirProduto(idProduto, idPedido)
    }

    response.redirect('/lista_produto');
}

module.exports.listar_produtos_pedido = async function (app, req, res) {
    const conexao = app.config.conexao;
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);
    const modelProduto = new app.app.models.modelProduto(conexao);

    if (!req.session.id_pedido) {
        const erros = [{msg: 'Seu carrinho está vazio!'}];
        res.render('carrinho/carrinho', {erros: erros, produtos: [], valorTotal: 0});
        return;
    }

    const idPedido = req.session.id_pedido;

    let ProdutosPedido = await modelCarrinho.getProdutosPedido(idPedido);
    let valorTotal = 0;

    for (let i = 0; i < ProdutosPedido.length; i++) {
        const produto = await modelProduto.getProduto(ProdutosPedido[i].id_produto);

        ProdutosPedido[i].descricao = produto.descricao;
        ProdutosPedido[i].preco = produto.preco;

        valorTotal += ProdutosPedido[i].quantidade * produto.preco;
    }

    res.render('carrinho/carrinho', {erros: {}, produtos: ProdutosPedido, valorTotal: valorTotal})
}
module.exports.excluir = function (app, req, res){
    const idProduto = req.params.idProduto;

    const conexao = app.config.conexao;
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);

    modelCarrinho.excluir(idProduto, function (error, result){
        console.log(error)
        res.redirect('/carrinho')
    })
}
module.exports.alterar_quantidade = function (app, req, res){
    const idProduto = req.params.idProduto;

    const conexao = app.config.conexao;
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);
    
    modelCarrinho.alterar_quantidade(idProduto, function (error, result){
        res.render('carrinho/editar_carrinho', {produto:result})
    }) 
}
module.exports.salvar = function (app, req, res){
    const idProduto = req.params.idProduto;
    const produto = req.body;
    const conexao = app.config.conexao;
    const modelCarrinho = new app.app.models.modelCarrinho(conexao);

    modelCarrinho.salvar(produto, idProduto, function (error, result){
        res.redirect('/carrinho')
    })
}