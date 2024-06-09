
const btnNewBook = document.querySelector("#btnNewBook");
const btnAdd = document.querySelector("#btnAdd");
//const form = document.querySelector("#form");
const boxForm = document.querySelector(".box-2");
const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputPages = document.querySelector("#pages");
const radioButtons = document.querySelectorAll(".radio");
const radioFalse = document.querySelector("#radioFalse");
const mainContent = document.querySelector("#box-3");
const myLibrary = [];

const bgNormal= "rgba(255, 255, 255, 1)"
const bgInvalid = "rgba(250, 50, 10, 0.6)";
//form.style.display = "none";
boxForm.style.display = "none";

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

function removeCard() {
    console.log("remove Card!");
}

function openForm() {
    console.log("function openForm");
    // make form visible
    //form.style.display="block";
    boxForm.style.display = "block";
    // disable button as long form is opens
    btnNewBook.disabled = true;
    resetColors();
    resetInput();

}

function getData(e) {
    console.log("function getData");
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
        //console.log(obj.info());
        // call function to push new object into an array
        addBookToLibrary(obj);
        //form.style.display = "none";
        boxForm.style.display = "none";

        btnNewBook.classList.remove("hidden"); // make button visible again and active 
        btnNewBook.disabled = false;
        radioFalse.checked = true;
    } else {  
        // if something was missing in user input
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
    //console.log("inside Book");
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.read= read,
    this.index = myLibrary.length;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}, index: ${this.index}`;
    }
}

function addBookToLibrary(obj) {
    console.log("function addBookToLibrary");
    myLibrary.push(obj);
    console.log("all objects in the array:");
    myLibrary.forEach( (obj) => {
        console.log(obj);
    })
    // get the last (newest) object in the array
    
    console.log("Pulling out the last one:");
    let element = myLibrary[myLibrary.length-1];
    console.log(element.info());
    
    mainContent.innerHTML += 
    `<div id="card-${element.index}" class="card">
        <div class="card-author">${element.author}</div>
        <div class="card-title">${element.title}</div>
        <div class="card-pages">${element.pages}</div>
        <div class="card-read">
        <div id="card-btnRead" class="card-read-txt">${element.read == "true" ? "book read": "not read"}</div>
            <button id="card-btnRead-${element.index}" class="card-btnRead">READ</button>
        </div>
        <button id="card-btnRemove-${element.index}" class="card-btnRemove">REMOVE</button>
    </div>`
    
    let btn = document.querySelector(`#card-btnRemove-${element.index}`);
    console.log(btn);
    btn.addEventListener("click", () => {
        removeCard();
    });
}

btnAdd.addEventListener("click", (e) => {
    //console.log("btnAdd EventListener click");
    getData(e);
});

btnNewBook.addEventListener("click", () => {
    //console.log("btnNewBook EventListener click");
    openForm();
})

