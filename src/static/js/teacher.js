const teacherForm = document.getElementById("teacher-form");
const editTeacherForm = document.getElementById("editTeacher-form");
const teacherList = document.getElementById("teacher-list");

const teacherAdd = document.getElementById("addTeacher-form");
const teacherEdit = document.getElementById("editTeacher-form");
const editTeacherTitle = document.getElementById("editTeacher-title");

const teacherAddBtn = document.getElementById("addTeacher-btn");

export function createTeacherListItem(name, age, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `teacher-li-${id}`;
    const teacherInfo = document.createElement("span");
    teacherInfo.textContent = `${name}`;

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
        
        displayEditTeacher(teacherInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost:3000/teachers/${id}`, {
            method : "DELETE"
        })
        .then(response => response.json())
        .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(teacherInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditTeacher(name, id) {

    editTeacherTitle.setAttribute("customId", id);
    editTeacherTitle.textContent = `Edit teacher ${name}`;

    editTeacherForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-teacher-edit").value;
        const age = document.getElementById("age-teacher-edit").value;
        const subject = document.getElementById("subject-teacher-edit").value;
        const groups = [];


        const g1 = document.getElementById("teacher-cbox-g1-edit");
        const g2 = document.getElementById("teacher-cbox-g2-edit");
        const g3 = document.getElementById("teacher-cbox-g3-edit");

        

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

        fetch(`http://localhost:3000/teachers/${id}`, {
            method : "PUT",
            body : JSON.stringify(data),
            headers : {
                "Content-type" : "application/json"
            },
        })
        .then(response => response.json())
        .then(datos => {
            console.log(datos)
            console.log("PUTTT")
            console.log(`datos.id = ${datos.id}`)
            const listItem = createTeacherListItem(name, age, datos.id);
            teacherList.appendChild(listItem);
            teacherForm.reset();
        });

        document.getElementById(`teacher-li-${id}`).remove()
    });


    teacherAdd.style.display = "none";
    teacherEdit.style.display = "block";
}

export function displayAddTeacher() {
    teacherAdd.style.display = "block";
    teacherEdit.style.display = "none";
}