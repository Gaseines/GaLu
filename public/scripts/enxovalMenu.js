const btn = document.querySelector('.btn_menu_enxoval')


//OPEN MENU
btn.addEventListener('click', () => {
    const btn2 = document.querySelector('.btn_menu_enxoval_down')
    const opcoes = document.querySelectorAll('.topicos')
    const container = document.querySelector('.topicos_container')
    const icone = document.querySelector('.img_down')
    opcoes.forEach(opcao => {
        if (window.innerWidth > 850) {
            if (opcao.classList.contains('up_itens')) {
                container.style.height = '80px'

                icone.src = '../icons/seta_up.png'

                setTimeout(() => {
                    opcao.style.display = 'block'
                    opcao.classList.remove('up_itens')
                    opcao.classList.add('down_itens')
                }, 200)


            } else {
                container.style.height = '0px'

                icone.src = '../icons/seta_down.png'

                opcao.style.display = 'none'
                opcao.classList.remove('down_itens')
                opcao.classList.add('up_itens')

            }
        } else {
            if (opcao.classList.contains('up_itens')) {
                container.style.height = '400px'

                icone.src = '../icons/seta_up.png'

                setTimeout(() => {
                    opcao.style.display = 'block'
                    opcao.classList.remove('up_itens')
                    opcao.classList.add('down_itens')
                }, 200)


            } else {
                container.style.height = '0px'

                icone.src = '../icons/seta_down.png'

                opcao.style.display = 'none'
                opcao.classList.remove('down_itens')
                opcao.classList.add('up_itens')

            }
        }
    })
})


//LINKS MENU
const linksListas = document.querySelectorAll('.topicos')

linksListas.forEach(links => {
    const cozinha = document.querySelector('.cozinha')
    const quarto = document.querySelector('.quarto')
    const banheiro = document.querySelector('.banheiro')
    const lavanderia = document.querySelector('.lavanderia')
    const sala = document.querySelector('.sala')
    links.addEventListener('click', () => {
        if(links.classList.contains('btn_cozinha')){
            cozinha.style.display = 'block'
            quarto.style.display = 'none'
            banheiro.style.display = 'none'
            lavanderia.style.display = 'none'
            sala.style.display = 'none'
        }else if(links.classList.contains('btn_quarto')){
            cozinha.style.display = 'none'
            quarto.style.display = 'block'
            banheiro.style.display = 'none'
            lavanderia.style.display = 'none'
            sala.style.display = 'none'
        }else if(links.classList.contains('btn_banheiro')){
            cozinha.style.display = 'none'
            quarto.style.display = 'none'
            banheiro.style.display = 'block'
            lavanderia.style.display = 'none'
            sala.style.display = 'none'
        }else if(links.classList.contains('btn_lavanderia')){
            cozinha.style.display = 'none'
            quarto.style.display = 'none'
            banheiro.style.display = 'none'
            lavanderia.style.display = 'block'
            sala.style.display = 'none'
        }else if(links.classList.contains('btn_sala')){
            cozinha.style.display = 'none'
            quarto.style.display = 'none'
            banheiro.style.display = 'none'
            lavanderia.style.display = 'none'
            sala.style.display = 'block'
        }
    })
    
})



