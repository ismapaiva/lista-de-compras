> Objetos serve para armazentar dados
> Um objeto é composto por: chave: "valor"
> Posso guardar diversos tipos de dados em um objeto, inclusive funcionalidades (funções).
> Para adicionar uma propriedade ao objeto podemos usar a notaçã de ponto, exemplo: objeto.idade = 31 (add uma chave idade com o valor 31 em meu objeto), ou pela notação de colchetes, exemplo: objeto[cidade] = "São Paulo"

Qual a diferença de declarar uma variavel com var, let e const?
    - declarndo uma variavel com var, dentro de um for, while ou if, essa variavel vaza do escopo.
    - Se declaramos uma variavel com let, a variavel não será vazada para fora do escopo do for, while ou if
    - Ao declara uma variavel com const, essa variavel não pode receber outro valor, exemplo: const pais = "Brasil", se eu tentar alterar o valor da const para: pais = "Argentina", um erro será impresso na tela. Mas se eu declaro a variavel com let ou var, eu consigo alterar o valor da minha variavel.
    - na duvidada de quando usar var, let ou const ? use const,  

> deletar uma chave e valor de um objeto: delete nomeDoObjeto.nomeDaChave
> Editar o valor de uma chave de um objeto: passar apenas o objeto+chave, exemplo: nomeDoObjeto.nomeDaChave = "novo valor"


#Projeto Lista de Compras - Utilizado no Curso Objetos no JavaScript - Escola Front-End Alura

Neste arquivo encontram-se modelos de códigos que serão utilizados no decorrer do curso. 

Código modelo da li "Comprados":

    <li class="item-compra is-flex is-justify-content-space-between" data-value="">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5"></span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>

Código modelo da li "Lista de compras": 

    <li class="item-compra is-flex is-justify-content-space-between" data-value="">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value=""></input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>

Input com código refatorado:

    <div>
        <input type="checkbox" checked class="is-clickable" />  
        <span class="itens-comprados is-size-5">${elemento.valor}</span>
    </div>

Ícones de edição:

    <i class="fa-regular fa-floppy-disk is-clickable"></i><i class="fa-regular is-clickable fa-pen-to-square editar"></i>
