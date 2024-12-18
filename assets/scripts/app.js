const backdrop = document.querySelector("#backdrop");
const addModal = document.querySelector("#add-modal");
const startBtn = document.querySelector("#add-movie");
const cancelAddMovieBtn = addModal.querySelector(".btn--passive");
const addMovieBtn = addModal.querySelector(".btn--success");

const entryText = document.querySelector("#entry-text");
const userInputs = addModal.querySelectorAll("input");
const movies = [];
const movieList = document.querySelector("#movie-list");

const deleteModal = document.querySelector("#delete-modal");
const cancelDeleteMovieBtn = deleteModal.querySelector(".btn--passive");
const yesDeleteMovieBtn = deleteModal.querySelector(".btn--danger");

let currentMovieId;


movieList.classList.add("card");

function updateUI() {
    if (movies.length === 0) {
        entryText.style.display = "block";
    } else {
        entryText.style.display = "none";
    }
}

function deleteMovieHandler(movieId) {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movieId === movie.id) {
            break;
        }
        movieIndex++;
    }
        movies.splice(movieIndex, 1);
        movieList.children[movieIndex].remove();
}

function startDeleteMovieHandler(movieId) {
    currentMovieId = movieId;
    backdropToggle();
    deleteModal.classList.toggle("visible");
    deleteMovieHandler.bind(null, movieId);
}

function deleteModalHandler() {
    backdropToggle();
    deleteModal.classList.toggle("visible");
}

function cancelDeleteMovie () {
    backdropToggle();
    deleteModal.classList.toggle("visible");
}

function renderNewMovie (id, title, image, rating) {
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
    renderMovieInfo.addEventListener("click", startDeleteMovieHandler.bind(null, id));
}

function backdropToggle () {
    backdrop.classList.toggle("visible");
}
function addMovieModalHandler () {
    addModal.classList.toggle("visible");
    backdropToggle();
}

function backdropHandler() {
    addModal.classList.remove("visible");
    backdropToggle();
    deleteModal.classList.remove("visible");
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
        id: Math.random().toString(),
        Title: titleInput,
        Image: imageInput,
        Rating: ratingInput
    };

    movies.push(movieInfo);
    console.log(movies);
    addMovieModalHandler();
    clearMovieInputs();
    updateUI();
    renderNewMovie(movieInfo.id, movieInfo.Title, movieInfo.Image, movieInfo.Rating);
} 

startBtn.addEventListener("click", addMovieModalHandler);

backdrop.addEventListener("click", backdropHandler);

cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);

addMovieBtn.addEventListener("click", addMovieHandler);

cancelDeleteMovieBtn.addEventListener("click", cancelDeleteMovie);

yesDeleteMovieBtn.addEventListener("click", () => {
    deleteMovieHandler(currentMovieId);
    deleteModalHandler();
});