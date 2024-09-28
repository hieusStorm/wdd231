const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.getElementById("cards");
const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const prophetSection = document.createElement("section");
        const fullName = document.createElement("h2");
        const protrait  = document.createElement("img");
        
        fullName.innerHTML = `${prophet.name} ${prophet.lastname}`;
        
        protrait.setAttribute("src", prophet.imageurl);
        protrait.setAttribute("alt", `Picture of ${prophet.name} ${prophet.lastname}`);
        protrait.setAttribute("loading", "lazy");
        protrait.setAttribute("width", "25%");
        protrait.setAttribute("height", "auto");

        prophetSection.appendChild(fullName);
        prophetSection.appendChild(protrait);

        cards.appendChild(prophetSection);
        });
};

async function getProphetData() {
    let response = await fetch(url);
    let data = await response.json();
    //  console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData();