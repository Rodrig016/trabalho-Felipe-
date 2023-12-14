module.exports.index = function (app, req, res) {
    if (req.session.id_tipo_usuario != 1 && req.session.id_tipo_usuario != 2 ){
        res.redirect('/login')
        return
    }
    res.render('home/index');

}