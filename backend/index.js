const express = require('express');
const app = express()
const db = require('./config/db.js')
const consign = require('consign')

consign().then('./config/middlewares.js') //carrega os middle
         .then('./api')
         .into(app) //joga os middles (configs) dentro do app (server side)


app.db = db

app.listen(8080, () => {
    console.log('backend executando...')
})