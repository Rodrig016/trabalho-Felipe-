function Tipousuario (conexao){
    this._conexao = conexao;    
}
Tipousuario.prototype.getTipos = function (callback){
    this._conexao.query('select * from tipo_usuario', callback)
}
module.exports = function (){
    return Tipousuario;
}