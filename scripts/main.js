const navMenu = document.getElementById("navMenu");
const currentYear = document.getElementById("currentYear");
const lastModified = document.getElementById("lastModified");
const nav = document.querySelector("nav");


//get date information
const currrentDate = new Date();
currentYear.innerHTML = currrentDate.getFullYear();

//Get last modified time
const lastModifiedDate = document.lastModified;
lastModified.innerHTML = `Last Modified: ${lastModifiedDate}`;


//toggle the open tag
navMenu.addEventListener("click", () => {
    navMenu.classList.toggle('open');
    nav.classList.toggle('open');
});

//course information
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

//add course info
display();

//add course filters
const allFilter = document.getElementById("allFilter");
const cseFiter = document.getElementById("cseFilter");
const wddFilter = document.getElementById("wddFilter");

allFilter.addEventListener("click", () => display());
cseFiter.addEventListener("click", () => display("CSE"));
wddFilter.addEventListener("click", () => display("WDD"));

//determine required credits total
let requiredCredits = 0;
let remainingCredits = 0;

courses.forEach(course => {
    if(!course.completed) {
        remainingCredits += course.credits;
    }
    requiredCredits += course.credits;
});

document.getElementById("credit").innerHTML = `Required Credits total: ${requiredCredits}  Remaining Credits: ${remainingCredits}`; 

function clearCourses() {
    let courseSpans = document.querySelectorAll("section span");
    courseSpans.forEach(span => span.remove());
}

function display(filter = "all") {
    clearCourses();
    let selectedCourses = courses;

    if (filter != "all") {
        selectedCourses = courses.filter((course) => {
            return course.subject == filter;
        });
    }

    selectedCourses.forEach(course => {
        let section = document.querySelector("main").lastElementChild;
        let courseTag = document.createElement("span");


        courseTag.innerHTML = `${course.subject} ${course.number}`;

        if (course.completed) {
            courseTag.classList.add("completed");
        }

        section.appendChild(courseTag);
    });
}