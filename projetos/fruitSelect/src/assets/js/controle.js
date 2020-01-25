//Importando
const fs = require('fs')
//Diretorio
const caminho = __dirname + '/data/frutas.json'
function fruitData() {
    return JSON.parse(fs.readFileSync(caminho, 'utf-8')) //Le o arquivo
}

module.exports = { fruitData }