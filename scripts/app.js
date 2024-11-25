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

let randomWord = "";  // store secret word
let wrongGuess = "";  // store all the incorrect guesses
let displayedWord = [];  // track correct guesses as underscores or letters
let guesses = 0; // track number of guesses
const maxGuesses = 5; // maximum guesses allowed

startBtn.addEventListener("click", function (){
    apiCall(); //Get our random word and start our game
});

restartBtn.addEventListener("click", function (){
    restartGame();
});

function apiCall(){
    // Initializing our fetch from our endpoint
    fetch("https://evaluationmmadlib-asfqhkgke2e5hxf9.westus-01.azurewebsites.net/RandomWord/GetRandomWord")
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        console.log(data.word);
        startGame(data.word);        
    })
};

function startGame(word){
    randomWord = word;

    for(let i = 0; i < randomWord.length; i++){
        displayedWord[i] = "_";
    }
    userInput.readOnly = false;
    updateGameState();
};

function updateGameState(){
    wordToGuess.textContent = displayedWord.join("");
    hangMan.textContent = `Guesses left ${guesses} / ${maxGuesses}`
    userInput.value = "";
};