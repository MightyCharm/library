const btnNewBook = document.querySelector("#btnNewBook");
const btnAdd = document.querySelector("#btnAdd");

const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputPages = document.querySelector("#pages");

const radioButtons = document.querySelectorAll(".radio");
const radioFalse = document.querySelector("#radioFalse");

const header = document.querySelector("#box-1");
const boxForm = document.querySelector("#box-form");
const mainContent = document.querySelector("#box-3");

// class for managing the library
class Library {

    constructor() {
        this.myLibrary = [];
        this.checksPassed = false; // only if true, sidebar moves
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
        console.log(`inputAuthor.value: ${inputAuthor.value}`)
        // if user input is correct, create Book object and add it to array
        if ((inputAuthor.value.length > 0) && (inputTitle.value.length > 0) && (inputPages.value.length > 0) && (Number(inputPages.value) > 0) && Number(inputPages.value[0] != 0)) {
            //e.preventDefault()
            let obj = new Book(inputAuthor.value, inputTitle.value, inputPages.value, radioVal);  // create new object
            this.addBookToLibrary(obj); // call function to push new object into an array        
            radioFalse.checked = true;
            this.checksPassed = true;

        } else {
            // if user input wasn't correct
            gui.resetColors();
            if (inputTitle.value.length === 0) {
                inputTitle.classList.add("errorInput");
            }
            if (inputAuthor.value.length === 0) {
                inputAuthor.classList.add("errorInput");
            }

            if (inputPages.value.length === 0 || Number(pages.value) <= 0 || Number(pages.value[0]) === 0) {
                inputPages.classList.add("errorInput");
            }
            /* should check if nothing was added at all, so maybe user don't want to add anything and just pressed the wrong button */
            if (inputAuthor.value.length === 0 &&
                inputTitle.value.length === 0 &&
                inputPages.value.length === 0) {

                radioFalse.checked = true;
            }
        }
        e.preventDefault();
    }

    addBookToLibrary(obj) {
        this.myLibrary.push(obj);
        gui.drawMainContent(); // call function to rerender everything
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
        gui.drawMainContent();
    }

    readBook(obj) {
        // using attribute data-id(=index of array myLibrary) of obj button to get the card where btn was pressed
        let index = obj.getAttribute('data-id');
        let card = this.myLibrary[index];
        // change attribute read
        if (card.read === "true") card.read = "false";
        else card.read = "true";
        gui.drawMainContent();  // rerender cards
    }
}

class GUI {

    constructor() {
        this.amount; // used for moving sidebar
        this.speed = 2.5;
        this.sidebarVisible = true;
        this.sidebarVisible = true;

        btnNewBook.disabled = true;
        this.setPositionSidebar();
    }

    setPositionSidebar = () => {
        // sidebar positioning height
        const refHeight = header.offsetHeight;
        const targetTop = header.offsetTop + refHeight;
        boxForm.style.top = `${targetTop}px`;
        // sidebar positioning height

        //this.start_position = boxForm.getBoundingClientRect().right;

        let width = boxForm.getBoundingClientRect().width;
        let posRight = boxForm.getBoundingClientRect().right;
        //console.log(`width: ${width} posRight: ${posRight}`);
        if (this.sidebarVisible === false) {
            console.log("sidebar not visible, resize window, update position sidebar");
            let widthSidebar = boxForm.getBoundingClientRect().width;
            //console.log(`widthSidebar: ${widthSidebar}`);
            boxForm.style.left = -widthSidebar + "px";

        }
    }

    moveSidebar() {
        if (library.checksPassed === true) {
            // if position right is equal to width, sidebar is visible on the page, so it should move out
            if (this.sidebarVisible) {
                console.log("move that boi out of my sight!");

                let subtract = 0;
                let widthSidebar = boxForm.getBoundingClientRect().width;
                const moveSidebarOut = setInterval(() => {
                    // check position using "boxForm.style.left"
                    // value must be the same as width of element but negative
                    // boxForm.style.left = -300px  width element = 300px => sidebar is not visible anymore
                    console.log(`subtract: ${subtract}  - widthSidebar: ${-widthSidebar}`);
                    if (subtract <= - widthSidebar) {
                        // set subtract equal to width of the sidebar to place boxForm exactly
                        // at the border of the page after interval has finished
                        subtract = - widthSidebar;
                        boxForm.style.left = subtract + "px";
                        btnNewBook.disabled = false;
                        this.sidebarVisible = false;

                        //console.log(`moveSidebarOut done: ${boxForm.style.left} widthSidebar: ${-widthSidebar} (should be same values)`);
                        clearInterval(moveSidebarOut);

                    }
                    subtract -= this.speed;
                    boxForm.style.left = subtract + "px";

                }, 1)


            }
            else {
                // width sidebar changes if window gets bigger/smaller
                // boxForm.style.left stays the same
                this.setPositionSidebar();

                let widthSidebar = boxForm.getBoundingClientRect().width;
                let posRight = boxForm.getBoundingClientRect().right;
                console.log("move that boi out, I can't see him!");
                console.log(`boxForm.style.left: ${boxForm.style.left} widthSidebar: ${widthSidebar}  posRight: ${posRight}`);

                let startVal = parseInt(boxForm.style.left);
                const moveSidebarIn = setInterval(() => {
                    startVal += this.speed;
                    if (startVal >= 0) {
                        console.log("done");
                        console.log(`startVal: ${startVal}`);
                        this.sidebarVisible = true;
                        startVal = 0;
                        boxForm.style.left = startVal + "px",
                        clearInterval(moveSidebarIn);
                        
                    }
                    console.log(startVal);
                   
                    boxForm.style.left = startVal + "px";
                }, 1)

            }


        }

    }

    drawMainContent() {
        mainContent.innerHTML = "";
        library.myLibrary.forEach((obj) => {
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
                library.removeBookFromLibrary(btn);
            });
        })

        btnReadList.forEach((btn) => {
            btn.addEventListener("click", () => {
                library.readBook(btn);
            })
        })
    }

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
        inputTitle.classList.remove("errorInput");
        inputAuthor.classList.remove("errorInput");
        inputPages.classList.remove("errorInput");

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

// create object for managing the library and gui
const library = new Library();
const gui = new GUI();

btnAdd.addEventListener("click", (e) => {
    library.getData(e);
    gui.moveSidebar();

});

btnNewBook.addEventListener("click", () => {
    gui.moveSidebar();
});


window.onresize = function () {
    if (!gui.sidebarVisible) {
        gui.setPositionSidebar();
    }
}

boxForm.style.left = "0px";

