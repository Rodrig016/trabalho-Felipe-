const carrinho = require("../rotas/carrinho");
function Carrinho (conexao){
    this._conexao = conexao;    
}
Carrinho.prototype.existeProduto = function (idProduto, idPedido){
    return new Promise((resolve, reject) => {
        this._conexao.query(`select * from carrinho where id_produto = ${idProduto} and id_pedido = ${idPedido}`,
        function (error, result){
            if (result.length == 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        })
    })  
}
Carrinho.prototype.alterarQuantidade = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`UPDATE carrinho set quantidade = quantidade + 1 WHERE id_produto = ${idProduto} AND id_pedido = ${idPedido}`, function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.inserirProduto = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`INSERT INTO carrinho VALUES (NULL, ${idPedido}, ${idProduto}, 1);`, function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.getProdutosPedido = function (idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`SELECT * FROM carrinho WHERE id_pedido =  ${idPedido};`, function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.excluir = function (idPedido, callback){   
    return new Promise((resolve, reject) => {
        this._conexao.query(`delete from carrinho where id_produto = ${idPedido}`,function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.alterar_quantidade = function (idProduto, callback){  
    return new Promise((resolve, reject) => {  
        this._conexao.query(`select * from carrinho where id=${idProduto}`, function(errors, result) {
            resolve(result);
        })
    })
}
Carrinho.prototype.salvar = function (produto, id, callback){
    return new Promise((resolve, reject) => {
        this._conexao.query(`update carrinho set descricao='${produto.descricao}', preco='${produto.preco}' where id='${id}'`,function(errors, result) {
            resolve(result);
        })
    })
}
module.exports = function (){
    return Carrinho;
}