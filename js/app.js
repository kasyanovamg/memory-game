/*
 * Create a list that holds all of your cards
 */
const card_deck = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube"
];
const deck = document.querySelectorAll(".card");
const card = document.querySelector(".card");
const restart = document.querySelector(".restart");
let open_cards = [];
let fliped = 0;
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

function createBoard() {
    fliped = 0;
    shuffle(card_deck);
    
    for (let i = 0; i < deck.length; i++) {
    deck[i].innerHTML = `<i class="fa ${card_deck[i]}"></i>`;
    }

    deck.forEach(function(card) {
        card.addEventListener("click", function () { 
            flipCard(card);
        });
    });
}

createBoard();

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

function flipCard(card) {
    if (open_cards.length < 2) {
        if (open_cards.length === 0) {
            card.classList.add("open");
            card.classList.add("show");
            open_cards.push(card);
        } else if (open_cards.length === 1) {
            card.classList.add("open");
            card.classList.add("show");
            open_cards.push(card);
            if (open_cards[0].firstChild.className === open_cards[1].firstChild.className) {
                open_cards[0].classList.add("match");
                open_cards[1].classList.add("match");
                fliped += 2;
                open_cards = [];
                if (fliped === card_deck.length) {
                    restart.insertAdjacentHTML("beforebegin", "<span class=\"won\">Play again. You won!</span>");
                    restart.addEventListener("click", function () { 
                        won();
                    });
                }
            } else {
                setTimeout(unflip, 700);
            }
        }
    }
}

function unflip() {
    open_cards[0].classList.remove("open");
    open_cards[1].classList.remove("open");
    open_cards[0].classList.remove("show");
    open_cards[1].classList.remove("show");
    open_cards = [];
}


function won() {
    deck.forEach(function(card) {
        card.classList.remove("match");
        card.classList.remove("open");
        card.classList.remove("show");
    });
    document.querySelector(".won").innerHTML = "";
    createBoard();
}

