let listaDeItens = []

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItens = document.getElementById('lista-de-itens');

form.addEventListener('submit', function (evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItem()
    itensInput.value = ''
})

// função para salver o item no array
function salvarItem() {
    const comprasItem = itensInput.value;

    //método some: é usado para testar se pelo menos um dos elementos do array satisfaz uma condição especificada numa função de teste
    const checarDuplicado = listaDeItens.some((elemento) =>
        elemento.valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim() === comprasItem.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim())
    if (checarDuplicado){
        alert('item já existe')
    }else{
        listaDeItens.push({
            valor: comprasItem
        })
    }
    console.log(listaDeItens)
}

// função para imprimir o item na tela
function mostrarItem(){
    ulItens.innerHTML= ``
    listaDeItens.forEach((elemento, index)=>{
        ulItens.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"></input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`
    })
    //seleciono todos os inputs de tipo checkbox que forem inseridos na lista de compras
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach(i=>{
        i.addEventListener('click', (evento)=>{
            console.log("fui clicado")
        })
    })
}