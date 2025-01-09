const myLibrary = [];
let init = null;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    if (init != null && init === true) {
        myLibrary.length = 0
    }
    init = false;
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    render();
}

function deleteBookFromLibrary(title) {
    const index = myLibrary.findIndex(book => book.title == title);
    myLibrary.splice(index, 1);
    render();
}
function changeReadStatus(index) {
    if(myLibrary[index].read === 'Yes'){
        myLibrary[index].read = 'No';
    } else {
        myLibrary[index].read = 'Yes';
    }
    render();
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'Yes');
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkien', 398, 'Yes');
addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', 327, 'Yes');
addBookToLibrary('The Return of the King', 'J.R.R. Tolkien', 347, 'Yes');
addBookToLibrary('The Silmarillion', 'J.R.R. Tolkien', 365, 'Yes');
addBookToLibrary('The Children of Hurin', 'J.R.R. Tolkien', 287, 'Yes');
addBookToLibrary('Unfinished Tales', 'J.R.R. Tolkien', 325, 'Yes');
addBookToLibrary('The History of Middle-Earth', 'J.R.R. Tolkien', 412, 'Yes');
addBookToLibrary('The Book of Lost Tales', 'J.R.R. Tolkien', 284, 'Yes');
addBookToLibrary('The Lays of Beleriand', 'J.R.R. Tolkien', 298, 'No');
addBookToLibrary('The Shaping of Middle-Earth', 'J.R.R. Tolkien', 312, 'Yes');
init = true;



function render() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    myLibrary.forEach((book,index) => {
        const card = document.createElement('div');
        const btns = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
        `;
        btns.classList.add('btns');
        btns.innerHTML = `
            <button class="delete" index = "${index}">Delete</button> 
            <button class="read" index = "${index}"></button>
        `;
        card.appendChild(btns);
        const readBtn = card.querySelector('.read');
        if(book.read === 'Yes'){
            card.style.border = '5px solid lightgreen';
            readBtn.textContent = 'Not Read';

        } else {   
            card.style.border = '5px solid red';
            readBtn.textContent = 'Read';
        }
        container.appendChild(card);
    });
}

render();

const button = document.getElementById('newBook');
const form = document.querySelector('.form');

button.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    form.style.display = 'block';
});

document.addEventListener('click', (e) => {
    if(!form.contains(e.target) && form.style.display === 'block'){
        form.style.display = 'none';
    }
});
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="read"]:checked');
    addBookToLibrary(title, author, pages, read.value);
    form.style.display = 'none';
} );
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        const index = e.target.getAttribute('index');
        const title = myLibrary[index].title;
        deleteBookFromLibrary(title);
    }
});

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('read')){
        const index = e.target.getAttribute('index');
        changeReadStatus(index);
    }
});


