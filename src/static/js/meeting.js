const meetingForm = document.getElementById("addMeeting-form");
const editMeetingForm = document.getElementById("editTeacher-form");
const submitMettingButtonEdit = document.getElementById("meetingSubmitButton-edit");
const meetingList = document.getElementById("meeting-list");


const meetingAdd = document.getElementById("meetingForm");
const meetingAddDiv = document.getElementById("add-meetingForm");
const meetingEdit = document.getElementById("meetingForm-edit");
const meetingEditDiv = document.getElementById("edit-meetingForm-edit");
const editMeetingTitle = document.getElementById("editMeeting-title");

export function createMeetingListItem(name, startHour, endHour, id, date) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `meeting-li-${date}-${id}`
    console.log(`nada mas tal: ${listItem.getAttribute('customId')}`);

    const meetingInfo = document.createElement("span");
    meetingInfo.textContent = `${name}  ${startHour} - ${endHour}`;

    const buttonsDiv = document.createElement("div");

    const updateButton = document.createElement("button");
    // updateButton.textContent = "Update";
    const updateIcon = document.createElement("i");
    updateIcon.className = "bi bi-pencil-square"; // Bootstrap trash icon
    updateButton.appendChild(updateIcon);
    updateButton.className = "btn btn-success mr-2";

    const removeButton = document.createElement("button");
    const removeIcon = document.createElement("i");
    removeIcon.className = "bi bi-trash"; // Bootstrap trash icon
    removeButton.appendChild(removeIcon);
    removeButton.className = "btn btn-danger";

    // removeButton.className = "btn btn-danger";

    updateButton.addEventListener("click", () => {
        displayEditMeeting(meetingInfo.textContent, id, date);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost:3000/meetings/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(meetingInfo);
    listItem.appendChild(buttonsDiv);


    return listItem;
}

export function displayEditMeeting(name, id, date) {

    editMeetingTitle.setAttribute("customId", id);
    editMeetingTitle.textContent = `Edit meeting ${name}`;

    submitMettingButtonEdit.addEventListener("click", function (e) {
        e.preventDefault();

        const startHour = document.getElementById("startHour-edit").value;
        const endHour = document.getElementById("endHour-edit").value;
        const interval = document.getElementById("interval-edit").value;
        const studentsPerInterval = document.getElementById("studentsPerInterval-edit").value;
        const meetingDate = document.getElementById("meetingDate-edit").value;
        const groupSelector = document.getElementById("groupSelector-edit");
        const subject = document.getElementById("meeting-subject-edit").value;
        const teacher = document.getElementById("meeting-teacher-edit").value;
        const location = document.getElementById("meeting-location-edit").value;
        const meetingName = document.getElementById("meetingName-edit").value;

        const meetingForm = document.getElementById("meetingForm-edit");

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

        fetch(`http://localhost:3000/meetings/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(response => response.json())
            .then(datos => {
                console.log(datos)
                document.getElementById(`meeting-li-${date}-${id}`).remove()
                const listItem = createMeetingListItem(meetingName, startHour, endHour, datos.id, date);
                meetingList.appendChild(listItem);
                meetingForm.reset();
            });

    });


    meetingAddDiv.style.display = "none";
    meetingEditDiv.style.display = "block";
}



export function displayAddMeeting() {
    meetingAdd.style.display = "block";
    meetingEdit.style.display = "none";
}