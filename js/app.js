/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
			  'fa-paper-plane-o', 'fa-paper-plane-o',
			  'fa-anchor', 'fa-anchor',
			  'fa-bolt', 'fa-bolt',
			  'fa-cube', 'fa-cube',
			  'fa-leaf', 'fa-leaf',
			  'fa-bicycle', 'fa-bicycle',
			  'fa-bomb', 'fa-bomb',
			  ];
// game number of moves
let moves, movesCounter, totalPairs;
// game timer
let second = 0, minute = 0;
const timer = document.querySelector(".timer");
// congradulation modal
let modal = document.querySelector(".modal");
let closeicon = document.querySelector(".close-button");
// staring variables 
let stars = document.querySelectorAll(".stars li");
let starRate = 3;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/**
* @description start a timer when first move is done 
*/
// TODO: add a timer for the game
function startTimer() {
    interval = setInterval(function() {
    timer.innerHTML = minute+" Mins "+ second+" Secs";
    second ++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        if(minute == 60) {
            hour++;
            minute = 0;
        }
    },1000);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/**
* @description Generate each card programaticly for the game
* @param {string} card - the class of the icon card
* @returns {string} html card template
*/
// TODO: add every card to the game programaticly
function generateCard(card) {

	return `<li class="card"><i class="fa ${card}"></i></li>`;

}
/**
* @description Count Moves of the play , start the game time , and specify the stars for the game
*/
// TODO: Count moves of the player to specify the star rating 
function countMoves() {

	moves += 1;
	movesCounter.innerHTML = moves;

	//start timer with first move  
	if(moves == 1) {
	second = 0;
	minute = 0; 
	hour = 0;
	startTimer();
	}
} 
/**
* @description Initialize the Memory Game 
*/
// TODO: initialize variables of the game 
function initMemoryGame() {

	let deck = document.querySelector('.deck');
	movesCounter = document.querySelector('.moves');
	let cardHtml = cards.map(function(card){
		return generateCard(card);
	});

	moves = 0;
	totalPairs = 0;
	movesCounter.innerHTML = moves;
	// TODO: shuffle all cards depending on their icon classes
	deck.innerHTML = shuffle(cardHtml).join('');

	/* grap all cards */
	const allCards = document.querySelectorAll('.card');
	let openCards = [];

	// reset star rating
    for (let i= 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
		
	allCards.forEach(function(card) {

		card.addEventListener('click', function (e) {

			if(!card.classList.contains('match') && !card.classList.contains('open') && !card.classList.contains('show')){
					openCards.push(card);
					card.classList.add('open', 'show');					
					if(openCards.length == 2){

						//compare the two cards if they are match
						if(openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){

							openCards[0].className = "card match";
							openCards[1].className = "card match";
							totalPairs += 1;
							openCards=[];

						}
						//hide the two cards if they don't match
						else {

							setTimeout(function() {

								openCards.forEach(function(card){

								card.classList.remove('open', 'show');

							    });

							    openCards=[];

							}, 1000);
							countMoves();
					     }
					}			

				}//end if clicked card is not match or open or shown			
		});//end listner
	});//end card looping
}

/**
* @description Starts the Memory Game
*/
// TODO: Start the game
function startGame() {

	initMemoryGame();
}

window.onload = startGame();