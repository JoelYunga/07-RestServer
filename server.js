const express = require('express');
const mongoose = require('mongoose');

require("./server/config");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(require('./server/routers/usuario'));

mongoose.connect(
    'mongodb://localhost:27017/Cafe', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;

        console.log("Base de datos ONLINE!");
    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto: ", process.env.PORT);
});