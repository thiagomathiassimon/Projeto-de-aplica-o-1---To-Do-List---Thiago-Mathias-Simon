var btnAdicionar = document.getElementById('btnAdicionar');
var btnRemover = document.getElementById('btnRemover');
var btnMarcarTodos = document.getElementById("btnMarcarTodos");
var btnDesmarcarTodos = document.getElementById('btnDesmarcarTodos');
var itemNovo = document.getElementById('inpItem');
var listaDeAtividades = document.getElementById('listaDeAtividades');
var closer = document.getElementsByClassName("close");
var closeButton = document.getElementsByTagName("LI");
var marcacao = false;
var lista = [];
obterListaDoLocalStorage();

//função que adiciona o item digitado à lista de itens
function adicionaItem() {
    var itemNaLista = document.getElementById('inpItem').value;
    if (itemNaLista.length) {
        criaElementoHtml(itemNaLista);
        guardarNoLocalStorage(itemNaLista, marcacao);
        itemNovo.value = "";
    } else {
        window.alert("Insira um valor para adicionar na lista!")
    }
}

//função que cria, por meio do appendChild, os elementos html na estrutura:
/* <li>
    <input type="checkbox"></input>
    <label></label>
    <button></button>
</li> */
function criaElementoHtml(item, marcado) {
    var itemLista = document.createElement('li');
    var i1 = createInputTypeCheckbox('checkbox', 'checkbox', 'checkbox', alteraCheck, marcado, '1');
    var l1 = createCheckboxLabel(item);
    var buttonClose = createCloseButton();
    listaDeAtividades.appendChild(itemLista);
    itemLista.appendChild(i1);
    itemLista.appendChild(l1);
    itemLista.appendChild(buttonClose);
}

//função que guarda a lista no LocalStorage
function guardarNoLocalStorage(item, marcado) {
    var objItens = { 'item': item, 'checked': marcado }
    lista.push(objItens);
    localStorage.setItem('toDoList', JSON.stringify(lista));
}

//função que obtém a lista salva no LocalStorage
function obterListaDoLocalStorage() {
    var listaDeItens = JSON.parse(localStorage.getItem('toDoList'));
    if (listaDeItens) {
        lista = listaDeItens;
        for (var i = 0; i < lista.length; i++) {
            criaElementoHtml(lista[i].item, lista[i].checked);
        }
    }
}

//função que remove todos os itens da lista armazenados no LocalStorage
function romoverTodosOsItensDoLocalStorage() {
    var confirm = window.confirm("Tem certeza que quer excluir todos os seus itens?")
    if (confirm == true) {
        localStorage.removeItem('toDoList');
        window.location.reload();
    } else {
        window.alert("Os itens serão mantidos.")

    }
}

//função que altera a marcação dum checkbox está marcado ou não
function alteraCheck() {
    var marcados = document.querySelectorAll('#checkbox');
    for (var i = 0; i < marcados.length; i++) {
        if (marcados[i].checked == true) {
            salvaAlteraçãoDoCheckboxNoLocalStorage(i, true);
        } else {
            salvaAlteraçãoDoCheckboxNoLocalStorage(i, false);
        }
    }
}

//função que salva a alteração da marcação do checkbox no LocalStorage
function salvaAlteraçãoDoCheckboxNoLocalStorage(i, checado) {
    var label = lista[i].item;
    var chec = lista[i].checked;
    chec = checado;
    lista[i].item = label;
    lista[i].checked = chec;
    localStorage.setItem('toDoList', JSON.stringify(lista));
}

//função que marca todos os checkboxes
function marcarTodos() {
    var confirm = window.confirm("Quer marcar todos os seus itens como concluídos?")
    if (confirm == true) {
        var marcados = document.querySelectorAll('#checkbox');
        for (var i = 0; i < marcados.length; i++) {
            marcados[i].checked = true;
            salvaAlteraçãoDoCheckboxNoLocalStorage(i, true);
        }
    }
}

//função que desmarca todos os checkboxes
function desmarcarTodos() {
    var confirm = window.confirm("Quer desmarcar todos os seus itens?")
    if (confirm == true) {
        var marcados = document.querySelectorAll('#checkbox');
        for (var i = 0; i < marcados.length; i++) {
            marcados[i].checked = false;
            salvaAlteraçãoDoCheckboxNoLocalStorage(i, false);
        }
    }
}

//função que apaga um item quando da ativação do botão com um "X"
function apagarItem() {
    var confirm = window.confirm("Deseja realmente excluir este item?")
    if (confirm == true) {
        this.id = "remova"
        var btnClassClose = document.querySelectorAll('.close');
        for (var i = 0; i < lista.length; i++) {
            if (btnClassClose[i].id == 'remova') {
                var posicaoNaLista = lista.indexOf(lista[i])
                var removido = lista.splice(posicaoNaLista, 1)
                localStorage.setItem('toDoList', JSON.stringify(lista));
                window.location.reload();
            }
        }
    } else {
        window.alert("O item será mantido.")
    }
}

//função que cria a estrutura do botão de apagar um elemento
function createCloseButton() {
    var buttonClose = document.createElement("button");
    buttonClose.className = "close";
    buttonClose.innerHTML = "\u274C";
    buttonClose.onclick = apagarItem;
    return buttonClose;
}

//função que cria a estrutura de um label para o checkbox
function createCheckboxLabel(content) {
    var label = document.createElement('label');
    label.innerHTML = content;
    return label;
}

//função que cria a estrutura de um input do tipo checkbox
function createInputTypeCheckbox(type, name, id, event, marcado, value) {
    var input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.id = id;
    input.onchange = event;
    input.checked = marcado;
    input.value = value;
    return input;
}

//função que verifica se a tecla enter foi pressionada e, posteriormente, soltada (executando o evento quando de sua soltura).
function adicionarComEnter(event) {
    if (event.key == 'Enter') {
        adicionaItem();
    }
}

//adiciona função de adicionar ao soltar a tecla 'Enter'
itemNovo.addEventListener('keyup', adicionarComEnter);
//adiciona a função de adicionar itens ao botão buttAdicionar
btnAdicionar.addEventListener('click', adicionaItem);
//adiciona a função de desmarcar os itens ao botão btnDesmarcarTodos
btnDesmarcarTodos.addEventListener('click', desmarcarTodos);
//adiciona a função de marcar os itens ao botão btnMarcarTodos
btnMarcarTodos.addEventListener('click', marcarTodos);
//adiciona a função de remover os itens do LocalStorage ao buttRemover
btnRemover.addEventListener('click', romoverTodosOsItensDoLocalStorage);