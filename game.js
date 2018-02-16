function resetGame () {
    resetUI();
    gameAnswer = chooseWord();
    gameShownAnswer = blanksFromAnswer(gameAnswer);
    hangmanState = 0;
    drawWord(gameShownAnswer);    
}
$(document).ready(resetGame);
function win () { alert('You win!');  resetGame() ;}
function lose () { alert('You lose!'); resetGame(); }
function doKeypress () {
    var tempChar = $('#letterinput').val().toLowerCase();
    var tempString = "";
    $('#letterinput').val("");
    

    tempString = guessLetter( tempChar, gameShownAnswer, gameAnswer );
    if ( tempString != gameShownAnswer ) {
        updateWord( tempString );
        gameShownAnswer = tempString;
        if ( gameShownAnswer === gameAnswer ) {
            win();
        }
    } else {
        wrongLetter(tempChar);
        drawSequence[ hangmanState++ ]();
        if ( hangmanState === drawSequence.length ) {
            lose();
        }
    }  
}
$('#letterinput').keyup( doKeypress );

//break global//


var words = ['mounteverest', 'victoriafalls', 'grandcanyon', 'greatbarriereef', 'northernlights', 'paricutinvolcano', 'harborofiodejaneiro'];

var areEqual = string1.toUpperCase() === string2.toUpperCase();

function chooseWord () {
    return words[Math.floor(Math.random() * words.length)];
}

function blanksFromAnswer ( answerWord ) {  
    var result = ""; 
    for ( i in answerWord ) {
        result = "_" + result;
    }
    return result;
}
function alterAt ( n, c, originalString ) {
    return originalString.substr(0,n) + c + originalString.substr(n+1,originalString.length);
}
function guessLetter( letter, shown, answer ) {
    var checkIndex = 0;
    
    checkIndex = answer.indexOf(letter);
    while ( checkIndex >= 0 ) {
        shown = alterAt( checkIndex, letter, shown );
        checkIndex = answer.indexOf(letter, checkIndex + 1)
    }
    return shown;
}
function wrongLetter ( letter ) {
    $('#wrongletters').append(
        $('<span/>').addClass('guessedletter').text(letter));
}
function resetUI () {
    $('.bodypart').remove();
    $('.guessedletter').remove();
    $('.shownletter').remove();
}
function drawWord( answer ) {
    for ( i in answer ) {
	$('.worddisplay').append(
	    $('<span/>').addClass('shownletter').html('&nbsp;'));
    }
}
function updateWord( answer ) {
    $k = $('.shownletter:first');
    for ( i in answer ) {
	if ( answer.charAt(i) != '_' ) {
	    $k.text( answer.charAt(i) );
	} else { 
	    $k.html('&nbsp;');
	}
	$k = $k.next();
    }
}