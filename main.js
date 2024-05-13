let listaDeItens = [];
let itemAEditar;

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item'); // input que recebe itens digitados
const ulItens = document.getElementById('lista-de-itens');// ul que vai imprimir itens adicionado na lista
const ulItensComprados = document.getElementById('itens-comprados'); // ul que vai receber itens já comprados
const listaRecuperada = localStorage.getItem('listaDeItens');

function atualizaLocalStorage(){
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))// stringfy transforma elementos em dados tipo string
}

if(listaRecuperada){
    listaDeItens = JSON.parse(listaRecuperada)//parse transforma elementos em dados do tipo JS
    mostrarItem()
} else{
    listaDeItens = []
}

form.addEventListener('submit', function (evento) {
    evento.preventDefault() // evento para previnir que o button de tipo submit não seja enviado
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
    if (checarDuplicado) {
        alert('item já existe')
    } else {
        listaDeItens.push({
            valor: comprasItem,
            checar: false
        })
    }
    console.log(listaDeItens)
    itensInput.value = ''
}

// função para imprimir o item na tela
function mostrarItem() {
    ulItens.innerHTML = ``;
    ulItensComprados.innerHTML = ``;

    listaDeItens.forEach((elemento, index) => {

        if (elemento.checar) {
            ulItensComprados.innerHTML += `
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
                <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
            </div>

            <div>
            ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"> <i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>`
        }

    })

    //Esta linha usa o método document.querySelectorAll para selecionar todos os elementos input do tipo checkbox na página. - O resultado é uma NodeList (uma coleção de elementos do DOM que é semelhante a um array) contendo todos os checkboxes encontrados. Essa coleção é armazenada na constante inputsCheck.
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    //forEach é utilizado para iterar sobre cada elemento (checkbox) encontrado e armazenado em inputsCheck. - Para cada checkbox (i), é adicionado um ouvinte de eventos para reagir a cliques (click).
    inputsCheck.forEach(i => {
        // o método addEventListener é usado para adicionar um ouvinte de eventos de clique a cada checkbox.
        i.addEventListener('click', (evento) => {
            // Quando um checkbox é clicado, a função fornecida é chamada.
            //A função então acessa evento.target, que é o elemento do DOM que foi clicado — neste caso, o checkbox específico.
            //evento.target.parentElement.parentElement: Esta expressão acessa o pai do pai do checkbox. - Isso significa que ela vai subir dois níveis na árvore do DOM a partir do checkbox clicado. - Este código pode ser usado, por exemplo, para manipular ou extrair informações de elementos que estão mais acima na hierarquia do DOM em relação ao checkbox.
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');

            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem();
        })
    })
    const deletarObjetos = document.querySelectorAll('.deletar');

    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens.splice(valorDoElemento, 1)
            mostrarItem()
            alert(`Item deletado da lista.`)
        })
    })

    const editarItens = document.querySelectorAll('.editar')
    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
            mostrarItem()
        });
    });
    atualizaLocalStorage()
}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    // console.log(itemEditado.value)
    listaDeItens[itemAEditar].valor = itemEditado.value;
    console.log(listaDeItens)

    itemAEditar = -1;
    mostrarItem()
}