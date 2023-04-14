// Seleção de elementos

const listaForm = document.querySelector('#lista');//formulario todo
const compra = document.querySelector('#compra');//input da compra
const valor = document.querySelector('#valor');//input do valor
const editar = document.querySelector('#editar');//input editar titulo compra
const editarValor = document.querySelector('#editarValor');//input editar valor compra
const editarForm = document.querySelector('#edit-form')//formulario de editar
const cancelarEdit = document.querySelector('#btn-cancel');//botao de cancelar o editar

const compras = document.querySelector('#compras');//div onde vai ir tudo
const valorTotal = document.querySelector('#ValorTotal')

let oldInputValue
let oldInputValorValue

// Funções

const saveCompra = (text,value) => { //cria a funçao com as variaveis texto do titulo da compra e o valor da compra

    const listaDeCompras = document.createElement("div") //cria a div inteira da compra
    listaDeCompras.classList.add("container")//bota classe na div

    const tituloCompra = document.createElement("h3") // cria o titulo da compra
    tituloCompra.classList.add('c')//bota a classe no p
    tituloCompra.innerText =text //pega o texto do input e bota no titulo
    listaDeCompras.appendChild(tituloCompra)//adiciona o titulo a lista de compras

    const valorCompra = document.createElement("p")//cria o valor da compra
    valorCompra.classList.add('v')//bota a classe 'v' no p
    valorCompra.innerText = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)//pega o valor do input e bota no valor formatando pra brl
    listaDeCompras.appendChild(valorCompra)//adicionar o valor a lista de compras

    const botoes = document.createElement("div") //cria a div inteira dos botoes centralizar
    botoes.classList.add("botoes")//bota classe na div
    listaDeCompras.appendChild(botoes)//adiciona a div na div container

    const doneBtn = document.createElement("button")//adiciona o botao feito
    doneBtn.classList.add("finish-compra")//bota a feito classe ao botao
    doneBtn.innerHTML = '<i class="bi bi-check"></i>'//bota o icone feito no botao
    botoes.appendChild(doneBtn)//adiciona o botao feito a lista de compras

    const editBtn = document.createElement("button")//adiciona o botao de editar
    editBtn.classList.add("edit-compra")//bota a classe editar ao botao
    editBtn.innerHTML = '<i class="bi bi-pen"></i>'//bota o icone editar no botao
    botoes.appendChild(editBtn)//adiciona o botao editar a lista de compras

    const removeBtn = document.createElement("button")//adiciona o botao remover
    removeBtn.classList.add("remove-compra")//bota a classe remover ao botao
    removeBtn.innerHTML = '<i class="bi bi-x"></i>'//bota o icone remover no botao
    botoes.appendChild(removeBtn)//adiciona o botao remover a lista de compras

    compras.appendChild(listaDeCompras)

    compra.value = "" //dps do submit deixa o input vazio
    compra.focus()//dps do submit foca no input compra dnv
    valor.value = "" //dps do submit deixa o input vazio
}

const total = (inputValor) => {
    
}

const toggleForms = () => { //cria funçao pra tirar e botar algo
    
    editarForm.classList.toggle("hide")//tira e bota classe hide na div form de editar
    listaForm.classList.toggle("hide")//tira e bota classe hide na div form da compra
    compras.classList.toggle("hide")//tira e bota classe hide na div lista de compras
}

const updateEdit = (editarValue ,editarValor) => {

    const todos = document.querySelectorAll(".container")

    todos.forEach((todo) => {
        let tituloCompra = todo.querySelector("h3")
        let compraValor = todo.querySelector("p")  
        
        if(tituloCompra.innerText === oldInputValue) {
            tituloCompra.innerText = editarValue
        }
        if(compraValor.innerText === oldInputValorValue) {
            compraValor.innerText = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(editarValor)
        }
    })
}

// Eventos

listaForm.addEventListener("submit", (e) =>{ //cria evento qnd da submit e o 'e' é uma funçao anonima

    e.preventDefault()//faz o formulario n ser enviado pro backend e faz ficar so no frontend

    const inputCompra = compra.value //pega o valor do input compra
    const inputValor = valor.value //pega o valor do input valor

    const a = inputValor
    

    if(inputCompra) { //mini validaçao n pode vazio
        //salvar compra
        saveCompra(inputCompra,inputValor) // cria uma funçao com 2 variaveis compra e valor
        total(inputValor)
    }
})

document.addEventListener("click", (e) => {
    //funçao geral q identifica qual botao a gente ta clicando

    const targetEl = e.target //identifica qual é o elemento do click
    const parentEl = targetEl.closest(".container")//pega o parente .container mais proximo
    const parentElAvo = targetEl.closest("div")//pega o parente div mais proximo

    let tituloCompra;
    let valorValue;

    if(parentEl && parentEl.querySelector("h3")) { //validaçao
        tituloCompra = parentEl.querySelector("h3").innerText // pega o texto compra
    }

    if(parentEl && parentEl.querySelector("p")) { //validaçao
        valorValue = parentEl.querySelector("p").innerText // pega o texto valor
    }

    if(targetEl.classList.contains("finish-compra")) { //verifica se o target tem a classe finish-compra
        parentEl.classList.toggle("done")//adiciona a classe done a div .container 
    }

    if(targetEl.classList.contains("remove-compra")) {//verifica se o target tem a classe remove-compra
        parentEl.remove()//remove a div .container mais proxima
    }

    if(targetEl.classList.contains("edit-compra")) {//verifica se o target tem a classe edit-compra
        toggleForms()//funçao para alterar entre um ou outro

        editar.value = tituloCompra //titulo compra
        oldInputValue = tituloCompra //titulo compra antigo

        let n = valorValue
        let j = n.replace(/[^0-9]/g,'')
        let clear = j.slice(0,-2)

        editarValor.value = clear
        oldInputValorValue = valorValue
    }
})

cancelarEdit.addEventListener("click", (e) => { //evento de cancelar o editar
    
    e.preventDefault()//faz o formulario n ser enviado pro backend e faz ficar so no frontend

    toggleForms()//funçao para alterar entre um ou outro
})

editarForm.addEventListener("submit", (e) => {

    e.preventDefault()//faz o formulario n ser enviado pro backend e faz ficar so no frontend

    const editarValue = editar.value //pega o valor do input editar
    const editarValorx = editarValor.value

    if(editarValue) { //validaçao
        //atualizar
        updateEdit(editarValue, editarValorx)//cria funçao de editar o input editar
        total(editarValorx)
    }

    toggleForms()//funçao para alterar entre um ou outro

})