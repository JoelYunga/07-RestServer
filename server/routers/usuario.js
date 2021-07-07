const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../moodels/usuario');
const app = express();
app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});

app.put('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        usuarioDB.password = null

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.post('/usuario', function(req, res) {
    res.json('post Usuario');
});

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});

module.exports = app;