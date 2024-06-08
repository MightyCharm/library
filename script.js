
const btnNewBook = document.querySelector("#btnNewBook");
const btnAdd = document.querySelector("#btnAdd");
const form = document.querySelector("#form");

const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputPages = document.querySelector("#pages");
const radioButtons = document.querySelectorAll(".radio");
const radioFalse = document.querySelector("#radioFalse");
const myLibrary = [];

const bgNormal= "rgba(255, 255, 255, 1)"
const bgInvalid = "rgba(250, 50, 10, 0.6)";
form.classList.add("hidden"); // make form invisible

function resetColors() {
    inputAuthor.style.backgroundColor = bgNormal;
    inputTitle.style.backgroundColor = bgNormal;
    inputPages.style.backgroundColor = bgNormal;
}

function resetInput() {
    inputAuthor.value = "";
    inputTitle.value = "";
    inputPages.value = "";
}

function openForm() {
    console.log("openForm()");
    // make form visible
    form.classList.remove("hidden");
    // disable button as long form is opens
    btnNewBook.disabled = true;
    resetColors();
    resetInput();

}

function getData(e) {
    console.log("getData()");
    let radioVal;
    radioButtons.forEach( (btn) => {
        if(btn.checked === true) {
            console.log(btn.value);
            radioVal = btn.value;
        }
    })
    // if user entered everything, create object
    if(author.value.length > 0 && title.value.length > 0 && pages.value.length > 0 && Number(pages.value)>0) {
        e.preventDefault()
        // create new object
        let obj = new Book(author.value, title.value, pages.value, radioVal);
        console.log(obj.info());
        // call function to push new object into an array
        addBookToLibrary(obj);
        createCard();
        // hide form
        form.classList.add("hidden");
        // make button visible again and active 
        btnNewBook.classList.remove("hidden");
        btnNewBook.disabled = false;
        radioFalse.checked = true;
    } else {  
        // something was missing in user input
        resetColors();
        if(author.value.length === 0) {
            console.log("author empty");
            inputAuthor.style.backgroundColor = bgInvalid;
        }
        if(title.value.length === 0) {
            console.log("title empty");
            inputTitle.style.backgroundColor = bgInvalid;
        }
        if(pages.value.length === 0 || Number(pages.value) <= 0) {
            console.log("pages empty");
            inputPages.style.backgroundColor = bgInvalid;
        }
    }     
}


function Book(title, author, pages, read) {
    console.log("inside Book");
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read= read,
    this.index = myLibrary.length;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}, index: ${this.index}`;
    }
}

function addBookToLibrary(obj) {
    console.log("function addBookToLibrary");
    myLibrary.push(obj)
    myLibrary.forEach((obj) => {
        console.log(obj);
    }) 
}

function createCard() {
    console.log("create card()");
    myLibrary.forEach( (obj) => {
        console.log(obj);
    })
}

//console.log(theHobbit.info());


btnAdd.addEventListener("click", (e) => {
    console.log("btnAdd EventListener click");
    getData(e);
});

btnNewBook.addEventListener("click", () => {
    console.log("btnNewBook EventListener click");
    openForm();
})