//set up global variables

//page conditionals
if(window.location.pathname == "/project/index.html" || window.location.pathname == "/project/") {
    getDeckLists("display");
} else if (window.location.pathname == "/project/deckList.html") {
    getDeckLists("list")
} else if (window.loacation.pathname == "/project/deckAdded.html") {
    displayAddedDeck();
}
//functions

// Load in the data
async function getDeckLists(action) {
    let response = await fetch("https://hieusstorm.github.io/wdd231/project/data/decks.json");
    let data = await response.json();
    if (action == "display") {
        displayDecks(data.decks);
    } else if (action == "list") {
        displayDeckList(data.decks);
    }
}

//add in deck list tiles
function displayDecks(decks) {
    const gridArea = document.querySelector(".grid");
    decks.forEach(deck => {
        const tile = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h3");
        const format = document.createElement("p");
        const archetype = document.createElement("p");

        tile.classList.add("tile");
        tile.addEventListener("click", ()=> window.location.href = `deckList.html?deck=${deck.id}`);

        img.setAttribute("src", deck.photo);
        img.setAttribute("alt", deck.name);
        img.setAttribute("loading", "lazy");

        title.innerHTML = deck.name;
        format.innerHTML = `Format: ${deck.format}`;
        archetype.innerHTML = `Archetype: ${deck.archetype}`;

        tile.append(img, title, format, archetype);
        gridArea.appendChild(tile);
    });
}

function displayDeckList(decks) {
    let deckId = Number(window.location.href.split("=")[1]);
    let deckList = decks[deckId];

    const main = document.querySelector("main");
    
    // create elements for the page
    const title = document.createElement("h2");
    const format = document.createElement("p");
    const img = document.createElement("img");
    const deckListHeading = document.createElement("h3");
    const list = document.createElement("ul");
    const strategyHeading = document.createElement("h3");
    const archetype = document.createElement("p");
    const strategy = document.createElement("p");

    // fill the elements
    title.innerHTML = deckList.name;
    format.innerHTML = `Format: ${deckList.format}`;

    img.setAttribute("src", deckList.photo);
    img.setAttribute("alt", `${deckList.name} photo`);
    img.setAttribute("loading", "lazy");

    deckListHeading.innerHTML = "Deck List";

    //create list items and place in list element
    let cards = deckList.list.split(",");
    cards.forEach(card => {
        const cardElement = document.createElement("li");
        cardElement.innerHTML = card;
        list.appendChild(cardElement);
    });

    strategyHeading.innerHTML = `${deckList.name} Strategy`;
    archetype.innerHTML = `Archetype: ${deckList.archetype}`;
    strategy.innerHTML = deckList.strategy;

    // add all the elements to the page
    main.append(title, format, img, deckListHeading, list, strategyHeading, archetype, strategy);
}

function displayAddedDeck() {
    const deckInfo = window.location.href.split("?")[1].split("&");
    const main = document.querySelector("main");
    
    //create the elements 
    const title = document.createElement("h2");
    const format = document.createElement("p");
    const deckListHeading = document.createElement("h3");
    const deckList = document.createElement("ul");
    const strategyHeading = document.createElement("h3");
    const archetype = document.createElement("p");
    const strategy = document.createElement("p");
    
    //fill up the elements
    title.innerHTML = deckInfo[0].split("=")[1];
    format.innerHTML = `Format: ${deckInfo[1].split("=")[1]}`;
    deckListHeading.innerHTML = `Deck List`;

    let deckCards = deckInfo[4].split("=")[1].split(",");
    deckCards.forEach(card => {
        const cardElement = document.createElement("li");
        cardElement.innerHTML = card;
        deckList.appendChild(cardElement);
    });
    
    strategyHeading.innerHTML = `Strategy`;
    archetype.innerHTML = `Archetype: ${deckInfo[2].split("=")[1]}`;
    strategy.innerHTML = deckInfo[3].split("=");
}