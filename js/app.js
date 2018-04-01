/*
 * Create a list that holds all of your cards
 */
const cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const deck = document.querySelector('ul.deck');
const restartButton = document.querySelector('.restart');
const insertMoves = document.querySelector('.moves');
let openCards = [];
let moves = 0;
let stars = document.querySelector('ul.stars');
restartButton.addEventListener('click', restart);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// create one card
function createCard(cardList) {
	const card = document.createElement('li');
	card.className = "card";
	const icon = document.createElement('i');
	icon.className = "fa " + cardList;
	card.appendChild(icon);
	deck.appendChild(card);
	card.addEventListener('click', openCard);	
;}

// generate cards in DOM
function generateCards() {
	shuffle(cardList.concat(cardList)).forEach(createCard);
}

// flip the card on click
function openCard(evt) {	
	displaySymbol(evt);
	pushCardsList(evt);	
	if (openCards.length > 1 && openCards[0] === openCards[1]){		
		cardsLock(evt);
		moveCounter();
	} else if (openCards.length > 1 && openCards[0] !== openCards[1]) {
		setTimeout(cardsReset, 800);
		moveCounter();
	}
}

// open card symbol
function displaySymbol(evt){
	evt.target.className = "card open show";
}

// push to card list
function pushCardsList(evt) {
	openCards.push(evt.target.firstChild.className);	
}

// lock the cards
function cardsLock() {		
	openCards.pop();
	openCards.pop();
	let match = document.getElementsByClassName('card open show');
	match[0].className = "card match";
	match[0].className = "card match";

	let final = document.getElementsByClassName('card match');
	if (final.length === 16) {
		finalScore();
	}
}

// reset the cards if they don't match
function cardsReset() {	
	openCards.pop();
	openCards.pop();
	let reset = document.getElementsByClassName('card open show');	
	reset[0].className = "card";
	reset[0].className = "card";
}

// displays final score
function finalScore() {
	console.log('uspio si');
	ratingStars();
}

// when restart button is pressed
function restart() {
	let deleteList = document.querySelectorAll('.card');	
	for(let i = 0; i < deleteList.length; i++) {	
		deleteList[i].remove();
	}
	generateCards();
	moves = 0;
	insertMoves.textContent = '';
}

// move counter
function moveCounter() {
	moves++;	
	insertMoves.textContent = moves;
	ratingStars();
} 

// game rating
function ratingStars() {	
	if (moves > 2) {	
		let lastStar = stars.children[1].querySelector('.fa');
		lastStar.className = "fa fa-star-o";
	} else if (moves > 1) {	
		let lastStar = stars.children[2].querySelector('.fa');
		lastStar.className = "fa fa-star-o";
	} 
}

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

// function init
function init(){
    generateCards();
}

// on DOM content load initialize functions
document.addEventListener("DOMContentLoaded", function(event) {
    init();
});	


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
