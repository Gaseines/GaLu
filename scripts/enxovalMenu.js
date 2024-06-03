const btn = document.querySelector('.btn_menu_enxoval')
const btn2 = document.querySelector('.btn_menu_enxoval_down')
const opcoes = document.querySelectorAll('.topicos')
const container = document.querySelector('.topicos_container')
const icone = document.querySelector('.img_down')


btn.addEventListener('click', () => {
    opcoes.forEach(opcao => {
        if(opcao.classList.contains('up_itens')){
            container.style.height = '80px'

            icone.src = '../icons/seta_up.png'

            setTimeout(() => {
                opcao.classList.remove('up_itens')
                opcao.classList.add('down_itens')
            }, 200)
            
            
        }else{
            container.style.height = '0px'

            icone.src = '../icons/seta_down.png'

            opcao.classList.remove('down_itens')
                opcao.classList.add('up_itens')
            
        }
    })
})



