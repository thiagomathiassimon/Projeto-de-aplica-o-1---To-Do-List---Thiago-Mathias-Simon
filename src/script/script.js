var buttAdicionar = document.getElementById('buttAdicionar');
var buttRemover = document.getElementById('buttRemover');
var btnMarcarTodos = document.getElementById("btnMarcarTodos");
var btnDesmarcarTodos = document.getElementById('btnDesmarcarTodos');
var clickLi = document.getElementsByTagName('li');
var itemNovo = document.getElementById('inpItem');
var listaDeAtividades = document.getElementById('listaDeAtividades');
var checked = document.querySelector('ul');
var checkEd = document.querySelector('input');
var close = document.getElementsByClassName("close");
var closeButton = document.getElementsByTagName("LI");
var marcacao = false;
var lista = [];
obterListaDoLocalStorage();

function alteraCheck() {
    var marcados = document.querySelectorAll('#checkbox');
    console.log(marcados + ' marcarTodos');
    for (var i = 0; i < marcados.length; i++) {
        if (marcados[i].checked == true) {
            console.log(marcados[i].checked)
            var label = lista[i].item;
            console.log(label)
            var chec = lista[i].checked;
            console.log(chec);
            chec = true;
            console.log(chec)
            console.log(lista)
            lista[i].item = label;
            lista[i].checked = chec;
            localStorage.setItem('toDoList', JSON.stringify(lista));
            console.log(lista)
        } else {
            console.log(marcados[i].checked)
            var label = lista[i].item;
            console.log(label)
            var chec = lista[i].checked;
            console.log(chec);
            chec = false;
            console.log(chec)
            console.log(lista)
            lista[i].item = label;
            lista[i].checked = chec;
            localStorage.setItem('toDoList', JSON.stringify(lista));
            console.log(lista)
        }
    }
}

function guardarNoLocalStorage(item, marcado) {
    var objItens = { 'item': item, 'checked': marcado }
    lista.push(objItens);
    localStorage.setItem('toDoList', JSON.stringify(lista));
    console.log(lista)
}

function obterListaDoLocalStorage() {
    var listaDeItens = JSON.parse(localStorage.getItem('toDoList'));
    if (listaDeItens) {
        lista = listaDeItens;
        for (var i = 0; i < lista.length; i++) {
            criaElementoHtml(lista[i].item, lista[i].checked);
            console.log(lista[i].item, lista[i].checked)
        }
    }
}

function adicionaItem() {
    var itemNaLista = document.getElementById('inpItem').value;
    console.log(itemNaLista)
    if (itemNaLista.length) {
        criaElementoHtml(itemNaLista);
        guardarNoLocalStorage(itemNaLista, marcacao);
        itemNovo.value = "";
    } else {
        window.alert("Insira um valor para adicionar na lista!")
    }
}

function criaElementoHtml(item, marcado) {
    var itemLista = document.createElement('li');
    var i1 = createInput('checkbox', 'checkbox', 'checkbox', alteraCheck, marcado, '1');
    var l1 = createLabel(item);
    var buttonClose = createCloseButton();
    listaDeAtividades.appendChild(itemLista);
    itemLista.appendChild(i1);
    itemLista.appendChild(l1);
    itemLista.appendChild(buttonClose);
}

function romoverItemDoLocalStorage() {
    localStorage.clear('toDoList');
    window.location.reload();
}

function apagarItem() {
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            console.log(i)
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

function createCloseButton() {
    var buttonClose = document.createElement("button");
    buttonClose.className = "close";
    buttonClose.innerHTML = "\u274C";
    buttonClose.onclick = apagarItem;
    return buttonClose;
}

function createLabel(content) {
    var label = document.createElement('label');
    label.innerHTML = content;
    return label;
}

function createInput(type, name, id, event, marcado, value) {
    var input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.id = id;
    input.onchange = event;
    input.checked = marcado;
    input.value = value;
    return input;
}

function marcarTodos() {
    var marcados = document.querySelectorAll('#checkbox');
    console.log(marcados + ' marcarTodos');
    for (var i = 0; i < marcados.length; i++) {
        marcados[i].checked = true;
        marcacao = true;
        console.log(marcacao)

    }
}

function desmarcarTodos() {
    var marcados = document.querySelectorAll('#checkbox');
    console.log(marcados);
    for (var i = 0; i < marcados.length; i++) {
        marcados[i].checked = false;
        var teste = marcados[i];
        // console.log(teste);
        marcacao = false;
        console.log(marcacao)
    }
}

function verificaTecla(event) {
    if (event.key == 'Enter') {
        adicionaItem();
    }
}

//adiciona função de adicionar ao soltar a tecla 'Enter'
itemNovo.addEventListener('keyup', verificaTecla);
//adiciona a função de adicionar itens ao botão buttAdicionar
buttAdicionar.addEventListener('click', adicionaItem);
//adiciona a função de desmarcar os itens ao botão btnDesmarcarTodos
btnDesmarcarTodos.addEventListener('click', desmarcarTodos);
//adiciona a função de marcar os itens ao botão btnMarcarTodos
btnMarcarTodos.addEventListener('click', marcarTodos);
//adiciona a função de remover os itens do LocalStorage ao buttRemover
buttRemover.addEventListener('click', romoverItemDoLocalStorage);