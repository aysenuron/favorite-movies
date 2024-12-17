const backdrop = document.querySelector("#backdrop");
const addModal = document.querySelector("#add-modal");
const startBtn = document.querySelector("#add-movie");
const cancelAddMovieBtn = addModal.querySelector(".btn--passive");
const addMovieBtn = addModal.querySelector(".btn--success");

const entryText = document.querySelector("#entry-text");
const userInputs = addModal.querySelectorAll("input");
const movies = [];
const movieList = document.querySelector("#movie-list");

movieList.classList.add("card");

function updateUI() {
    if (movies.length === 0) {
        entryText.style.display = "block";
    } else {
        entryText.style.display = "none";
    }
}

function renderNewMovie (title, image, rating) {
    const renderMovieInfo = document.createElement("li");
    renderMovieInfo.classList.add("movie-element")
    renderMovieInfo.innerHTML = `<div class="movie-element__image">
    <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating} / 5 starts</p>
    </div> `;

   movieList.appendChild(renderMovieInfo);
}

function backdropToggle () {
    backdrop.classList.toggle("visible");
}
function addMovieModalHandler () {
    addModal.classList.toggle("visible");
    backdropToggle();
}

function backdropHandler() {
    addMovieModalHandler();
}

function cancelAddMovieHandler() {
    clearMovieInputs();
    addMovieModalHandler();
}

function clearMovieInputs() {
    for (const input of userInputs) {
        input.value = "";
    };
}

function addMovieHandler () {
    const titleInput = userInputs[0].value;
    const imageInput = userInputs[1].value;
    const ratingInput = userInputs[2].value;

    if (titleInput.trim() === "" ||
        imageInput.trim() === "" ||
        ratingInput.trim() === "" ||
        +ratingInput < 1 || +ratingInput > 5
) {
    alert("Please enter valid input. Rating between 1-5.");
    return;
}

    const movieInfo = {
        Title: titleInput,
        Image: imageInput,
        Rating: ratingInput
    };

    movies.push(movieInfo);
    console.log(movies);
    addMovieModalHandler();
    clearMovieInputs();
    updateUI();
    renderNewMovie(titleInput, imageInput, ratingInput);
} 

startBtn.addEventListener("click", addMovieModalHandler);

backdrop.addEventListener("click", backdropHandler);

cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);

addMovieBtn.addEventListener("click", addMovieHandler);