/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for (let i = 0; i < games.length; i++) {
        
        const gameCard = document.createElement("div");

        
        gameCard.classList.add("game-card");

        
        gameCard.innerHTML = `
            <h3>${games[i].name}</h3>
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img" />
            <p><strong>Description:</strong> ${games[i].description}</p>
            <p><strong>Pledged:</strong> $${games[i].pledged}</p>
            <p><strong>Goal:</strong> $${games[i].goal}</p>
            <p><strong>Backers:</strong>${games[i].backers}</p>
        `;

        
        gamesContainer.appendChild(gameCard);
    }
}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((sum, games) => sum + games.backers, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;
const raisedCard = document.getElementById("total-raised");
const totalAmountRaised = GAMES_JSON.reduce((sum, games) => sum + games.pledged, 0);

raisedCard.innerHTML = `$${totalAmountRaised.toLocaleString()}`;
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames} games`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(games => games.pledged < games.goal);
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(games => games.pledged >= games.goal);
    addGamesToPage(fundedGames);


}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);


}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click',filterFundedOnly);
fundedBtn.addEventListener('click',filterUnfundedOnly);
allBtn.addEventListener('click',showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/


const descriptionContainer = document.getElementById("description-container");
const unfundedGames = GAMES_JSON.filter(games=>games.pledged < games.goal);
const numberOfUnfundedGames = unfundedGames.length;

const totalAmountRaisedd = GAMES_JSON.reduce((sum, games) => sum + games.pledged, 0);

const unfundedGamesText = numberOfUnfundedGames === 1
    ? "1 game remains unfunded."
    : `${numberOfUnfundedGames} games remain unfunded.`;


const descriptionText = `A total of $${totalAmountRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. ${unfundedGamesText}`;


const descriptionElement = document.createElement("p");


descriptionElement.innerHTML = descriptionText;


descriptionContainer.appendChild(descriptionElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
    const [firstGame,secondGame] = [...sortedGames];

    const firstGameElement = document.createElement('p');
    const secondGameElement = document.createElement("p");

    firstGameElement.innerHTML = ` ${firstGame.name}`;
    secondGameElement.innerHTML = ` ${secondGame.name}`;

    firstGameContainer.appendChild(firstGameElement);
    secondGameContainer.appendChild(secondGameElement);


// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item