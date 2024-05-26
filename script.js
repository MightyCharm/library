
const btnAdd = document.querySelector("#btnAdd");

const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputPages = document.querySelector("#pages");
const radioBtn = document.querySelector("#radioBtn");

function getForm() {
    let author = inputAuthor.value;
    let title = inputTitle.value;
    let pages = inputPages.value;
    let read = radioBtn.value;
    
    console.log(author);
    console.log(title);
    console.log(pages);
    console.log(read);

    if(author != "" && title != "" && pages != "" && read != "") {
        console.log("form filled uuuuuh yeah")
    } else {
        console.log("There is something missing huh!?");
    }

    
}





const myLibrary = [];




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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
//console.log(theHobbit.info());


btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    getForm();
});