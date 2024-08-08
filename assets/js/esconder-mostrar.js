let interatividade = document.querySelector('#botao-interatividade')
let adicao_de_tarefa = document.querySelector('#adicao-de-tarefa')
interatividade.addEventListener('click', ()=>{
    adicao_de_tarefa.classList.toggle('hide')
    let icone = document.querySelector('#iconeBtn')
    icone.classList.toggle('fa-arrow-circle-down')
    let nav = document.querySelector('.nav')
    nav.classList.toggle('shadow')
})