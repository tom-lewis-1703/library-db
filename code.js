const modal = document.querySelector('#form-modal')
const addBtn = document.querySelector('#add-btn')
const closeBtn = document.querySelector('#close-btn')
const submitBtn = document.querySelector('#submit-btn')
const table = document.querySelector('table')

function onSubmit(e) {
    e.preventDefault()

    let author = document.querySelector('#author').value
    let bookTitle = document.querySelector('#book-title').value
    let numberOfPages = document.querySelector('#pg-numbers').value
    let read = document.querySelector('#read').value

    let bookData = {
        author: author,
        bookTitle: bookTitle,
        numberOfPages: numberOfPages,
        read: read
    }

    let books = JSON.parse(localStorage.getItem('books')) || []
    books.push(bookData)
    localStorage.setItem('books', JSON.stringify(books))

    addRowToTable(bookData)

    document.querySelector('#author').value = '';
    document.querySelector('#book-title').value = '';
    document.querySelector('#pg-numbers').value = '';
    document.querySelector('#read').checked = false;

    modal.style.display = 'none'

}

function addRowToTable(data, index) {
    let newRow = document.createElement('tr');
    newRow.setAttribute('data-index', index)

    let newAuth = document.createElement('td');
    newAuth.textContent = data.author;

    let newTitle = document.createElement('td');
    newTitle.textContent = data.bookTitle;

    let newPgNumber = document.createElement('td');
    newPgNumber.textContent = data.numberOfPages;

    let newRead = document.createElement('td');
    newRead.textContent = (data.read.value === 'on') ? "Yes" : "No"
    newRead.classList.add('read-cell')

    newRead.onclick = () => {newRead.textContent = (newRead.textContent === 'Yes') ? "No" : "Yes"}

    let removeBtnCell = document.createElement('td')
    let removeBtn = document.createElement('button')
    removeBtn.classList.add('remove-btn')
    removeBtn.textContent = '⌧'
    removeBtn.onclick = function() { removeBook(index) }

    removeBtnCell.appendChild(removeBtn)

    newRow.appendChild(newAuth);
    newRow.appendChild(newTitle);
    newRow.appendChild(newPgNumber);
    newRow.appendChild(newRead);
    newRow.appendChild(removeBtnCell)
    
    table.appendChild(newRow);

}

function removeBook(index) {
    let books = JSON.parse(localStorage.getItem('books')) || []
    books.splice(index, 1)
    localStorage.setItem('books', JSON.stringify(books))

    let row = document.querySelector('tr[data-index="' + index + '"]')
    if (row) {
        row.remove()
    }
}

function loadSavedData() {
    let books = JSON.parse(localStorage.getItem('books')) || []
    books.forEach((bookData, index) => {
        addRowToTable(bookData, index)
    })
}

document.addEventListener('DOMContentLoaded', loadSavedData)

addBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})

submitBtn.addEventListener('click', (Event) => onSubmit(Event))
