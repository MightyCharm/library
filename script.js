
const btnNewBook = document.querySelector("#btnNewBook");
const btnAdd = document.querySelector("#btnAdd");
const form = document.querySelector("#form");

const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputPages = document.querySelector("#pages");
const radioButtons = document.querySelectorAll("#radio");
const myLibrary = [];
form.classList.add("hidden"); // make form invisible




function openForm() {
    console.log("openForm()");
    form.classList.remove("hidden");
    btnNewBook.disabled = true;
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
 
    console.log(`Author: ${author.value.length}`);
    console.log(`Title: ${title.value.length}`);
    console.log(`Pages: ${pages.value.length}`);
    console.log(`Radio Button Value: ${radioVal}`);
    
    // if user entered everything, create object
    if(author.value.length > 0 && title.value.length > 0 && pages.value.length > 0) {
        e.preventDefault()
        console.log("form filled uuuuuh yeah");
        form.classList.add("hidden");
        btnNewBook.classList.remove("hidden");
        btnNewBook.disabled = false;
    } else {
        // something was missing in user input
        // 1. check what is missing
        // 2. inform user
        console.log("Input not complete. What is missing? check length of inputs");
        
        if(author.value.length === 0) {
            console.log("author empty");
        }
        if(title.value.length === 0) {
            console.log("title empty");
        }
        if(pages.value.length === 0) {
            console.log("pages empty");
        }

  


    }

    
}


function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read= read
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    }
}

function addBookToLibrary() {

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