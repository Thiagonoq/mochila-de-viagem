const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    adicionaItem(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    const existe = itens.find(elemento => elemento.nome === nome.value);


    if (existe) {
 
        itemAtual.id = existe.id;

        atualizaItem(itemAtual);
        
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

    } else {
        
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0;
        
        adicionaItem(itemAtual);
        
        itens.push(itemAtual);

    }

    localStorage.setItem("itens", JSON.stringify(itens));
    
    nome.value = "";
    quantidade.value = "";

})

function adicionaItem(item) {

    //cria elemento "li" e adiciona classe
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    //cria elemento "strong", adiciona valor a ele e cria um id
    const quantidadeItem = document.createElement('strong');
    quantidadeItem.innerHTML = item.quantidade;
    quantidadeItem.dataset.id = item.id;

    //adiciona ao elemento "li" a quantidade e o nome
    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += item.nome;

    //cria botão de deletar
    novoItem.appendChild(botaoDeleta(item.id));

    //imprime o resultado na pagina html
    lista.appendChild(novoItem);
}

function atualizaItem (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta (id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode,id);
    })

    return elementoBotao;
}

function deletaElemento(elemento,id) {
    elemento.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id),1);

    localStorage.setItem("itens", JSON.stringify(itens));
}