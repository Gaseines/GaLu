const enxoval = document.querySelector('.lista_enxoval')
const receitas = document.querySelector('.lista_receitas')
const filmes = document.querySelector('.lista_filmes')

enxoval.addEventListener('mouseover', () => {
    receitas.style.filter = 'blur(20px)'
    filmes.style.filter = 'blur(20px)'
})

enxoval.addEventListener('mouseout', () => {
    receitas.style.filter = 'blur(0)'
    filmes.style.filter = 'blur(0)'
})

receitas.addEventListener('mouseover', () => {
    enxoval.style.filter = 'blur(20px)'
    filmes.style.filter = 'blur(20px)'
})

receitas.addEventListener('mouseout', () => {
    enxoval.style.filter = 'blur(0)'
    filmes.style.filter = 'blur(0)'
})

filmes.addEventListener('mouseover', () => {
    receitas.style.filter = 'blur(20px)'
    enxoval.style.filter = 'blur(20px)'
})

filmes.addEventListener('mouseout', () => {
    receitas.style.filter = 'blur(0)'
    enxoval.style.filter = 'blur(0)'
})