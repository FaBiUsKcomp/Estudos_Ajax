//Importando as API's

const express = require('express')
const bodyParser = require('body-parser')
const controle = require('../assets/js/controle')
const port = 3003

//Inicializando
const app = express()

//MiddleWares
app.use(express.static('.')) //A pasta em que se encontra o server.js sirva os arquivos estaticos
app.use(bodyParser.urlencoded({ extended: true })) //Decodificando todas as requisições
app.use(bodyParser.json())//Caso venha algum arquivo .json na requisição, esse ira atender

//Funcionalidades
app.get("/frutas", (req, res) => {
    res.send(controle.fruitData())
})

app.listen(port, () => console.log('Executando...'))