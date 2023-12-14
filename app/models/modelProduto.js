function produto (conexao){
    this._conexao = conexao;
}
produto.prototype.getProdutos = function (callback){
    this._conexao.query('select * from produto', callback);
}
//produto.prototype.getProduto = function (descricao, callback){
//    this._conexao.query(`select * from produto where descricao = '${descricao}'`, callback);
//}
produto.prototype.getProduto = function (idProduto) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`SELECT * FROM produto WHERE id = '${idProduto}';`, function(errors, result) {
            resolve(result[0]);
        })
    })
}
produto.prototype.cadastrar = function (dados, callback){
    this._conexao.query('insert into produto set ?', dados, callback);
}
produto.prototype.lista_produto = function (callback){    
    this._conexao.query(`select * from produto`, callback);
}
produto.prototype.excluir = function (id, callback){   
    this._conexao.query(`delete from produto where id = ${id}`, callback);
}
produto.prototype.tela_edicao = function (idProduto, callback){    
    this._conexao.query(`select * from produto where id=${idProduto}`, callback);
}
produto.prototype.salvar = function (produto, id, callback){
    this._conexao.query(`update produto set descricao='${produto.descricao}', preco='${produto.preco}' where id='${id}'`, callback)
}
produto.prototype.adicionar_produto = function (dados, callback){
    this._conexao.query('insert into produto set ?', dados, callback);
}
module.exports = function (){
    return produto; 
}









