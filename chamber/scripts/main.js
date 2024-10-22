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
        displaypriorityMembers(data.members);
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
const displaypriorityMembers = (members) => {
    const priorityMembers = document.querySelector("#priorityMembers");

    let priorityMembersList = members.filter((member) => {
        return member.membershipLevel >= 2;
    });

    let memebersDisplay = [];
    for (let i = 0; i < 3; i++) {
        let priorityMemberIndex = Math.floor(Math.random() * priorityMembersList.length);
        memebersDisplay.push(priorityMembersList[priorityMemberIndex]);
        priorityMembersList.splice(priorityMemberIndex);
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

        priorityMembers.appendChild(div);
    });
};

//buttons to change display style
if (window.location.pathname == "/chamber/directory.html") {
    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");

    gridButton.addEventListener("click", () => document.querySelector("#memberArea").classList.remove('list'));
    listButton.addEventListener("click", () => document.querySelector("#memberArea").classList.add("list"));
}

//footer date info
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#modified")

const currentDate = new Date();
currentYear.innerHTML = currentDate.getFullYear();

const lastModifiedDate = document.lastModified;
lastModified.innerHTML = `Last Modified: ${lastModifiedDate}`;

//get weather info and add it 
async function getWeather() {
    const url = "https://api.openweathermap.org/data/3.0/onecall?lat=33.68&lon=-112.08&units=imperial&appid=f0e38b89169f8eb67518380a33162ec0";

    try {
        const response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

if (window.location.pathname == "/chamber/index.html") {
    getWeather();
}

function displayWeather(weather) {
    const currentWeatherSection = document.querySelector("#currentWeather");
    const forecastSection = document.querySelector("#weatherForecast");

    //today's weather
    //make elements 
    const currentTemp = document.createElement("p");
    const weatherIcon = document.createElement("img");
    const weatherDescription = document.createElement("p");
    const highTemp = document.createElement("p");
    const lowTemp = document.createElement("p");
    const humidity = document.createElement("p");
    const sunrise = document.createElement("p");
    const sunset = document.createElement("p");

    //populate elements
    currentTemp.innerHTML = `${Math.floor(weather.current.temp)}°F`;
    weatherDescription.innerHTML = weather.current.weather[0].description;
    highTemp.innerHTML = `High: ${Math.floor(weather.daily[0].temp.max)}°F`;
    lowTemp.innerHTML = `Low: ${Math.floor(weather.daily[0].temp.min)}°F`;
    humidity.innerHTML = `${Math.floor(weather.current.humidity)}%`;
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`);
    weatherIcon.setAttribute("alt", weather.current.weather[0].description);
    weatherIcon.setAttribute("loading", "lazy");
    weatherIcon.setAttribute("float", "left");

    //convert today sunrise and sunset to human readable time
    let currentSunrise = new Date(weather.current.sunrise * 1000);
    let currentSunset = new Date(weather.current.sunset * 1000);
    sunrise.innerHTML = `Sunrise: ${currentSunrise.toLocaleTimeString("en-US")}`;
    sunset.innerHTML = `Sunset: ${currentSunset.toLocaleTimeString("en-US")}`;

    //add today's weather to the page
    currentWeatherSection.appendChild(currentTemp);
    currentWeatherSection.appendChild(weatherIcon);
    currentWeatherSection.appendChild(weatherDescription);
    currentWeatherSection.appendChild(highTemp);
    currentWeatherSection.appendChild(lowTemp);
    currentWeatherSection.appendChild(humidity);
    currentWeatherSection.appendChild(sunrise);
    currentWeatherSection.appendChild(sunset);

    //forecast section
    //create elements
    const todayTemp = document.createElement("p");
    const tomorrowTemp = document.createElement("p");
    const dayafterTomorrowTemp = document.createElement("p");

    //determine the day names 
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let tomorrowTempDate = new Date(weather.daily[1].dt * 1000);
    let dayafterTomorrowTempDate = new Date(weather.daily[2].dt * 1000);

    //fill content
    todayTemp.innerHTML = `Today: <strong>${weather.daily[0].temp.day}°F</strong>`;
    tomorrowTemp.innerHTML = `${days[tomorrowTempDate.getDay()]}: <strong>${weather.daily[1].temp.day}°F</strong>`;
    dayafterTomorrowTemp.innerHTML = `${days[dayafterTomorrowTempDate.getDay()]}: <strong>${weather.daily[2].temp.day}°F</strong>`;

    //add to the page
    forecastSection.appendChild(todayTemp);
    forecastSection.appendChild(tomorrowTemp);
    forecastSection.appendChild(dayafterTomorrowTemp);

}

//code to run if the page is the join page
if (window.location.pathname == "/chamber/join.html") {
    //get form tags
    const orginazationTitle = document.querySelector("input[name='organization-title']");
    const timeStamp = document.querySelector("#timestamp");

    //fill timestamp info
    timeStamp.setAttribute("value", `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`);

    //make modals work
    openButtons = document.querySelectorAll(".openButton");
    closeButtons = document.querySelectorAll(".closeButton");

    for (let i = 0; i < openButtons.length; i++) {
        openButtons[i].addEventListener('click', () => {
            const membershipLevelInfo = document.querySelector(`#membershipLevel${i}`);
            membershipLevelInfo.showModal();
        });

        closeButtons[i].addEventListener('click', () => {
            const membershipLevelInfo = document.querySelector(`#membershipLevel${i}`);
            membershipLevelInfo.close();
        });
    }
}

