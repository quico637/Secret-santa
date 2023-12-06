import {
    createStudentListItem,
    displayAddStudent
} from "./student.js";

import {
    teacherRender
} from "./teacher.js";


import {
    displayAddMeeting
} from "./meeting.js";

import * as calendar from "./calendar.js";

import { palomaRender } from "./paloma.js";
import { palonoRender } from "./palono.js";

import { gloriaRender } from "./gloria.js";
import { glorinoRender } from "./glorino.js";
import { majosefaRender } from "./majosefa.js";

document.addEventListener('DOMContentLoaded', () => {

    /* STUDENT */

    // JavaScript code to handle form submission
    const studentForm = document.getElementById("student-form");
    const studentList = document.getElementById("student-list");


    const students = fetch("http://localhost/students/", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createStudentListItem(item.name, item.age, item.id);
                studentList.appendChild(listItem);
                studentForm.reset();

            });
        })


    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const subject = document.getElementById("subject").value;
        const group = document.getElementById("groupSelector-student").value;


        const data = {
            name,
            age,
            subject,
            group
        }

        fetch("http://localhost/students/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(response => response.json())
            .then(datos => {
                console.log(datos)
                console.log("POSTTT")
                console.log(`datos.id = ${datos.id}`)
                const listItem = createStudentListItem(name, age, datos.id);
                studentList.appendChild(listItem);
                studentForm.reset();
            });


    });


    /* TEACHER */
    console.log("olaa")
    teacherRender();


    /* PALOMA */

    palomaRender();

    // PALONO

    palonoRender();

    /* GLORIA */

    gloriaRender();

    glorinoRender();

    majosefaRender();


    /* VIEWS */


    // JavaScript code to switch between views
    let teacherView = document.getElementById("teacher-view");
    let studentView = document.getElementById("student-view");
    let agendaView = document.getElementById("agenda-view");
    let presentacionView = document.getElementById("presentacion-view");
    let palomaView = document.getElementById("paloma-view");
    let palonoView = document.getElementById("palono-view");
    let gloriaView = document.getElementById("gloria-view");
    let glorinoView = document.getElementById("glorino-view");
    let majosefaView = document.getElementById("majosefa-view");

    let arr = []

    arr.push(teacherView);
    arr.push(studentView);
    arr.push(agendaView);
    arr.push(presentacionView);
    arr.push(palomaView);
    arr.push(palonoView);
    arr.push(gloriaView);
    arr.push(glorinoView);
    arr.push(majosefaView);

    

    function showView(vieww) {
        arr.forEach((v) => {
            v.style.display = "none";
        })
        console.log(arr);
        vieww.style.display = "block";
    }


    // Add event listeners to navigation links
    const studentListLink = document.querySelector('a[href="#student-view"]');
    const addTeacherLink = document.querySelector('a[href="#teacher-view"]');
    const agendaLink = document.querySelector('a[href="#agenda-view"]');
    const presentacionLink = document.querySelector('a[href="#presentacion-view"]');
    
    const palomaLink = document.querySelector('a[href="#paloma-view"]');
    const palonoLink = document.querySelector('a[href="#palono-view"]');
    const gloriaLink = document.querySelector('a[href="#gloria-view"]');
    const glorinoLink = document.querySelector('a[href="#glorino-view"]');
    const majosefaLink = document.querySelector('a[href="#majosefa-view"]');

    studentListLink.addEventListener("click", () => showView(studentView));
    addTeacherLink.addEventListener("click", () => showView(teacherView));
    agendaLink.addEventListener("click", () => showView(agendaView));
    presentacionLink.addEventListener("click", () => showView(presentacionView));

    palomaLink.addEventListener("click", () => showView(palomaView));
    palonoLink.addEventListener("click", () => showView(palonoView));
    gloriaLink.addEventListener("click", () => showView(gloriaView));
    glorinoLink.addEventListener("click", () => showView(glorinoView));
    majosefaLink.addEventListener("click", () => showView(majosefaView));

    // Show the student list view by default
    showView(presentacionView);






    // inside student's view

    const studentAddBtn = document.getElementById("addStudent-btn");
    studentAddBtn.addEventListener("click", displayAddStudent);


    /* CALENDAR */

    calendar.setUp();


    /* MEETING */

    const submitMettingButton = document.getElementById("meetingSubmitButton");

    submitMettingButton.addEventListener("click", function (e) {

        e.preventDefault();
        const startHour = document.getElementById("startHour").value;
        const endHour = document.getElementById("endHour").value;
        const interval = document.getElementById("interval").value;
        const studentsPerInterval = document.getElementById("studentsPerInterval").value;
        const meetingDate = document.getElementById("meetingDate").value;
        const groupSelector = document.getElementById("groupSelector");
        const subject = document.getElementById("subject").value;
        const teacher = document.getElementById("teacher").value;
        const location = document.getElementById("location").value;
        const meetingName = document.getElementById("meetingName").value;

        const meetingForm = document.getElementById("meetingForm");

        const data = {
            startHour,
            endHour,
            interval,
            studentsPerInterval,
            meetingDate,
            group: groupSelector.value,
            subject,
            teacher,
            location,
            meetingName
        }

        fetch("http://localhost/meetings/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(response => response.json())
            .then(datos => {
                console.log(datos)
                // const listItem = createMeetingListItem(meetingName, startHour, endHour, datos.id);
                // meetingList.appendChild(listItem);
                meetingForm.reset();
            });

    });


    // inside meeting view 

    const meetingAddBtn = document.getElementById("addMeeting-btn");
    meetingAddBtn.addEventListener("click", displayAddMeeting);

});


