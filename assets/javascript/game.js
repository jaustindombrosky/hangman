// This array holds the words we are going to choose from.
// Feel free to add new words!
var words = ['cat', 'tree', 'swing', 'around', 'scientist'];

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
        checkIndex = answer.indexOf(letter, checkIndex + 1);
    }
    return shown;
}

function resetGame () {
    resetUI();
    gameAnswer = chooseWord();
    gameShownAnswer = blanksFromAnswer(gameAnswer);
    hangmanState = 0;
    drawWord(gameShownAnswer);    
}
$(document).ready(resetGame);
function win () { alert('You win!');  resetGame() ;}
function lose () { alert('Oh no, you lose!'); resetGame(); }
function doKeypress () {
    var tempChar = $('#letter-input').val().toLowerCase();
    var tempString = "";
    $('#letter-input').val("");
    
    // Write here!
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
$('#letter-input').keyup( doKeypress );

function drawHead () {
    $('.draw-area').append( $('<div/>').addClass("body-part head") );
  }
  function drawTorso () {
    $('.draw-area').append(
        $('<div/>').addClass("body-part armbox").append(
            $('<div/>').addClass("body-part torso")));
    $('.draw-area').append(
        $('<div/>').addClass("body-part legbox").append(
            $('<div/>').addClass("body-part pelvis")));
  }
  function drawLeftArm () {
   $('.armbox').prepend( $('<div/>').addClass("body-part leftarm") );
  }
  function drawRightArm () {
   $('.armbox').prepend( $('<div/>').addClass("body-part rightarm") );   
  }
  function drawLeftLeg () {
   $('.legbox').prepend( $('<div/>').addClass("body-part leftleg") );   
  }
  function drawRightLeg() {
   $('.legbox').prepend( $('<div/>').addClass("body-part rightleg") );   
  }
  var drawSequence = [ drawHead,drawTorso,drawLeftArm,drawRightArm,drawLeftLeg,drawRightLeg ];
  function wrongLetter ( letter ) {
      $('#wrong-letters').append(
          $('<span/>').addClass('guessed-letter').text(letter));
  }
  function resetUI () {
      $('.body-part').remove();
      $('.guessed-letter').remove();
      $('.shown-letter').remove();
  }
  function drawWord( answer ) {
      for ( i in answer ) {
      $('.word-display').append(
          $('<span/>').addClass('shown-letter').html('&nbsp;'));
      }
  }
  function updateWord( answer ) {
      $k = $('.shown-letter:first');
      for ( i in answer ) {
      if ( answer.charAt(i) != '_' ) {
          $k.text( answer.charAt(i) );
      } else { 
          $k.html('&nbsp;');
      }
      $k = $k.next();
      }
  }