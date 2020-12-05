var buttAdicionar = document.getElementById('buttAdicionar');
var buttRemover = document.getElementById('buttRemover');
var clickLi = document.getElementsByTagName('li');
var itemNovo = document.getElementById('inpItem');
var listaDeAtividades = document.getElementById('listaDeAtividades');
var checked = document.querySelector('ul');
var checkEd = document.querySelector('input');
var close = document.getElementsByClassName("close");
var closeButton = document.getElementsByTagName("LI");
var lista = [];
obterListaDoLocalStorage();

function adicionaItem() {
    var itemNaLista = document.getElementById('inpItem').value;
    console.log(itemNaLista)
    if (itemNaLista.length) {
        criaElementoHtml(itemNaLista);
        guardarNoLocalStorage(itemNaLista);
    } else {
        window.alert("Insira um valor para adicionar na lista!")
    }
}

function criaElementoHtml(item) {
    var il = document.createElement('input');
    il.type = 'checkbox';
    var itemLista = document.createElement('li');
    var i1 = createInput('checkbox', 'name1', 'name1', '1');
    var l1 = createLabel(item);
    var buttonClose = document.createElement("button");
    buttonClose.className = "close";
    var closeCotent = document.createTextNode("\u274C");
    listaDeAtividades.appendChild(itemLista);
    itemLista.appendChild(i1);
    itemLista.appendChild(l1);
    itemLista.appendChild(buttonClose);
    buttonClose.appendChild(closeCotent);
}

function guardarNoLocalStorage(item) {
    lista.push(item);
    localStorage.setItem('toDoList', JSON.stringify(lista));
    console.log(lista)
}

function obterListaDoLocalStorage() {
    var listaDeItens = JSON.parse(localStorage.getItem('toDoList'));
    if (listaDeItens) {
        lista = listaDeItens;
        for (var i = 0; i < lista.length; i++) {
            criaElementoHtml(lista[i]);
        }
    }
}

function romoverItemDoLocalStorage() {
    localStorage.clear('toDoList');
}

for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

function createLabel(content) {
    var label = document.createElement('label');
    label.innerHTML = content;
    return label;
}

function createInput(type, name, id, value) {
    var input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.id = id;
    input.value = value;
    return input;
}

buttAdicionar.addEventListener('click', adicionaItem);
buttRemover.addEventListener('click', romoverItemDoLocalStorage);