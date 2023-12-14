function usuario (conexao){
    this._conexao = conexao;
    this._crypto = require('crypto')
}
usuario.prototype.cadastrar = function (dados, callback){
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex');
    this._conexao.query('insert into usuario set ?', dados, callback);
}
usuario.prototype.getUsuarioByEmail = function (email, callback){
    this._conexao.query(`select * from usuario where email = '${email}'`, callback);
}
usuario.prototype.getUsuario = function (dados, callback){
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex');
    this._conexao.query(`select * from usuario where email = '${dados.email}' and senha = '${dados.senha}'`, callback);
}
usuario.prototype.getUsuarioById = function (id,callback){  
    this._conexao.query(`select * from usuario where id = '${id}'`, callback);
}
usuario.prototype.lista_usuario = function (callback){  
    this._conexao.query(`select * from usuario`, callback);
}
usuario.prototype.excluir = function (id, callback){   
    this._conexao.query(`delete from usuario where id = ${id}`, callback);
}
usuario.prototype.salvar = function (usuario, id, callback){
    this._conexao.query(`update usuario set nome='${usuario.nome}', email='${usuario.email}', id_tipo_usuario='${usuario.id_tipo_usuario}' where id='${id}'`, callback)
}
module.exports = function (){
    return usuario; 
}