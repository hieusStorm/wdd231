//things that run on every page
const navButton = document.getElementById("navButton");
navButton.addEventListener("click", ()=> {
    document.querySelector("nav").classList.toggle("open");
});

//page conditionals
if(window.location.pathname == "/project/index.html" || window.location.pathname == "/project/") {
    getDeckLists("display");
    document.getElementById("lastViewed").addEventListener("click", () => displayLastViewedList());
} else if (window.location.pathname == "/project/deckList.html") {
    getDeckLists("list");
} else if (window.location.pathname == "/project/deckAdded.html") {
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

//Get card data
async function useScryfallAPI(card) {
    let cardParts = card.split(" ");
    cardName = cardParts.filter((part) => {
        return isNaN(part);
    }).join("+");

    let searchURL = `https://api.scryfall.com/cards/search?q=${cardName}`;
    try {
        let response = await fetch(searchURL);
        let data = await response.json();
        displayCardImage(data.data[0]);
    } catch (error) {
        console.error(error);
    }

}

//display data
function displayCardImage(card) {
    const dialog = document.querySelector("dialog");
    
    //clear the dialog box of children elements
    while (dialog.hasChildNodes()) {
        dialog.removeChild(dialog.firstChild);
    }

    //make dialog element children
    const cardImage = document.createElement("img");
    const closeButton = document.createElement("button");

    //populate the elements
    cardImage.setAttribute("src", card.image_uris.normal);
    cardImage.setAttribute("alt", card.oracle_text);
    cardImage.setAttribute("loading", "lazy");

    closeButton.innerText = "X";
    closeButton.addEventListener("click", ()=> {
        dialog.close();
    });

    dialog.append(cardImage, closeButton);
    dialog.showModal();
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

    //add list to localstorage
    window.localStorage.setItem("deckId", deckId);

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
    const cardModal = document.createElement("dialog");

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
        cardElement.addEventListener("click", () => useScryfallAPI(card));
        list.appendChild(cardElement);
    });

    strategyHeading.innerHTML = `${deckList.name} Strategy`;
    archetype.innerHTML = `Archetype: ${deckList.archetype}`;
    strategy.innerHTML = deckList.strategy;

    // add all the elements to the page
    main.append(title, format, img, deckListHeading, list, strategyHeading, archetype, strategy, cardModal);
}

//load the recently added deck
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
    const cardModal = document.createElement("dialog");
    
    //fill up the elements
    title.innerHTML = deckInfo[0].split("=")[1];
    format.innerHTML = `Format: ${deckInfo[1].split("=")[1]}`;
    deckListHeading.innerHTML = `Deck List`;

    let deckCards = deckInfo[4].split("=")[1].split("%2C");
    deckCards.forEach(card => {
        const cardElement = document.createElement("li");
        cardElement.innerHTML = card.replaceAll("+", " ");
        deckList.appendChild(cardElement);
    });
    
    strategyHeading.innerHTML = `Strategy`;
    archetype.innerHTML = `Archetype: ${deckInfo[2].split("=")[1]}`;
    strategy.innerHTML = `Strategy: ${deckInfo[3].split("=")[1].replaceAll("+", " ")}`;

    //add elements to the page
    main.append(title, format, deckListHeading, deckList, strategyHeading, archetype, strategy, cardModal);
}

function displayLastViewedList() {
    lastViewedId = window.localStorage.getItem("deckId");
    window.location.href = `deckList.html?deck=${lastViewedId}`;
}