window.addEventListener('load', () => {

    if (localStorage.getItem('book')) {
        if (bookArr[0] == null) {
            localStorage.removeItem('book');
            sampleButton();
        } else {
            populateDom();
            attachButtonevents();
        }


    } else {
        sampleButton();
    }

});


const addBookButton = document.querySelector('.addButton');
const addFormdiv = document.querySelector('.addingBook div');
const submitFormButton = document.querySelector('.submitButton');
const form = document.querySelector('form');
const form_book_title = document.querySelector('#book_title');
const form_author = document.querySelector('#book_author');
const form_pages = document.querySelector('#book_pages');
const form_read_yes = document.querySelector('#book_yes');
const form_read_no = document.querySelector('#book_no');
const form_error = document.querySelector('form p');
const form_inputs = document.querySelectorAll('form input');
const books_section = document.querySelector('.books');

let bookArr = (localStorage.getItem('book') ? JSON.parse(localStorage.getItem('book')) : []);


//constructor function for book objects
function BookObj(title, author, pages, readval) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readval = readval;
}

function populateDom() {

    books_section.innerHTML = "";

    let objArr = JSON.parse(localStorage.getItem('book'));


    objArr.forEach((item, index) => {

        let book_title = document.createElement('h5');
        book_title.classList.add('book-title');

        let author = document.createElement('p');
        author.classList.add('author');

        let pages = document.createElement('p');
        pages.classList.add('pages');

        let read = document.createElement('p');
        read.classList.add('read');

        let book = document.createElement('section');
        book.classList.add('book');

        let delButton = document.createElement('button');
        delButton.classList.add('delButton');
        delButton.innerHTML = '<i class="fas fa-minus fa-xs"></i> Delete';
        delButton.setAttribute('data-num', index);

        book_title.textContent = item.title;
        author.textContent = 'By, ' + item.author;
        pages.textContent = item.pages + ' Pages';
        read.innerHTML = `Read Status : <span class="book_span" data-num=${index} >${item.readval}</span>`;

        book.appendChild(book_title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(read);
        book.appendChild(delButton);

        books_section.appendChild(book);


    })
}

function sampleButton(){
   let sampleButtons=document.querySelectorAll('.delButton');
   sampleButtons.forEach((item)=>{
       item.addEventListener('click',function(e){
           e.toElement.parentElement.style.display='none';
       })
   })
}

function setLocalstorage() {

    localStorage.setItem('book', JSON.stringify(bookArr));
    populateDom();
    attachButtonevents();
}

function storebook() {
    let title = form_book_title.value;
    let author = form_author.value;
    let pages = form_pages.value;
    let readval = (form_read_yes.checked ? form_read_yes.value : form_read_no.value);
    let book = new BookObj(title, author, pages, readval);
    bookArr.push(book);
    setLocalstorage();
}

//on delete remove book
function attachButtonevents() {
    let delButtons = document.querySelectorAll('.delButton');
    delButtons.forEach((item) => {
        item.addEventListener('click', function (e) {
            bookArr.splice(e.target.dataset.num, 1);
            setLocalstorage();
        })
    })
    let spanButtons = document.querySelectorAll('.book_span');
    spanButtons.forEach((item) => {
        item.addEventListener('click', function (e) {
            bookArr[e.target.dataset.num].readval = item.textContent == 'yes' ? 'no' : 'yes';
            setLocalstorage();
        })
    })
}

//showerror function
function showError(item) {
    switch (item.id) {
        case 'book_title':
            form_error.textContent = 'Enter words between the length of 1 and 50'
            break;
        case 'book_author':
            form_error.textContent = 'Enter letters between the length of 1 and 50'
            break;
        case 'book_pages':
            form_error.textContent = 'Book must have a min of 5 and max 300 pages'
            break;
        case 'book_yes':
            form_error.textContent = 'did you read the book?'
            break;
        case 'book_no':
            form_error.textContent = 'did you read the book?'
            break;
    }
}

//class toggler for adding book
addBookButton.addEventListener('click', () => {
    if (addFormdiv.classList.contains('hidebook')) {
        addFormdiv.classList.remove('hidebook');
        addFormdiv.classList.add('addBook', 'formbackground');
    } else {
        addFormdiv.classList.remove('addBook', 'formbackground');
        addFormdiv.classList.add('hidebook');
    }

});


//adding custom validation
//for all inputs if input is not valid call showerror
form_inputs.forEach((item) => {
    item.addEventListener('input', function (event) {
        if (item.validity.valid) {
            form_error.textContent = '';
        } else {
            showError(item);
        }
    })
});
//on submit too call showerror
submitFormButton.addEventListener('click', function (event) {
    form_inputs.forEach((item) => {
        if (!item.validity.valid) {
            showError(item);
            event.preventDefault();
        }
    });
    storebook();
});
