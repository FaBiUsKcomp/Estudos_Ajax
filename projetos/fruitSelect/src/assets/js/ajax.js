//Lendo todos as LI
const letras = document.querySelectorAll('li')
const conteudo = document.querySelector('.conteudo')

//Atribuindo Eventos para cada letra
Array.from(letras).forEach(letra => letra.addEventListener('click', () => {
    if(conteudo.children.length > 0) {
        const remove = document.querySelector('.conteudo-cartoes')
        conteudo.removeChild(remove)
    }
    constrioObj(letra.textContent.toLocaleLowerCase())
}))

//Faz a requisição AJAX
function ajax(config) {
    const xhr = new XMLHttpRequest()
    xhr.open(config.metodo, config.url, true)

    xhr.onload = e => {
        if (xhr.status === 200) {
            config.sucesso(JSON.parse(xhr.response), config.id)
        } else if (xhr.status >= 400) {
            config.erro({
                codigo: xhr.status, //Passa o status da req juntamente com o texto
                texto: xhr.statusText
            })
        }
    }

    xhr.send()
}

//Seleciona imagem
function buscaImagem(nomeImagem) {
    return `src/img/${nomeImagem}.jpg`
}

//Cria os cartoes e adiciona no Dom
function criaCartoes(frutas) {
    const cardColection = document.createElement('div')
    cardColection.classList.add('conteudo-cartoes')
    conteudo.appendChild(cardColection)

    const cardFrutas = frutas.map(fruta => {
        const cartao = document.createElement('div')
        const img = document.createElement('img')
        const texto1 = document.createElement('p')
        const texto2 = document.createElement('p')

        cartao.classList.add('cartao')
        img.src = buscaImagem(fruta.nome)
        texto1.innerHTML = `<b>Nome</b>: ${fruta.nome}`
        texto2.innerHTML = `<b>Origem</b>: ${fruta.regiao}`
        cartao.appendChild(img)
        cartao.appendChild(texto1)
        cartao.appendChild(texto2)
        return cartao
    })

    cardFrutas.forEach(cartao => cardColection.appendChild(cartao))
}

//Cartoes de erro ou de frutas inexistentes
function erroOuVazio(urlImagem, texto) {
    const cardColection = document.createElement('div')
    const card = document.createElement('div')
    const img = document.createElement('img')
    const text = document.createElement('p')
    cardColection.classList.add('conteudo-cartoes')
    card.classList.add('cartao')
    img.src = urlImagem
    text.innerHTML = texto

    card.appendChild(img)
    card.appendChild(text)
    cardColection.appendChild(card)
    conteudo.appendChild(cardColection)
}

//Monta o o objeto da requisição e trata as respostas
function constrioObj(chave) {
    const req = {
        id: chave,
        url: 'src/assets/js/data/frutas.json',
        metodo: "get",
        sucesso(resposta, id) {
            const filtro = resposta.filter(fruta => fruta.grupo === id)
            if (filtro.length != 0) {
                return criaCartoes(filtro)
            }

            return erroOuVazio('src/img/desconhecido.png', `<b>Ops...</b> Nenhuma Encontrada!`)
        },
        erro(e) {
            erroOuVazio('src/img/erro.jpg', `${e.codigo}: ${e.texto}`)
        }
    }

    ajax(req)
}