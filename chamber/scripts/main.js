//Nav menu mobile functionality
const navButton = document.querySelector("#navButton");
const nav = document.querySelector("nav");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("open");
    nav.classList.toggle("open");
});

//retrieve & display member data
async function retrieveMembers() {
    let response = await fetch("https://hieusstorm.github.io/wdd231/chamber/data/members.json");
    let data = await response.json();
    displayMembers(data.members);
}
retrieveMembers();

const displayMembers = (members) => {
    const gridArea = document.querySelector("#memberArea");
    members.forEach(member => {
        const section = document.createElement("section");
        const img = document.createElement("img");
        const addressTag = document.createElement("p");
        const numberTag = document.createElement("p");
        const memberUrl = document.createElement("a");

        img.setAttribute("src", member.imgUrl);
        img.setAttribute("alt", member.imgName);

        addressTag.innerHTML = member.address;
        numberTag.innerHTML = member.phoneNumber;

        memberUrl.setAttribute("href", member.url);
        memberUrl.setAttribute("target", "_blank");
        memberUrl.innerText = member.url;

        section.appendChild(img);
        section.appendChild(addressTag);
        section.appendChild(numberTag);
        section.appendChild(memberUrl);

        gridArea.appendChild(section);
    });
}