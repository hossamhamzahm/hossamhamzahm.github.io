/*
    Project Name     : Word Guess Game
    Author           : Xenon
    Idea             : Elzero Web School 
*/


//the letters
const letters = 'abcdefghijklmnopqrstuvwxyz'

// Get array from letters
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector('.letters');

// Generate the letters
lettersArray.forEach(letter => {
    // create span
    let span = document.createElement('span');

    // create letter text node
    let theLetter = document.createTextNode(letter);
    // append the text node to the span
    span.appendChild(theLetter);

    // append a class to the span
    span.classList = 'letter-box';


    span.addEventListener('click', function (){
        'use strict';

        // chan ge the color of the button then disable it
        span.style.backgroundColor = '#075049';
        span.style.pointerEvents = 'none';

        // check if the letter is right or wrong
        match(span.textContent.toUpperCase());
    });
    

    // appen the span to the letters container
    lettersContainer.appendChild(span);


});


// Object of words
const words = {
    // property: value
    programming: ['php', 'javascript', 'go', 'scala', 'fortan', 'r', 'mysql', 'python'],
    movies: ['prestige', 'inception', 'parasite', 'interstellar', 'whiplash', 'memento', 'coco', 'up'],
    people: ['Albert Einstein', 'hitchcock', 'alexander', 'cleopatra', 'mahatma ghandi'],
    countries: ['syria', 'palestine', 'yemen', 'egypt', 'bahrain', 'qatar']
}

// get a random property
let allKeys = Object.keys(words);

let randomPropertyNumber = Math.floor(Math.random() * allKeys.length);
let randomPropertyName = allKeys[randomPropertyNumber];
let randomPropertyValue = words[randomPropertyName];

// get a random property value
let randomValueNumber = Math.floor(Math.random() * words[randomPropertyName].length);
let randomValueValue = randomPropertyValue[randomValueNumber];


// Set category info
document.querySelector('.game-info .category span').innerHTML = randomPropertyName;





// select the letters quess div
let guess = document.querySelector('.letters-guess');





// Count the number of letters
var lettersCount = 0;
var countedLetters = [];
for(var letter of randomValueValue){
    if(letter === ' ') continue;
    if(countedLetters.includes(letter)) continue;
    else{
        lettersCount++; 
        countedLetters.push(letter);
    }
}




// inatialize the number of trials
var trials = 8;




// create a loop for the sake of creating spans
for(let letter of randomValueValue){

    // create a span node
    var guessSpan = document.createElement('span');
    guessSpan.setAttribute('value', letter);

    // create and append a text node
    guessSpan.appendChild(document.createTextNode('__'));


    // if the letter is a spcae
    if(letter === ' '){
        // add class to the span
        guessSpan.className = 'has-space';
        guessSpan.innerHTML = '';
    }

    // append the span to the guess-letter
    guess.appendChild(guessSpan);
}



// get an array with all the hidden parts
var hiddenParts = document.querySelectorAll('.hangman-draw div');



// creating a loop var called i
var i = 0;


// select the sound
var success = document.getElementById('success');
var fail = document.getElementById('fail');


// check if the clicked letter is right or wrong
function match(letter){
    "use strict";

    // making a flag for the wrong click
    var right = false;

    // loop on the spans of the quess
    for(let span of guess.querySelectorAll('span')){

        // change the under score to the letter
        if(letter === span.getAttribute('value').toUpperCase()){
            span.textContent = letter;
            right = true
        }
    }




    // checking if the click is wrong
    if(!right){
        // decrement the trials lefted
        trials--;

        fail.play();

        // showing a part of the man
        if(i === 4) i++;

        hiddenParts[i].classList.remove('hide');
        // console.log(hiddenParts[i].classList);
        i++;
    }
    else{
        success.play();
        lettersCount--;

    }

    if(trials === 0){

        // create a new div
        let failDiv = document.createElement('div');

        // add a class to it 
        failDiv.className = 'game-over';

        // create text and span
        failDiv.innerHTML = `Game Over :( <br> <span>the word is ${randomValueValue}</span>`;


        // make two buttons, one for playing again and another for leaving
        let replay = document.createElement('button');
        replay.appendChild(document.createTextNode('Replay'));
        replay.onclick = () => location.reload();

        let exit = document.createElement('button');
        exit.className = 'exit-button';
        exit.appendChild(document.createTextNode('Exit'));
        exit.onclick = () => window.close();

        // append the buttons
        failDiv.appendChild(replay);
        failDiv.appendChild(exit);


        // append the div to the body
        document.body.appendChild(failDiv);


        // disable the whole body
        document.body.style.pointerEvents = 'none';
        replay.style.pointerEvents = 'auto';
        exit.style.pointerEvents = 'auto';

    }


    if(lettersCount === 0){

        // create a new div
        let failDiv = document.createElement('div');

        // add a class to it 
        failDiv.className = 'gg';

        // create text and span
        failDiv.innerHTML = `Good Job :) <br> <span>you are right! The word is ${randomValueValue}</span>`;



        // make two buttons, one for playing again and another for leaving
        let replay = document.createElement('button');
        replay.appendChild(document.createTextNode('Replay'));
        replay.onclick = () => location.reload();

        let exit = document.createElement('button');
        exit.className = 'exit-button';
        exit.appendChild(document.createTextNode('Exit'));
        exit.onclick = () => window.close();

        // append the buttons
        failDiv.appendChild(replay);
        failDiv.appendChild(exit);



        // append the div to the body
        document.body.appendChild(failDiv);


        // disable the whole body
        document.body.style.pointerEvents = 'none';
        replay.style.pointerEvents = 'auto';
        exit.style.pointerEvents = 'auto';


    }


    // select the trials div
    let trialsDiv = document.querySelector('.trials');

    // change the remaining trials 
    trialsDiv.innerHTML = `Number of Trials Left: <span>${trials}</span>`;


}


