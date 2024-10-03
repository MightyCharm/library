const btnNewBook = document.querySelector("#btnNewBook");
const btnAdd = document.querySelector("#btnAdd");
const boxForm = document.querySelector(".box-2");
const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputPages = document.querySelector("#pages");
const radioButtons = document.querySelectorAll(".radio");
const radioFalse = document.querySelector("#radioFalse");
const mainContent = document.querySelector("#box-3");


const bgNormal = "rgba(255, 255, 255, 1)"
const bgInvalid = "rgba(210, 210, 210, 1)";
boxForm.style.display = "none";

// class for managing the library
class Library {

    constructor() {
        this.myLibrary = [];
    }

    getLengthLibrary() {
        return this.myLibrary.length
    }


    getData(e) {
        let radioVal;
        radioButtons.forEach((btn) => {
            if (btn.checked === true) {
                radioVal = btn.value;
            }
        })
        // if user input is correct, create Book object and add it to array
        if ((author.value.length > 0) && (title.value.length > 0) && (pages.value.length > 0) && (Number(pages.value) > 0) && Number(pages.value[0] != 0)) {
            //e.preventDefault()
            let obj = new Book(author.value, title.value, pages.value, radioVal);  // create new object
            this.addBookToLibrary(obj); // call function to push new object into an array
            boxForm.style.display = "none"; // do not display box containing form
            btnNewBook.classList.remove("hidden"); // make button visible and active again 
            btnNewBook.disabled = false;
            radioFalse.checked = true;

        } else {
            // if user input wasn't correct
            gui.resetColors();
            if (author.value.length === 0) {
                inputAuthor.style.backgroundColor = bgInvalid;
            }
            else if (title.value.length === 0) {
                inputTitle.style.backgroundColor = bgInvalid;
            }
            else if (pages.value.length === 0 || Number(pages.value) <= 0 || Number(pages.value[0]) === 0) {
                inputPages.style.backgroundColor = bgInvalid;
            }
            /* should check if nothing was added at all, so maybe user don't want to add anything and just pressed the wrong button */
            if (author.value.length === 0 &&
                title.value.length === 0 &&
                pages.value.length === 0) {
                boxForm.style.display = "none"; // do not display box containing form
                btnNewBook.classList.remove("hidden"); // make button visible and active again
                btnNewBook.disabled = false;
                radioFalse.checked = true;
            }
        }
        e.preventDefault();
    }

    addBookToLibrary(obj) {
        this.myLibrary.push(obj);
        this.drawMainContent(); // call function to rerender everything
    }

    drawMainContent() {
        mainContent.innerHTML = "";
        this.myLibrary.forEach((obj) => {
            mainContent.innerHTML += `
                <div id="card" class="card">
                    <div class="card-author">${obj.author}</div>
                    <div class="card-title">${obj.title}</div>
                    <div class="card-pages">${obj.pages}</div>
                    <div class="card-read">
                        <div id="card-read-txt" class="card-read-txt">${obj.read == "true" ? "already read" : "not read yet"}</div>
                        <button id="card-btnRead" class="card-btnRead" data-id="${obj.index}">READ</button>
                    </div>
                    <button id="card-btnRemove" class="card-btnRemove" data-id="${obj.index}">REMOVE</button>
                </div>
                `
        });

        let btnReadList = document.querySelectorAll("#card-btnRead"); // get list of all read buttons
        let btnRemoveList = document.querySelectorAll("#card-btnRemove"); // get a list of all remove buttons

        btnRemoveList.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.removeBookFromLibrary(btn);
            });
        })

        btnReadList.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.readBook(btn);
            })
        })
    }

    removeBookFromLibrary(btn) {
        // remove an element from array using it's index
        let index = btn.getAttribute('data-id');
        this.myLibrary.splice(index, 1);

        // if one obj of array is removed, every object needs a new index(=data-id),
        // first object has always data-id=0 and from there every object + 1
        let newIndex = 0;
        this.myLibrary.forEach((obj) => {
            obj.index = newIndex; // iterate over array of objects and update the index
            newIndex++;
        })
        this.drawMainContent();
    }

    readBook(obj) {
        // using attribute data-id(=index of array myLibrary) of obj button to get the card where btn was pressed
        let index = obj.getAttribute('data-id');
        let card = this.myLibrary[index];
        // change attribute read
        if (card.read === "true") card.read = "false";
        else card.read = "true";
        this.drawMainContent();  // rerender cards
    }
}

// class for creating books
class Book {
    constructor(title, author, pages, read) {
        this.author = author,
            this.title = title,
            this.pages = pages,
            this.read = read,
            this.index = library.getLengthLibrary();
    }
}

class manageGUI {
    /* function validates length of input for pages, because maxLength won't work for number input like it does with strings */
    validate_length() {
        let length_input = inputPages.value.length;
        let max_length = inputPages.maxLength;
        if (length_input > max_length) {
            let trimmedNumbers = inputPages.value.slice(0, max_length);
            inputPages.value = trimmedNumbers
        }
    }

    resetColors() {
        inputAuthor.style.backgroundColor = bgNormal;
        inputTitle.style.backgroundColor = bgNormal;
        inputPages.style.backgroundColor = bgNormal;
    }

    resetInput() {
        inputAuthor.value = "";
        inputTitle.value = "";
        inputPages.value = "";
    }

    openForm() {
        boxForm.style.display = "block"; // display box containing form
        btnNewBook.disabled = true; // disable button as long form is open
        this.resetColors();
        this.resetInput();
    }
}

// create object for managing the library and gui
const library = new Library();
const gui = new manageGUI();

btnAdd.addEventListener("click", (e) => {
    library.getData(e);
});

btnNewBook.addEventListener("click", () => {
    gui.openForm();
})