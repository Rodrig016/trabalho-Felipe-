const usuario = require("../rotas/usuario");

module.exports.cadastro_usuario = function (app, req, res) {
    res.render('Usuario/cadastro_usuario', { erros: {}, usuario: {} });
    
}

module.exports.cadastrar = function (app, req, res) {
    const dados = req.body;

    req.assert('nome', 'Você deve preencher o campo nome!').notEmpty();
    req.assert('email', 'Você deve preencher o campo email!').notEmpty();
    req.assert('senha', 'Você deve preencher o campo senha!').notEmpty();
    req.assert('senha', 'O campo Senha deve ter no minimo 6 caracteres!').len(6);
    
    const erros = req.validationErrors();

    if (erros) {
        res.render('Usuario/cadastro_usuario', { erros: erros, usuario: dados });
        return;
    }

    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.getUsuarioByEmail(dados.email, function (error, result){
        if (result.length > 0){
            let erros = [{msg: "Este e-mail ja está sendo usado!"}];
            res.render('Usuario/cadastro_usuario', { erros: erros, usuario: dados });         
        }
        else{
            modelUsuario.cadastrar(dados, function (error, result) {
                res.redirect('/login');
            });
        }
    })  
}

module.exports.login = function (app, req, res){
    res.render('Usuario/login', {erros: {}, usuario: {}})
}

module.exports.validar = function (app, req, res){

    const dados = req .body;

    req.assert('email','Você deve preencher o campo E-mail!').notEmpty();
    req.assert('senha','Você deve preencher o campo Senha!').notEmpty();
   
    const erros = req.validationErrors();

    if (erros){
        res.render('Usuario/login', {erros: erros, usuario: dados})
        return;
    }

    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.getUsuario(dados, function(error, result){
        if (result.length <= 0){
            let erros = [{msg:'Usuário não encontrado!'}]
            res.render('Usuario/login', {erros: erros, usuario: usuario})
        }
        else {
            req.session.id_tipo_usuario = result[0].id_tipo_usuario;    
            req.session.id_usuario = result[0].id;     
            if (req.session.id_tipo_usuario == 2) {
                res.redirect('/lista_usuario')
                return
            }
            else{
                res.redirect('/')
                return
            }
        }
    })
}

module.exports.sair = function (app, req, res){
    req.session.destroy(function(error){
        res.redirect('/login');
    })
}