/*
 * Create a list that holds all of your cards
 */
const cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const deck = document.querySelector('ul.deck');
const popup = document.querySelector('div.popup');
const restartButton = document.querySelector('.restart');
const finishPara = document.createElement('p');
const congratsHeading = document.createElement('h2');
const finalRestart = document.createElement('button');
const insertMoves = document.querySelector('.moves');
const appendsec = document.getElementById("sec");
const appendmin = document.getElementById("min");
let openCards = [];
let moves = 0;
let min = 00;
let sec = 00;
let Interval;
let firstClick = false;
let starsNum = 3;
let stars = document.querySelector('ul.stars');
restartButton.addEventListener('click', restart);
finalRestart.addEventListener('click', restart);

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
	if(!firstClick){
		timerFirstClick();
	}
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
	evt.target.className = "card open show disabled";
}

// push to card list
function pushCardsList(evt) {
	openCards.push(evt.target.firstChild.className);
}

// lock the cards
function cardsLock() {
	openCards.pop();
	openCards.pop();
	let match = document.getElementsByClassName('card open show disabled');
	match[0].className = "card match disabled";
	match[0].className = "card match disabled";

	let final = document.getElementsByClassName('card match disabled');
	if (final.length === 16) {
		finalScore();
	}
}

// reset the cards if they don't match
function cardsReset() {
	openCards.pop();
	openCards.pop();
	let reset = document.getElementsByClassName('card open show disabled');
	reset[0].className = "card";
	reset[0].className = "card";
}

// displays final score
function finalScore() {
	clearInterval(Interval);
	deck.style.display = "none";
	popup.style.display = "flex";

	let clnStars = stars.cloneNode(true);
	popup.appendChild(clnStars);

	let congratsHeadingText = document.createTextNode('Congratulations! You won!');
	congratsHeading.appendChild(congratsHeadingText);
	popup.appendChild(congratsHeading);

	let textOfFinishParagraph = document.createTextNode('With ' + (moves + 1) + ' moves in ' + min + ':' + sec + 's, with ' + starsNum + ' stars! Woooo!');
	finishPara.appendChild(textOfFinishParagraph);
	popup.appendChild(finishPara);

	finalRestart.className = "final-restart";
	let finalRestartText = document.createTextNode('Play again!');
	finalRestart.appendChild(finalRestartText);
	popup.appendChild(finalRestart);
}

// when restart button is pressed
function restart() {
	let deleteList = document.querySelectorAll('.card');
	for(let i = 0; i < deleteList.length; i++) {
		deleteList[i].remove();
	}
	generateCards();

	if (moves > 15) {
		stars.children[1].querySelector('.fa').className = "fa fa-star";
		stars.children[2].querySelector('.fa').className = "fa fa-star";
	} else if (moves > 10) {
		stars.children[2].querySelector('.fa').className = "fa fa-star";
	}

	moves = 0;
	insertMoves.textContent = "";

	finishPara.textContent = "";
	congratsHeading.textContent = "";
	finalRestart.textContent = "";
	while (popup.firstChild) {
	    popup.removeChild(popup.firstChild);
	}

	firstClick = false;
	restartTimer();

	deck.style.display = "flex";
	popup.style.display = "none";
}

// move counter
function moveCounter() {
	moves++;
	insertMoves.textContent = moves;
	ratingStars();
}

// game rating
function ratingStars() {
	if (moves > 15) {
		let lastStar = stars.children[1].querySelector('.fa');
		lastStar.className = "fa fa-star-o";
		starsNum = 1;
	} else if (moves > 10) {
		let lastStar = stars.children[2].querySelector('.fa');
		lastStar.className = "fa fa-star-o";
		starsNum = 2;
	}
}

// check if card was clicked
function timerFirstClick() {
	firstClick = true;
	clearInterval(Interval);
	Interval = setInterval(startTimer, 1000);
}

// restart timer
function restartTimer() {
	clearInterval(Interval);
  sec = "00";
	min = "00";
  appendsec.innerHTML = sec;
	appendmin.innerHTML = min;
}

// timer main function
function startTimer () {
  sec++;

  if(sec < 9){
    appendsec.innerHTML = "0" + sec;
  }

  if (sec > 9){
    appendsec.innerHTML = sec;
  }

  if (sec > 59) {
    min++;
    appendmin.innerHTML = "0" + min;
    sec = 0;
    appendsec.innerHTML = "0" + 0;
  }

  if (min > 9){
    appendmin.innerHTML = min;
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
