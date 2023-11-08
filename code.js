const modal = document.querySelector('#form-modal')
const addBtn = document.querySelector('#add-btn')
const closeBtn = document.querySelector('#close-btn')

addBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})