//code to run if the on the thank you page
if (window.location.pathname == "/chamber/thankyou.html") {
    const memberInfo = document.getElementById("memberInfo");
    const currentUrl = window.location.href;
    const submittedInfo = currentUrl.split('?')[1].split('&');
    submittedInfo.forEach(infoBit => {
        dataParts = infoBit.split("=");
        console.log(dataParts[0]);
        if ((dataParts[0] != "organization-title") && (dataParts[0] != "description") && (dataParts[0] != "membership-level")) {
            const paragraph = document.createElement("p");

            //add the data to the page and make all the data readable
            paragraph.innerHTML = `<strong>${dataParts[0]}</strong>: ${dataParts[1].replace("%40", "@").replaceAll("%2F", "/").replaceAll("%3A", ":").replaceAll("+", " ")}`;

            memberInfo.appendChild(paragraph);
        }
    });
}

//code to run on discover page
if(window.location.pathname == "/chamber/discover.html") {
    //create a message based on last vist
    const lastVisit = new Date(localStorage.getItem("lastVisit"));
    const lastVisitTag  = document.querySelector("#lastVisit");
    if(localStorage.getItem("lastVisit") == null) {
        localStorage.setItem("lastVisit", currentDate);
        lastVisitTag.innerHTML = "Welcome please let us know if you have any questions!";
    } else if ((lastVisit.getMonth() == currentDate.getMonth()) && (lastVisit.getDate() == currentDate.getDate())) {
        lastVisitTag.innerHTML = "Back so soon Awesome!";
    } else {
        const msToDays = 86400000;
        daysSinceVisit = (lastVisit.now() - currentDate.now()) / msToDays;
        lastVisitTag.innerHTML = (daysSinceVisit == 1) ? `You last visited ${daysSinceVisit} day ago.` : `You last visited ${daysSinceVisit} days ago.`;
    }
    
    //populate events
    let eventsSection = document.querySelector("#commerceEvents")
    for (let i = 0; i < 3; i++) {
        let potentialEvents = [`Taste Tester Sale: ${currentDate.getMonth()}/${currentDate.getDate()} - ${currentDate.getMonth()}/${currentDate.getDate() + i + 1}`, `Commerce Meet Up: ${currentDate.getMonth()}/${currentDate.getDate() + i}`, `Fundraiser for Local Schools: ${currentDate.getMonth()}/${currentDate.getDate()} - ${currentDate.getMonth()}/${currentDate.getDate() + ((i + 1) * 2)}`];
        let annoucedEvent = document.createElement("p");
        let randomEvent = Math.floor(Math.random() * 3);
        annoucedEvent.innerHTML = potentialEvents[randomEvent];
        eventsSection.appendChild(annoucedEvent);
    }
}