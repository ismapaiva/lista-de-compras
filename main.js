let listaDeItens = []

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItens = document.getElementById('lista-de-itens');
const ulItensComprados = document.getElementById('itens-comprados');

form.addEventListener('submit', function (evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItem()
    itensInput.focus()
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
            valor: comprasItem,
            checar: false
        })
    }
    console.log(listaDeItens)
    itensInput.value = ''
}

// função para imprimir o item na tela
function mostrarItem(){
    ulItens.innerHTML= ``;
    ulItensComprados.innerHTML= ``;

    listaDeItens.forEach((elemento, index)=>{

        if (elemento.checar) {
            ulItensComprados.innerHTML +=`
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>`
        } else {
            ulItens.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${elemento.valor}"></input>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>`
        }

    })

    //Esta linha usa o método document.querySelectorAll para selecionar todos os elementos input do tipo checkbox na página. - O resultado é uma NodeList (uma coleção de elementos do DOM que é semelhante a um array) contendo todos os checkboxes encontrados. Essa coleção é armazenada na constante inputsCheck.
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    //forEach é utilizado para iterar sobre cada elemento (checkbox) encontrado e armazenado em inputsCheck. - Para cada checkbox (i), é adicionado um ouvinte de eventos para reagir a cliques (click).
    inputsCheck.forEach(i=>{
        // o método addEventListener é usado para adicionar um ouvinte de eventos de clique a cada checkbox.
        i.addEventListener('click', (evento)=>{
            // Quando um checkbox é clicado, a função fornecida é chamada.
            //A função então acessa evento.target, que é o elemento do DOM que foi clicado — neste caso, o checkbox específico.
            //evento.target.parentElement.parentElement: Esta expressão acessa o pai do pai do checkbox. - Isso significa que ela vai subir dois níveis na árvore do DOM a partir do checkbox clicado. - Este código pode ser usado, por exemplo, para manipular ou extrair informações de elementos que estão mais acima na hierarquia do DOM em relação ao checkbox.
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            
            listaDeItens[valorDoElemento].checar = evento.target.checked
            console.log(listaDeItens[valorDoElemento].checar)
            mostrarItem();
        })
    })
} 