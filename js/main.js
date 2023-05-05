const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = [];

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    adicionaItem(nome.value, quantidade.value)

    nome.value = "";
    quantidade.value = "";

})

function adicionaItem(nome, quantidade) {

    //cria elemento "li" e adiciona classe
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    //cria elemento "strong" e adiciona valor a ele
    const quantidadeItem = document.createElement('strong');
    quantidadeItem.innerHTML = quantidade;

    //adiciona ao elemento "li" a quantidade e o nome
    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += nome;

    //imprime o resultado na pagina html
    lista.appendChild(novoItem);

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(itemAtual);

    localStorage.setItem("item", JSON.stringify(itens));
}