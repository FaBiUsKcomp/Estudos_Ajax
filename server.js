const bodyParser = require('body-parser') //Importando o body-parser
const express = require('express') //Importando o express
const app = express() //Inicializando o expressjs

//MiddleWares
app.use(express.static('.')) //A pasta em que se encontra o server.js sirva os arquivos estaticos
app.use(bodyParser.urlencoded({ extended: true })) //Decodificando todas as requisições
app.use(bodyParser.json())//Caso venha algum arquivo .json na requisição, esse ira atender

//Importando o Multer => interpreta o formulario que veio o arquivo do upload

const multer = require('multer')

const storage = multer.diskStorage({ //Configura a pasta que serão salvos os arquivos, e o nome do arquivo quando salvo
    destination: function (req, file, callback) {
        callback(null, './upload') //Ira salvar na pasta 'upload'
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`) //O nome sera a data atual + o nome do arquivo original
    }
})

const upload = multer({ storage }).single('arquivo') //O arquivo que vira na req tera esse nome

//Chamadas

app.post('/upload', (req, res) => { //Sera chamada via Post
    upload(req, res, err => {
        if(err) {
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluido com sucesso.')
    })
}) 

app.listen(8080, () => console.log('Executando...'))