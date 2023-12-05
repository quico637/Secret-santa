import {
    createStudentListItem,
    displayAddStudent
} from "./student.js";

import {
    createTeacherListItem,
    displayAddTeacher
} from "./teacher.js";

import {
    displayAddMeeting
} from "./meeting.js";

import * as calendar from "./calendar.js";

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


    const teacherForm = document.getElementById("teacher-form");
    const teacherList = document.getElementById("teacher-list");

    const teachers = fetch("http://localhost/teachers/", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createTeacherListItem(item.name, item.age, item.id);
                teacherList.appendChild(listItem);
                teacherForm.reset();

            });
        })




    teacherForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-teacher").value;
        const age = document.getElementById("age-teacher").value;
        const subject = document.getElementById("subject-teacher").value;
        const groups = [];

        const g1 = document.getElementById("teacher-cbox-g1")
        const g2 = document.getElementById("teacher-cbox-g2")
        const g3 = document.getElementById("teacher-cbox-g3")

        if (g1.checked)
            groups.push(1);

        if (g2.checked)
            groups.push(2);

        if (g3.checked)
            groups.push(3);


        const data = {
            name,
            age,
            subject,
            groups
        }

        fetch("http://localhost:3000/teachers/", {
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
                const listItem = createTeacherListItem(name, age, datos.id);
                teacherList.appendChild(listItem);
                teacherForm.reset();
            });
    });




    /* VIEWS */


    // JavaScript code to switch between views
    const teacherView = document.getElementById("teacher-view");
    const studentView = document.getElementById("student-view");
    const agendaView = document.getElementById("agenda-view");
    const presentacionView = document.getElementById("presentacion-view");

    function showStudentListView() {
        teacherView.style.display = "block";
        studentView.style.display = "none";
        agendaView.style.display = "none";
        presentacionView.style.display = "none";
    }

    function showStudentView() {
        teacherView.style.display = "none";
        studentView.style.display = "block";
        agendaView.style.display = "none";
        presentacionView.style.display = "none";
    }

    function showAgendaView() {
        teacherView.style.display = "none";
        studentView.style.display = "none";
        agendaView.style.display = "block";
        presentacionView.style.display = "none";
    }

    function showPresentacionView() {
        teacherView.style.display = "none";
        studentView.style.display = "none";
        agendaView.style.display = "none";
        presentacionView.style.display = "block";
    }

    // Add event listeners to navigation links
    const studentListLink = document.querySelector('a[href="#student-view"]');
    const addStudentLink = document.querySelector('a[href="#teacher-view"]');
    const agendaLink = document.querySelector('a[href="#agenda-view"]');
    const presentacionLink = document.querySelector('a[href="#presentacion-view"]');

    studentListLink.addEventListener("click", showStudentListView);
    addStudentLink.addEventListener("click", showStudentView);
    agendaLink.addEventListener("click", showAgendaView);
    presentacionLink.addEventListener("click", showPresentacionView);

    // Show the student list view by default
    showPresentacionView();






    // inside student's view

    const studentAddBtn = document.getElementById("addStudent-btn");
    studentAddBtn.addEventListener("click", displayAddStudent);

    // inside teacher view

    const teacherAddBtn = document.getElementById("addTeacher-btn");
    teacherAddBtn.addEventListener("click", displayAddTeacher);


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

        fetch("http://localhost:3000/meetings/", {
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


