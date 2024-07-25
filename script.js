
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
const bgInvalid = "rgba(255, 00, 0, 1)";
boxForm.style.display = "none";

function resetColors() {
    console.log("function resetColors()");
    inputAuthor.style.backgroundColor = bgNormal;
    inputTitle.style.backgroundColor = bgNormal;
    inputPages.style.backgroundColor = bgNormal;
}

function resetInput() {
    console.log("function resetInput()");
    inputAuthor.value = "";
    inputTitle.value = "";
    inputPages.value = "";
}

function openForm() {
    console.log("function openForm()");
    boxForm.style.display = "block"; // display box containing form
    btnNewBook.disabled = true; // disable button as long form is opens
    resetColors();
    resetInput();

}

function Book(title, author, pages, read) {
    console.log("function Book()");
    //console.log("inside Book");
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.read= read,
    this.index = myLibrary.length;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}, index: ${this.index}`;
    }
    console.log("========");
    console.log(typeof this.read);
}


function getData(e) {
    console.log("function getData()");
    let radioVal;
    radioButtons.forEach( (btn) => {
        if(btn.checked === true) {
            //console.log(btn.value);
            radioVal = btn.value;
        }
    })
    // if user entered everything, create object
    if( (author.value.length > 0) && (title.value.length > 0) && (pages.value.length > 0) && (Number(pages.value)>0) && Number(pages.value[0] != 0)){
        //e.preventDefault()
        let obj = new Book(author.value, title.value, pages.value, radioVal);  // create new object
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

function drawMainContent() {
    console.log("function drawMainContent()")
    mainContent.innerHTML = "";
    myLibrary.forEach( (obj) => {
        mainContent.innerHTML += `
            <div id="card" class="card">
                <div class="card-author">${obj.author}</div>
                <div class="card-title">${obj.title}</div>
                <div class="card-pages">${obj.pages}</div>
                <div class="card-read">
                    <div id="card-read-txt" class="card-read-txt">${obj.read == "true" ? "already read": "not read yet"}</div>
                    <button id="card-btnRead" class="card-btnRead" data-id="${obj.index}">READ</button>
                </div>
                <button id="card-btnRemove" class="card-btnRemove" data-id="${obj.index}">REMOVE</button>
            </div>
            `
    });

     let btnReadList = document.querySelectorAll("#card-btnRead"); // get list of all read buttons
     let btnRemoveList = document.querySelectorAll("#card-btnRemove"); // get a list of all remove buttons

     btnRemoveList.forEach( (btn) => {
         btn.addEventListener("click", () => {
             removeBookFromLibrary(btn);
         });
     })
          
     btnReadList.forEach( (btn) => {
         btn.addEventListener("click", () => {
             readBook(btn);
         })
     })
}

function addBookToLibrary(obj) {
    console.log("function addBookToLibrary()");
    myLibrary.push(obj);
    // get the last (newest) object in the array
    let element = myLibrary[myLibrary.length-1];
    //console.log(element.info());
    drawMainContent(); // call function to rerender everything
}

function removeBookFromLibrary(btn) {
    console.log("function removeBookFromLibrary()");
     // 1. remove with index element from array
    //console. log(btn.getAttribute('data-id'));
    let index = btn.getAttribute('data-id');
    myLibrary.splice(index, 1);

    // If one obj of array is removed, every object needs a new index (=data-id)
    // so first object has always data-id 0 and from there every object + 1
    let newIndex = 0;
    myLibrary.forEach( (obj) => {
        obj.index= newIndex; // iterate over array of objects and update index
        newIndex++;
    })
    drawMainContent();
}

function readBook(obj) {
    // using attribute data-id (=index of array  myLibrary) of obj button
    // tzo get the card where btn was pressed
    console.log("function readBook()");
    console.log(obj);
    let index = obj.getAttribute('data-id');
    let card = myLibrary[index];
    console.log(card.read);
    // change attribute to read = true if false...
    if(card.read === "true") card.read = "false";
    else card.read = "true";
    console.log(card.read);
    // rerender cards
     // 2. rerender array...element won't show up
    drawMainContent();
}

btnAdd.addEventListener("click", (e) => {
    console.log("btnAdd EventListener click");
    getData(e);
});

btnNewBook.addEventListener("click", () => {
    console.log("btnNewBook EventListener click");
    openForm();
})

/* validate length of input for pages, because maxlength won't works for number input*/
function validate_length() {
    //console.log("validate_input()")
    let length_input = inputPages.value.length;
    let max_length = inputPages.maxLength;
    console.log(inputPages.maxLength)
    if(length_input > max_length) {
        let trimmedNumbers = inputPages.value.slice(0, max_length); 
        inputPages.value = trimmedNumbers
    }
    /* <input name="somename"
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    type = "number"
    maxlength = "6" */
}

