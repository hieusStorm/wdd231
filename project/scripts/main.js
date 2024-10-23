//set up global variables

// Load in the data
async function getDeckLists() {
    let response = await fetch("https://hieusstorm.github.io/wdd231/project/data/decks.json");
    let data = await response.json();
    displayDecks(data.decks)
}
getDeckLists();

//add in deck list tiles
function displayDecks(decks) {
    const main = document.querySelector("main");
    decks.forEach(deck => {
        const tile = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h3");
        const format = document.createElement("p");
        const archetype = document.createElement("p");

        tile.classList.add("tile");
        tile.addEventListener("click", ()=> window.location.href = `deckList.html?deck=${deck.name}`);

        img.setAttribute("src", deck.photo);
        img.setAttribute("alt", deck.name);
        img.setAttribute("loading", "lazy");

        title.innerHTML = deck.name;
        format.innerHTML = deck.format;
        archetype.innerHTML = deck.archetype;

        tile.append(img, title, format, archetype);
        main.appendChild(tile);
    });
}