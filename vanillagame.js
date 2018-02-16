//global//

var wordBank = ['mounteverest', 'victoriafalls', 'grandcanyon', 'greatbarriereef', 'northernlights', 'paricutinvolcano', 'harborofiodejaneiro'];

var wins = 0;
var loss = 0;
var wrongLetter = [];
var guessesLeft = 9;
var underScores = [];
var userGuesses = [];
var randomWord;

//functions//

function startHangman(){
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    for(var i = 0; i < randomWord.length; i++){
        uncerScores.push('_');
    }
    document.getElementById('word-blanks').textContent = underScores;

    wrongLetter = [];
    guessesLeft = 10;

    document.getElementById('guesses-left').textContent = guessesLeft;

}
document.onkeyup = function(event){
    userGuesses = event.key;
    if (randWord.indexOf(userGuesses) > -1){
        for(var i = 0; i < randWord.length; i++)
    }
    else {
        wrongLetter.push(userGuesses);
        guessesLeft--;
        

    }
}

startGame();