const mainWrapper = document.querySelector('#books-wrapper');
const modal = document.querySelector('#modal');
const openModal = document.querySelector('#open-modal');
const closeModal = document.querySelector('#close-modal');
const form = document.querySelector('form');
const requiredInputs = document.querySelectorAll('input[required]');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readStatus = document.querySelector('#read-status');
const submitBtn = document.querySelector('#submit');

// The next 2 functions opens and closes the modal when the buttons are clicked
openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

// This is where the each book inputs from the users are stored
const myLibrary = [];

function Book (id, title, author, pages, haveRead) {
    // The book should not be created if it's not created with a new Keyword
    if(!new.target) {
        throw Error("Use the new operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = () => {
        if (!haveRead) {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, read already`;
        }
    }
}

// This function toggles a book instance's read status
Book.prototype.toggleReadStatus = function(){
    // change the haveRead value to the opposite value
    this.haveRead = !this.haveRead;
}

// This function adds book to the library array
function addBookToLibrary (newTitle, newAuthor, newPages, haveRead) {
    // The next line create a random string and assigns them to ID so that it's unique
    const id = self.crypto.randomUUID();
    const book = new Book(id, newTitle, newAuthor, newPages, haveRead);
    myLibrary.push(book);
}

// This are the dummy books created so that I can design each cards
addBookToLibrary("The Hobbit", "J.R.R", 400, true);
addBookToLibrary("Atomic Habit", "James", 100, false);
addBookToLibrary("The chronicles of life", "Wixda", 134, true);

for (let i = 0; i < myLibrary.length; i++) {
    displayParagraph(myLibrary[i]);
}

// The user should not be able to check the checkbox if the user has not filled the required inputs form
readStatus.addEventListener('click', () => {
    requiredInputs.forEach(input => {
        if(input.value.length === 0) {
            event.preventDefault();
        }
    });
})

// The next function enables the submit button when the user has filled the form
form.addEventListener('input', () => {
    // Iterate through all required inputs and check if they've been filled
    const allFilled = Array.from(requiredInputs).every((input) => {
        return input.value !== '';
    })

    // Toggle the event state
    if(allFilled) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', 'true');
    }
})


submitBtn.addEventListener('click', () => {
    const userTitle = titleInput.value;
    const userAuthor = authorInput.value;
    const userPages = pagesInput.value;
    let userHasRead = false;
    if (readStatus.checked) {
        userHasRead = true;
    }
    addBookToLibrary(userTitle, userAuthor, userPages, userHasRead);
    displayParagraph(myLibrary[myLibrary.length - 1]);
})



function displayParagraph (book) {
    // This create the card where the items will be displayed
    let newCard = document.createElement("div");
    newCard.classList.add('card');
    newCard.dataset.id = book.id;
    
    let newTitle = document.createElement('p');
    newTitle.classList.add('card-section');
    newTitle.textContent = `"${book.title}"`
    newCard.appendChild(newTitle);
    
    let newAuthor = document.createElement('p');
    newAuthor.classList.add('card-section');
    newAuthor.textContent = book.author;
    newCard.appendChild(newAuthor);
    
    let newPages = document.createElement('p');
    newPages.classList.add('card-section');
    newPages.textContent = `${book.pages} pages`;
    newCard.appendChild(newPages);

    let statusBtn = document.createElement('button');
    statusBtn.addEventListener('click', () => {
        book.toggleReadStatus();
        if (book.haveRead) {
            statusBtn.classList.add('completed');
            statusBtn.textContent = "Not Read";
        } else {    
            statusBtn.classList.remove('completed');
            statusBtn.textContent = "Read";
        }
    })

    // Check the read status and display the appropriate color & text
    if (book.haveRead) {
        statusBtn.classList.add('completed');
        statusBtn.textContent = "Not Read";
    } else {    
        statusBtn.textContent = "Read";
    }

    newCard.appendChild(statusBtn);

    // The next block of code create the delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = "Delete";
    newCard.appendChild(deleteBtn);

    // The next function create the delete button
    deleteBtn.addEventListener('click', () => {
        const parentElement = event.target.parentNode;
        const itemToBeRemoved = parentElement.dataset.id;
        myLibrary.splice(myLibrary.findIndex(storedBook => storedBook.id === itemToBeRemoved), 1)
        parentElement.remove();
    })
        
    mainWrapper.appendChild(newCard);
}

function deleteCard() {
}