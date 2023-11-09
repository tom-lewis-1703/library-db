// Select modal, button elements and table from the DOM
const modal = document.querySelector('#form-modal')
const addBtn = document.querySelector('#add-btn')
const closeBtn = document.querySelector('#close-btn')
const submitBtn = document.querySelector('#submit-btn')
const table = document.querySelector('table')

// Function to handle form submission
function onSubmit(e) {
    e.preventDefault() // Prevent default form submission behavior

    // Retrieve form values
    let author = document.querySelector('#author').value
    let bookTitle = document.querySelector('#book-title').value
    let numberOfPages = document.querySelector('#pg-numbers').value
    let read = document.querySelector('#read').value

    // Create a book data object
    let bookData = {
        author: author,
        bookTitle: bookTitle,
        numberOfPages: numberOfPages,
        read: read
    }

    // Retrieve books from local storage or create an empty array if none exist
    let books = JSON.parse(localStorage.getItem('books')) || []
    books.push(bookData) // Add new book data to array
    localStorage.setItem('books', JSON.stringify(books)) // Update local storage

    addRowToTable(bookData) // Add new book data as a row in the table

    // Reset form fields
    document.querySelector('#author').value = '';
    document.querySelector('#book-title').value = '';
    document.querySelector('#pg-numbers').value = '';
    document.querySelector('#read').checked = false;

    modal.style.display = 'none' // Hide modal after submission
}

// Function to add a new row to the table
function addRowToTable(data, index) {
    let newRow = document.createElement('tr'); // Create a new table row
    newRow.setAttribute('data-index', index) // Set data-index attribute for the row

    // Create and populate table data cells with book data
    let newAuth = document.createElement('td');
    newAuth.textContent = data.author;
    let newTitle = document.createElement('td');
    newTitle.textContent = data.bookTitle;
    let newPgNumber = document.createElement('td');
    newPgNumber.textContent = data.numberOfPages;
    let newRead = document.createElement('td');
    newRead.textContent = (data.read.value === 'on') ? "Yes" : "No"
    newRead.classList.add('read-cell') // Add class for styling
    
    // Toggle read status on click
    newRead.onclick = () => {newRead.textContent = (newRead.textContent === 'Yes') ? "No" : "Yes"}

    // Create a remove button for the book entry
    let removeBtnCell = document.createElement('td')
    let removeBtn = document.createElement('button')
    removeBtn.classList.add('remove-btn')
    removeBtn.textContent = '⌧'
    removeBtn.onclick = function() { removeBook(index) } // Assign click handler to remove the book

    removeBtnCell.appendChild(removeBtn)

    // Append cells to the new row
    newRow.appendChild(newAuth);
    newRow.appendChild(newTitle);
    newRow.appendChild(newPgNumber);
    newRow.appendChild(newRead);
    newRow.appendChild(removeBtnCell)
    
    table.appendChild(newRow); // Append the new row to the table
}

// Function to remove a book from the table and local storage
function removeBook(index) {
    let books = JSON.parse(localStorage.getItem('books')) || []
    books.splice(index, 1) // Remove the book from the array
    localStorage.setItem('books', JSON.stringify(books)) // Update local storage

    // Remove the book's row from the table
    let row = document.querySelector('tr[data-index="' + index + '"]')
    if (row) {
        row.remove()
    }
}

// Function to load saved book data from local storage and add to the table
function loadSavedData() {
    let books = JSON.parse(localStorage.getItem('books')) || []
    books.forEach((bookData, index) => {
        addRowToTable(bookData, index) // Add each book as a row to the table
    })
}

// Event listeners for DOM content loaded, and button clicks
document.addEventListener('DOMContentLoaded', loadSavedData) // Load saved data on page load
addBtn.addEventListener('click', () => {
    modal.style.display = 'flex' // Show modal when add button is clicked
})
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none' // Hide modal when close button is clicked
})
submitBtn.addEventListener('click', (Event) => onSubmit(Event)) // Handle form submission
