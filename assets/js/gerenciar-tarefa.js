document.addEventListener('DOMContentLoaded', () => {
    const titulo = document.querySelector('#titulo-lista');
    const descricao = document.querySelector('#descricao-lista');
    const categoria = document.querySelector('#categoria-lista');
    const prioridade = document.querySelector('#prior-lista');
    const incluir = document.querySelector('#incluir');
    const textoDesc = document.querySelector('#descricao-tarefa');
    const textoTitulo = document.querySelector('#texto-titulo');
    const section = document.querySelector('section');
    const editarBtn = document.querySelector('#editar');
    const tarefas = [];
    const tarefa = document.querySelectorAll('.tarefa') 
    const confirmar = document.querySelector('#confirmar')
    const cancelar = document.querySelector('#cancelar')

    // Interatividade Extra
    let interatividade = document.querySelector('#botao-interatividade');
    let adicao_de_tarefa = document.querySelector('#adicao-de-tarefa');
    
    interatividade.addEventListener('click', upDown)
    function upDown(){
        adicao_de_tarefa.classList.toggle('hide');
        let icone = document.querySelector('#iconeBtn');
        icone.classList.toggle('fa-arrow-circle-down');
        let nav = document.querySelector('.nav');
        nav.classList.toggle('shadow');
        console.log('botão de interatividade acionado');
    }

    incluir.addEventListener('click', () => {
        if (titulo.value.length < 5 || descricao.value.length < 10 || categoria.value == 'Categoria *' || prioridade.value == 'Nível de Prioridade *') {
            validarFormulario();
            console.log('tarefa inválida, não foi possível adicionar.');
        } else {
            armazenar();
            removerClasses();
            removerValores();

            tarefas.forEach(tarefa => {
                criarTarefa(tarefa.titulo, tarefa.categoria, tarefa.prioridade, tarefa.descricao);
            });

            atualizarVisibilidadeBotaoEditar(); // Atualiza a visibilidade do botão de editar

            adicao_de_tarefa.classList.toggle('hide');
            let icone = document.querySelector('#iconeBtn');
            icone.classList.toggle('fa-arrow-circle-down');
            let nav = document.querySelector('.nav');
            nav.classList.toggle('shadow');

            console.table(tarefas);
            tarefas.length = 0;
            console.log('tarefa válida e adicionada com sucesso.');
        }
    });

    function atualizarVisibilidadeBotaoEditar() {
        const tarefasConcluidas = document.querySelectorAll('.tarefa.sucesso').length;
        const tarefasNaoConcluidas = document.querySelectorAll('.tarefa:not(.sucesso)').length;
    
        if (tarefasNaoConcluidas > 0) {
            editarBtn.classList.remove('hide');
        } else {
            editarBtn.classList.add('hide');
        }

        // Adiciona um listener para alternar a visibilidade dos botões
        editarBtn.removeEventListener('click', alternarBotoes); // Remove listener anterior para evitar múltiplos listeners
        editarBtn.addEventListener('click', alternarBotoes);
    }

    function alternarBotoes() {
        const todasTarefas = document.querySelectorAll('.tarefa');
        
        todasTarefas.forEach(tarefa => {
            const editarTextoBtn = tarefa.querySelector('.editarTexto');
            const completeBtn = tarefa.querySelector('.completar');
            const apagarBtn = tarefa.querySelector('.apagar');
            
            if (tarefa.classList.contains('sucesso')) {
                // Se a tarefa está concluída, oculta todos os botões relacionados
                if (editarTextoBtn) editarTextoBtn.classList.add('hide');
                if (completeBtn) completeBtn.classList.add('hide');
                if (apagarBtn) apagarBtn.classList.add('hide');
            } else {
                // Caso contrário, alterna a visibilidade dos botões
                if (editarTextoBtn) editarTextoBtn.classList.toggle('hide');
                if (completeBtn) completeBtn.classList.toggle('hide');
                if (apagarBtn) apagarBtn.classList.toggle('hide');
            }
        });
        
        incluir.classList.toggle('hide');
        desabilitarInputs();
        upDown();
    }
    
    

    function desabilitarInputs(){
        titulo.disabled = true;
        descricao.disabled = true;
        categoria.disabled = true;
        prioridade.disabled = true;
    }

    function habilitarInputs(){
        titulo.disabled = false;
        descricao.disabled = false;
        categoria.disabled = false;
        prioridade.disabled = false;
    }

    function concluir() {
        console.log('Ação completada');
        const tarefaContainer = this.closest('.tarefa');
        
        // Adiciona a classe 'sucesso' à tarefa
        tarefaContainer.classList.toggle('sucesso');
        
        // Esconde o botão de completar
        this.classList.toggle('hide');
        
        // Encontra o .colBtns mais próximo e a row pai
        const colBtns = tarefaContainer.querySelector('.colBtns');
        if (colBtns) {
            const rowPai = colBtns.closest('.row');
            if (rowPai) {
                // Remove a row pai
                rowPai.remove();
            }
        }
        
        atualizarVisibilidadeBotaoEditar();
    }

    function apagar() {
        console.log('Tarefa removida com sucesso!');
        const tarefaContainer = this.closest('.tarefa');
        tarefaContainer.remove();
        habilitarInputs();
        incluir.classList.toggle('hide')
        atualizarVisibilidadeBotaoEditar()
    }

    function removerValores() {
        titulo.value = '';
        descricao.value = '';
        categoria.value = 'Categoria *';
        prioridade.value = 'Nível de Prioridade *';
    }

    function armazenar() {
        tarefas.push({
            titulo: titulo.value,
            descricao: descricao.value,
            categoria: categoria.value,
            prioridade: prioridade.value
        });
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

    function validarFormulario() {
        if (titulo.value.length < 5) {
            titulo.classList.add('naopreencheuInput');
            textoTitulo.classList.add('naopreencheuTexto');
        }

        if (descricao.value.length < 10) {
            descricao.classList.add('naopreencheuInput');
            textoDesc.classList.add('naopreencheuTexto');
        }

        if (categoria.value == 'Categoria *') {
            categoria.classList.remove('text-light');
            categoria.classList.add('naopreencheuTextoSelect');
        }

        if (prioridade.value == 'Nível de Prioridade *') {
            prioridade.classList.remove('text-light');
            prioridade.classList.add('naopreencheuTextoSelect');
        }
    }

    function editarTexto(titulo, descricao, categoria, prioridade, tarefa) {
        upDown();
        habilitarInputs();
    
        // Mostra os botões de confirmar e cancelar
        confirmar.classList.remove('hide');
        cancelar.classList.remove('hide');
        editarBtn.classList.add('hide');
    
        // Esconde os botões de todas as tarefas que não estão concluídas
        document.querySelectorAll('.tarefa').forEach(tarefaItem => {
            if (!tarefaItem.classList.contains('sucesso')) {
                tarefaItem.querySelectorAll('.colBtns').forEach(colBtns => {
                    colBtns.classList.add('hide');
                });
            }
        });
    
        // Preenche os campos de edição com os valores da tarefa
        document.querySelector('#titulo-lista').value = titulo;
        document.querySelector('#descricao-lista').value = descricao;
        document.querySelector('#categoria-lista').value = categoria;
        document.querySelector('#prior-lista').value = prioridade;
    
        // Adiciona um event listener para confirmar a edição, passando a tarefa atual
        confirmar.onclick = function() {
            confirmarEdicao(tarefa);
        };
    }
    

    function confirmarEdicao(tarefa) {
        // Captura os valores dos inputs modificados
        const tituloR = document.querySelector('#titulo-lista').value;
        const descricaoR = document.querySelector('#descricao-lista').value;
        const categoriaR = document.querySelector('#categoria-lista').value;
        const prioridadeR = document.querySelector('#prior-lista').value;
    
        // Atualiza os valores na tarefa específica
        tarefa.querySelector('.titulo-tarefa').textContent = tituloR;
        tarefa.querySelector('.descricao-tarefa').textContent = descricaoR;
        tarefa.querySelector('.categoria-tarefa').textContent = categoriaR;
        tarefa.querySelector('.prioridade-tarefa').textContent = prioridadeR;
    
        // Oculta os botões de confirmar e cancelar, e exibe o botão de editar
        confirmar.classList.add('hide');
        cancelar.classList.add('hide');
        editarBtn.classList.remove('hide');
        incluir.classList.remove('hide');
    
        // Esconde todos os botões de outras tarefas que não estão concluídas
        document.querySelectorAll('.tarefa').forEach(tarefaItem => {
            if (!tarefaItem.classList.contains('sucesso')) {
                tarefaItem.querySelectorAll('.colBtns').forEach(colBtns => {
                    colBtns.classList.remove('hide');
                });
            }
        });

        document.querySelectorAll('.tarefa').forEach(tarefaItem => {
            if (!tarefaItem.classList.contains('sucesso')) {
                tarefaItem.querySelectorAll('.colBtns').forEach(colBtns => {
                    // Oculta todos os botões dentro de .colBtns
                    colBtns.querySelectorAll('button').forEach(btn => {
                        btn.classList.toggle('hide');
                    });
                });
            }
        });
    
        upDown();
        removerValores();
    }
    

    function criarTarefa(titulo, categoria, prioridade, descricao) {
        let rowPai = document.createElement('div');
        rowPai.classList.add('row', 'mt-5', 'shadow', 'px-5', 'py-5', 'tarefa');
        
        let row = document.createElement('div');
        row.classList.add('row');
        
        let col12 = document.createElement('div');
        col12.classList.add('col-12', 'text-center');
        
        let title = document.createElement('h4');
        title.classList.add('titulo-tarefa'); // Adiciona a classe para edição
        title.textContent = titulo;
        
        let col6 = document.createElement('div');
        col6.classList.add('col-6');
        
        let category = document.createElement('h5');
        category.classList.add('categoria-tarefa'); // Adiciona a classe para edição
        category.textContent = categoria;
        
        let col6End = document.createElement('div');
        col6End.classList.add('col-6', 'text-end');
        
        let priority = document.createElement('h5');
        priority.classList.add('prioridade-tarefa'); // Adiciona a classe para edição
        priority.textContent = prioridade;
        
        let row1 = document.createElement('div');
        row1.classList.add('row');
        
        let col12d = document.createElement('div');
        col12d.classList.add('col-12');
        
        let description = document.createElement('p');
        description.classList.add('descricao-tarefa'); // Adiciona a classe para edição
        description.textContent = descricao;
        
        let colbtns = document.createElement('div');
        colbtns.classList.add('col-sm-6', 'col-12', 'col-lg-6', 'colBtns');
        
        let completeBtn = document.createElement('button');
        completeBtn.classList.add('completar', 'btn', 'bg-dark', 'text-light');
        completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeBtn.addEventListener('click', concluir); 
        
        let apagarBtn = document.createElement('button');
        apagarBtn.classList.add('apagar', 'btn', 'bg-dark', 'text-light', 'hide');
        apagarBtn.innerHTML = '<i class="fa-solid fa-eraser"></i>';
        apagarBtn.addEventListener('click', apagar);
        
        let editarTextoBtn = document.createElement('button');
        editarTextoBtn.classList.add('editarTexto', 'btn', 'bg-dark', 'text-light', 'hide', 'offset-1');
        editarTextoBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    
        // Adiciona o event listener para editar o texto, passando a tarefa atual como argumento
        editarTextoBtn.addEventListener('click', function() {
            if (!rowPai.classList.contains('sucesso')) { // Verifica se a tarefa não está concluída
                editarTexto(
                    titulo,
                    descricao,
                    categoria,
                    prioridade,
                    rowPai // Passa a tarefa atual para edição
                );
            }
        });
        
        rowPai.append(row);
        row.append(col12);
        col12.append(title);
        row.append(col6);
        col6.append(category);
        row.append(col6End);
        col6End.append(priority);
        rowPai.append(row1);
        row1.append(col12d);
        col12d.append(description);
        colbtns.append(completeBtn);
        colbtns.append(apagarBtn);
        colbtns.append(editarTextoBtn);
        row1.append(colbtns);
        
        section.append(rowPai);

        // if (rowPai.classList.contains('sucesso')) {
        //     colbtns.querySelectorAll('button').forEach(button => button.classList.add('hide'));
        // }
        
        console.log('tarefa adicionada a section');
    }
});
