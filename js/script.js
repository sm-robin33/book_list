//get the ui element
let form = document.querySelector('#book_form');
let boolList = document.querySelector('#book-list');



//book class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//ui class

class UI {
    static addBookList(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href='#' class="delete">X</a></td>`;
        list.appendChild(row);
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book_form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static deleteFormBook(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            UI.showAlert('Book Removed!', 'success');
        }

    }
}

//Store in Local storage

class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        let books = store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }
    static displayBooks() {
        let books = store.getBooks();
        books.forEach(book => {
            UI.addBookList(book);
        });
    }
}



//add event listener

form.addEventListener('submit', newBook);
boolList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', store.displayBooks());

function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill all the fields!", "error");
    }
    else {
        let book = new Book(title, author, isbn);

        UI.addBookList(book);
        UI.clearFields();
        UI.showAlert("Book added!", "success");
        store.addBook(book);
    }

    e.preventDefault();
}

function removeBook(e) {

    UI.deleteFormBook(e.target);
    e.preventDefault();
}