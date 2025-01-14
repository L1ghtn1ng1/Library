class Book{
    constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }
}

class Library {
    myLibrary = [];
    constructor(){
        this.init = true;
    }
    
    addBookToLibrary(title, author, pages, read){
        if (this.init != null && this.init === true) {
            this.myLibrary.length = 0
        }
        this.init = false;
        const book = new Book(title, author, pages, read);
        this.myLibrary.push(book);
        this.render();    
    } 
    deleteBookFromLibrary(title){
        const index = this.myLibrary.findIndex(book => book.title == title);
        this.myLibrary.splice(index, 1);
        this.render();
    }
    changeReadStatus(index){
        if(this.myLibrary[index].read === 'Yes'){
            this.myLibrary[index].read = 'No';
        } else {
            this.myLibrary[index].read = 'Yes';
        }
        this.render();
    }
    render() {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        this.myLibrary.forEach((book,index) => {
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
}
const book = new Library();
book.render();
book.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'Yes');
book.addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkien', 398, 'Yes');
book.addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', 327, 'Yes');
book.addBookToLibrary('The Return of the King', 'J.R.R. Tolkien', 347, 'Yes');
book.addBookToLibrary('The Silmarillion', 'J.R.R. Tolkien', 365, 'Yes');
book.addBookToLibrary('The Children of Hurin', 'J.R.R. Tolkien', 287, 'Yes');
book.addBookToLibrary('Unfinished Tales', 'J.R.R. Tolkien', 325, 'Yes');
book.addBookToLibrary('The History of Middle-Earth', 'J.R.R. Tolkien', 412, 'Yes');
book.addBookToLibrary('The Book of Lost Tales', 'J.R.R. Tolkien', 284, 'Yes');
book.addBookToLibrary('The Lays of Beleriand', 'J.R.R. Tolkien', 298, 'No');
book.addBookToLibrary('The Shaping of Middle-Earth', 'J.R.R. Tolkien', 312, 'Yes');

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
    book.addBookToLibrary(title, author, pages, read.value);
    form.style.display = 'none';
} );
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const index = e.target.getAttribute('index');
        const title = book.myLibrary[index].title;
        book.deleteBookFromLibrary(title);
    }
});

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('read')){
        const index = e.target.getAttribute('index');
        book.changeReadStatus(index);
    }
});
