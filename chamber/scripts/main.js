//Nav menu mobile functionality
const navButton = document.querySelector("#navButton");
const nav = document.querySelector("nav");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("open");
    nav.classList.toggle("open");
});

//retrieve member data
async function retrieveMembers() {
    let response = await fetch("../data/members.json");
    let data = await response.json();
    console.table(data);
}
retrieveMembers();