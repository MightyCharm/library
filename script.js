
const btnNewBook = document.querySelector("#btnNewBook");
const btnAdd = document.querySelector("#btnAdd");
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
//boxForm.style.display = "none";

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


function readBook() {
    console.log("read Book!");
}

function openForm() {
    console.log("function openForm");
    boxForm.style.display = "block"; // display box containing form
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
    if( (author.value.length > 0) && (title.value.length > 0) && (pages.value.length > 0) && (Number(pages.value)>0) && Number(pages.value[0] != 0)){
        //e.preventDefault()
        // create new object
        let obj = new Book(author.value, title.value, pages.value, radioVal);
        addBookToLibrary(obj); // call function to push new object into an array
        boxForm.style.display = "none"; // do not display box containing form
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
        else if(title.value.length === 0) {
            console.log("title empty");
            inputTitle.style.backgroundColor = bgInvalid;
        }
        else if(pages.value.length === 0 || Number(pages.value) <= 0 || Number(pages.value[0]) === 0) {
            console.log("pages empty");
            inputPages.style.backgroundColor = bgInvalid;
        }
        else {
            console.log("something is missing but what?!");
        }
    } 
    e.preventDefault(); // seems to work ????   
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


function removeBookFromLibrary(btn) {
    console.log("remove Card!");
    console.log(btn);
    console. log(btn.getAttribute('data-id'));
    //  array.splice(index, 1)
    //console.log(myLibrary.splice(index, 1));

    /*myLibrary.forEach( (obj) => {
        console.log(obj);
    })*/
    // 1. remove with index element from array
    // 2. rerender array...element wont show up
    
}

function addBookToLibrary(obj) {
    console.log("function addBookToLibrary");
    myLibrary.push(obj);
    console.log("all objects in the array:");
    myLibrary.forEach( (obj) => {
        console.log(obj);
    })
    // get the last (newest) object in the array
    let element = myLibrary[myLibrary.length-1];
    //console.log(element.info());
    
    mainContent.innerHTML += 
    `<div id="card-${element.index}" class="card">
        <div class="card-author">${element.author}</div>
        <div class="card-title">${element.title}</div>
        <div class="card-pages">${element.pages}</div>
        <div class="card-read">
        <div id="card-btnRead" class="card-read-txt">${element.read == "true" ? "book read": "not read"}</div>
            <button id="card-btnRead-${element.index}" class="card-btnRead">READ</button>
        </div>
        <button id="card-btnRemove" data-id="${element.index}" class="card-btnRemove">REMOVE</button>
    </div>`
    
    //let btnRemove = document.querySelector(`#card-btnRemove`);
    let btnRead = document.querySelector(`#card-btnRead-${element.index}`);
    
    //let btnList = document.querySelectorAll('button[id^="card-btnRemove"]');
    let btnList = document.querySelectorAll('#card-btnRemove');
    console.log(btnList);
    btnList.forEach( (btn) => {
        btn.addEventListener("click", () => {
            removeBookFromLibrary(btn);
        });
    })
    
    //btnRemove.addEventListener("click", removeCard);
    btnRead.addEventListener("click", readBook)
}

btnAdd.addEventListener("click", (e) => {
    //console.log("btnAdd EventListener click");
    getData(e);
});

btnNewBook.addEventListener("click", () => {
    //console.log("btnNewBook EventListener click");
    openForm();
})

