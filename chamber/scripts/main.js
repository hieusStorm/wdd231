//Nav menu mobile functionality
const navButton = document.querySelector("#navButton");
const nav = document.querySelector("nav");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("open");
    nav.classList.toggle("open");
});

//retrieve & display member data
async function retrieveMembers(type) {
    let response = await fetch("https://hieusstorm.github.io/wdd231/chamber/data/members.json");
    let data = await response.json();
    displayMembers(data.members, type);
}

retrieveMembers("grid");

const displayMembers = (members, type) => {
    const memberArea = document.querySelector("#memberArea");
    memberArea.innerHTML = "";
    if (type == "grid") {
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

            memberArea.appendChild(section);
        });
    } else {
        const table = document.createElement("table");
        members.forEach(member => {
            const tr = document.createElement("tr");
            const memberName = document.createElement("td");
            const address = document.createElement("td");
            const numberTag = document.createElement("td");
            const memberUrl = document.createElement("td");
            const memberLink = document.createElement("a");

            memberName.innerHTML = member.name;
            address.innerHTML = member.address;
            numberTag.innerHTML = member.phoneNumber;

            memberLink.setAttribute("href", member.url);
            memberLink.setAttribute("target", "_blank");
            memberLink.innerHTML = member.url;

            memberUrl.appendChild(memberLink);

            tr.appendChild(memberName);
            tr.appendChild(address);
            tr.appendChild(numberTag);
            tr.appendChild(memberUrl);

            table.appendChild(tr);
        });

        memberArea.appendChild(table);
    }
}

//buttons to change display style
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => retrieveMembers("grid"));
listButton.addEventListener("click", () => retrieveMembers("list"));

//footer date info
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#modified")
//get date information
const currrentDate = new Date();
currentYear.innerHTML = currrentDate.getFullYear();

//Get last modified time
const lastModifiedDate = document.lastModified;
lastModified.innerHTML = `Last Modified: ${lastModifiedDate}`;