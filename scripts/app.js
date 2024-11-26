// https://evaluationmmadlib-asfqhkgke2e5hxf9.westus-01.azurewebsites.net/RandomWord/GetRandomWord

// Get a random word
// Get the length of the word and display underlines repressenting each letter
// Keep track of Correct letters
// Keep track of the incorrect letters
// Keep track of the user's guesses

//Id Section

let wordToGuess = document.getElementById("wordToGuess");
let hangMan = document.getElementById("hangMan");
let wrongGuesses = document.getElementById("wrongGuesses");
let userInput = document.getElementById("userInput");
let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

// Variable Section

let randomWord = ""; // store secret word
let wrongGuess = ""; // store all the incorrect guesses
let displayedWord = []; // track correct guesses as underscores or letters
let guesses = 0; // track number of guesses
const maxGuesses = 5; // maximum guesses allowed

startBtn.addEventListener("click", function () {
    apiCall(); //Get our random word and start our game
});

restartBtn.addEventListener("click", function () {
    restartGame();
});

function apiCall() {
    // Initializing our fetch from our endpoint
    fetch(
        "https://evaluationmmadlib-asfqhkgke2e5hxf9.westus-01.azurewebsites.net/RandomWord/GetRandomWord"
    )
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data.word);
            startGame(data.word);
        });
}

function startGame(word) {
    randomWord = word;

    for (let i = 0; i < randomWord.length; i++) {
        displayedWord[i] = "_";
    }
    userInput.readOnly = false;
    updateGameState();
}

function updateGameState() {
    wordToGuess.innerText = displayedWord.join("");
    hangMan.innerText = `Guesses left ${guesses} / ${maxGuesses}`;
    userInput.value = "";
}

function restartGame() {
    randomWord = "";
    wrongGuess = "";
    displayedWord = [];
    guesses = 0;
    wrongGuesses.innerText = "Wrong guesses will appear here";
    wordToGuess.innerText = "[Secret Word]";
    hangMan.innerText = "Guess Left";
    userInput.readOnly = true;
    userInput.value = "";
}

userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        let guess = userInput.value.toLowerCase();

        if (randomWord.includes(guess)) {
            for (let i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === guess) {
                    displayedWord[i] = guess;
                }
            }
        } else {
            wrongGuess += guess;
            guesses++;
            wrongGuesses.innerText = wrongGuess;
        }

        updateGameState();
        gameEnd();
    }
});

function gameEnd() {

    if (guesses === maxGuesses) {
        alert(`You lose! Haha, your word was ${randomWord}`);
        restartGame();
    } else if (randomWord === displayedWord.join(""))
        alert(`Yay! You won! You guessed the word ${randomWord}`);
        restartGame();
}
