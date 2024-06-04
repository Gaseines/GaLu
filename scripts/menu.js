const burguer = document.querySelector('.container_burguer')
const nav = document.querySelector('nav')
const containerLinks = document.querySelector('.nav_links_container')
const links = document.querySelectorAll('.nav_link')

document.addEventListener('DOMContentLoaded', () => {
    function tamanhoTela(){
        links.forEach(link => {
            if(window.innerWidth <= 850){
                
                link.classList.add('up_itens')
                link.style.display = 'none'
                
                
            }else{
                link.classList.remove('up_itens')
                link.classList.remove('down_itens')
                link.style.display = 'inline-block'
                nav.style.height = '100px'
            }
        })
    }
    
    burguer.addEventListener('click', () => {
        links.forEach(link => {
            if(link.classList.contains('up_itens')){
                nav.style.height = '350px'
    
                
    
                setTimeout(() => {
                    link.style.display = 'block'
                    link.classList.remove('up_itens')
                    link.classList.add('down_itens')
                }, 200)
                
                
            }else{
                nav.style.height = '100px'
    
                
                link.classList.remove('down_itens')
                link.classList.add('up_itens')
                
            }
        })
    })
    
    window.addEventListener('resize', tamanhoTela)
    window.addEventListener('load', tamanhoTela)
})

