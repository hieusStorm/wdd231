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
    if (window.location.pathname == "/chamber/index.html") {
        displayPriorityMemebers(data.members);
    } else if (window.location.pathname == "/chamber/directory.html") {
        displayMembers(data.members);
    }
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
};
//display 3 silver or gold memebers randomly
const displayPriorityMemebers = (members) => {
    const priorityMemebers = document.querySelector("#priorityMemebers");
    
    let priorityMemebersList = members.filter((member) => {
        return member.membershipLevel >= 2;
    });

    let memebersDisplay = [];
    for (let i = 0; i < 3; i++) {
        memebersDisplay.push(priorityMemebersList[Math.floor(Math.random() * priorityMemebersList.length)]);
    }

    memebersDisplay.forEach(priorityMemeber => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("h3");
        const phone = document.createElement("p");
        const url = document.createElement("p");

        img.setAttribute("src", priorityMemeber.imgUrl);
        img.setAttribute("alt", priorityMemeber.imgName);
        img.setAttribute("loading", "lazy");
        
        name.innerHTML = priorityMemeber.name;
        phone.innerHTML = `<strong>Phone</strong>: ${priorityMemeber.phoneNumber}`;
        url.innerHTML = `<strong>URL</strong>: <a href='${priorityMemeber.url}'>${priorityMemeber.url}</a>`;

        div.appendChild(name);
        div.appendChild(img);
        div.appendChild(phone);
        div.appendChild(url);

        priorityMemebers.appendChild(div);
    });
};

//buttons to change display style
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => document.querySelector("#memberArea").classList.remove('list'));
listButton.addEventListener("click", () => document.querySelector("#memberArea").classList.add("list"));

//footer date info
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#modified")

const currrentDate = new Date();
currentYear.innerHTML = currrentDate.getFullYear();

const lastModifiedDate = document.lastModified;
lastModified.innerHTML = `Last Modified: ${lastModifiedDate}`;