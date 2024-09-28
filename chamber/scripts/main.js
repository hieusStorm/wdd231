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
    const memberArea = document.querySelector("#memberArea");
    memberArea.innerHTML = "";
        members.forEach(member => {
            const div = document.createElement("div");
            const img = document.createElement("img");
            const memberName = document.createElement("p");
            const addressTag = document.createElement("p");
            const numberTag = document.createElement("p");
            const memberUrl = document.createElement("a");

            img.setAttribute("src", member.imgUrl);
            img.setAttribute("alt", member.imgName);
            img.setAttribute("loading", "lazy");

            memberName.innerHTML = member.name;
            memberName.classList.add("memberName");

            addressTag.innerHTML = member.address;
            numberTag.innerHTML = member.phoneNumber;

            memberUrl.setAttribute("href", member.url);
            memberUrl.setAttribute("target", "_blank");
            memberUrl.innerText = member.url;

            div.appendChild(img);
            div.appendChild(memberName);
            div.appendChild(addressTag);
            div.appendChild(numberTag);
            div.appendChild(memberUrl);

            memberArea.appendChild(div);
        });
}

//buttons to change display style
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => document.querySelector("#memberArea").classList.remove('list'));
listButton.addEventListener("click", () => document.querySelector("#memberArea").classList.add("list"));

//footer date info
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#modified")
//get date information
const currrentDate = new Date();
currentYear.innerHTML = currrentDate.getFullYear();

//Get last modified time
const lastModifiedDate = document.lastModified;
lastModified.innerHTML = `Last Modified: ${lastModifiedDate}`;