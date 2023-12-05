const studentForm = document.getElementById("student-form");
const editStudentForm = document.getElementById("editStudent-form");
const studentList = document.getElementById("student-list");

const studentAdd = document.getElementById("addStudent-form");
const studentEdit = document.getElementById("editStudent-form");

const studentAddBtn = document.getElementById("addStudent-btn");

const editStudentTitle = document.getElementById("editStudent-title-edit");

export function createStudentListItem(name, age, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `student-li-${id}`;
    console.log(`nada mas tal: ${listItem.getAttribute('customId')}`);

    const studentInfo = document.createElement("span");
    studentInfo.textContent = `${name}`;

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
        
        displayEditStudent(studentInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost:3000/students/${id}`, {
            method : "DELETE"
        })
        .then(response => response.json())
        .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(studentInfo);
    listItem.appendChild(buttonsDiv);


    return listItem;
}

export function displayEditStudent(name, id) {
        
    editStudentTitle.setAttribute("customId", id);
    editStudentTitle.textContent = `Edit student ${name}`;

    editStudentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-edit").value;
        const age = document.getElementById("age-edit").value;
        const subject = document.getElementById("subject-edit").value;

        const group = document.getElementById("groupSelector-edit");
   

        const data = {
            name,
            age,
            subject,
            group
        }

        fetch(`http://localhost:3000/students/${id}`, {
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
            const listItem = createStudentListItem(name, age, datos.id);
            studentList.appendChild(listItem);
            studentForm.reset();
        });


        document.getElementById(`student-li-${id}`).remove()
    });


    studentAdd.style.display = "none";
    studentEdit.style.display = "block";
}



export function displayAddStudent() {
    studentAdd.style.display = "block";
    studentEdit.style.display = "none";
}