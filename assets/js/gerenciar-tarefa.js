let titulo = document.querySelector('#titulo-lista')
let descricao = document.querySelector('#descricao-lista')
let categoria = document.querySelector('#categoria-lista')
let prioridade = document.querySelector('#prior-lista')
let incluir = document.querySelector('#incluir')
let textoDesc = document.querySelector('#descricao-tarefa')
let textoTitulo = document.querySelector('#texto-titulo')

incluir.addEventListener('click', ()=>{
    let tarefas = []
    let section = document.querySelector('#section')
    
    validarFormulario()
    
    function validarFormulario() {
        let formValido = true;
    
        if (titulo.value.length < 5) {
            titulo.classList.add('naopreencheuInput');
            textoTitulo.classList.add('naopreencheuTexto');
            formValido = false;
        }
    
        if (descricao.value.length < 10) {
            descricao.classList.add('naopreencheuInput');
            textoDesc.classList.add('naopreencheuTexto');
            formValido = false;
        }
    
        if (categoria.value == 'Categoria *') {
            categoria.classList.remove('text-light');
            categoria.classList.add('naopreencheuTextoSelect');
            formValido = false;
        }
    
        if (prioridade.value == 'Nível de Prioridade *') {
            prioridade.classList.remove('text-light');
            prioridade.classList.add('naopreencheuTextoSelect');
            formValido = false;
        }
    
        if (formValido) {
            armazenar();
            removerValores();
        } else {
            alert('Você precisa preencher todos os campos obrigatórios');
        }
    
        removerClasses();
    }
    
    function armazenar() {
        tarefas.push({
            titulo: titulo.value,
            descricao: descricao.value,
            categoria: categoria.value,
            prioridade: prioridade.value
        });
        console.log(tarefas);
    }
    
    function removerValores() {
        titulo.value = '';
        descricao.value = '';
        categoria.value = 'Categoria *';
        prioridade.value = 'Nível de Prioridade *';
    }
    
    function removerClasses() {
        setTimeout(() => {
            descricao.classList.remove('naopreencheuInput');
            titulo.classList.remove('naopreencheuInput');
            textoTitulo.classList.remove('naopreencheuTexto');
            textoDesc.classList.remove('naopreencheuTexto');
            categoria.classList.add('text-light');
            categoria.classList.remove('naopreencheuTextoSelect');
            prioridade.classList.add('text-light');
            prioridade.classList.remove('naopreencheuTextoSelect');
        }, 3000);
    }    

    tarefas.forEach(tarefa => {
        criarTarefa(tarefa.titulo, tarefa.categoria, tarefa.prioridade, tarefa.descricao);
    });

    function criarTarefa(titulo, categoria, prioridade, descricao) {
        let rowPai = document.createElement('div')
        rowPai.classList.add('row', 'mt-5', 'shadow', 'px-5', 'py-5')
        let row = document.createElement('div')
        row.classList.add('row')
        let col12 = document.createElement('div')
        col12.classList.add('col-12', 'text-center')
        let title = document.createElement('h4')
        title.innerHTML = titulo
        let col6 = document.createElement('div')
        col6.classList.add('col-6')
        let category = document.createElement('h5')
        category.innerHTML = `Categoria | ${categoria}`
        let col6End = document.createElement('div')
        col6End.classList.add('col-6', 'text-end')
        let priority = document.createElement('h5')
        priority.innerHTML = `Prioridade | ${prioridade}`
        let row1 = document.createElement('div')
        row1.classList.add('row')
        let col12d = document.createElement('div')
        col12d.classList.add('col-12')
        let description = document.createElement('p')
        description.innerHTML = descricao
        let colbtns = document.createElement('div');
        colbtns.classList.add('col-sm-6', 'col-12', 'col-lg-6');
        let completeBtn = document.createElement('button');
        completeBtn.classList.add('completar','btn', 'bg-dark', 'text-light', 'offset-1');
        completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        let editBtn = document.createElement('button');
        editBtn.classList.add('editar','btn', 'bg-dark', 'text-light');
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('hide','deletar','btn', 'bg-dark', 'text-light', 'offset-1');
        deleteBtn.innerHTML = '<i class="fa-solid fa-eraser"></i>';
        

        rowPai.append(row)
        row.append(col12)
        col12.append(title)
        row.append(col6)
        col6.append(category)
        row.append(col6End)
        col6End.append(priority)
        rowPai.append(row1)
        row1.append(col12d)
        col12d.append(description)
        colbtns.append(editBtn);       
        colbtns.append(deleteBtn)
        colbtns.append(completeBtn);
        row1.append(colbtns);

        section.append(rowPai)
    }
})

