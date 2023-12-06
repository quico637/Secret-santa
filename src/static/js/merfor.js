const merforForm = document.getElementById("merfor-form");
const editMerforForm = document.getElementById("editMerfor-form");
const merforList = document.getElementById("merfor-list");

const merforAdd = document.getElementById("addMerfor-form");
const merforEdit = document.getElementById("editMerfor-form");
const editMerforTitle = document.getElementById("editMerfor-title");

const merforAddBtn = document.getElementById("addMerfor-btn");

export function createMerforListItem(name, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `merfor-li-${id}`;
    const merforInfo = document.createElement("span");
    merforInfo.textContent = `${name}`;

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

        displayEditMerfor(merforInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost/merfors/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(merforInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditMerfor(name, id) {

    editMerforTitle.setAttribute("customId", id);
    editMerforTitle.textContent = `Edit merfor ${name}`;

    editMerforForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-merfor-edit").value;


        const data = {
            name,
        }

        fetch(`http://localhost/merfors/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(response => response.json())
            .then(datos => {
                console.log(datos)
                console.log("PUTTT")
                console.log(`datos.id = ${datos.id}`)
                const listItem = createMerforListItem(name, age, datos.id);
                merforList.appendChild(listItem);
                merforForm.reset();
            });

        document.getElementById(`merfor-li-${id}`).remove()
    });


    merforAdd.style.display = "none";
    merforEdit.style.display = "block";
}

export function displayAddMerfor() {
    merforAdd.style.display = "block";
    merforEdit.style.display = "none";
}



export function merforRender() {

    /* TEACHER */


    const merforForm = document.getElementById("merfor-form");
    const merforList = document.getElementById("merfor-list");

    const merfors = fetch("http://localhost/merfors/", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createMerforListItem(item.name, item.id);
                merforList.appendChild(listItem);
                merforForm.reset();

            });
        })

    console.log("olaa2222")

    merforForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-merfor").value;



        const data = {
            name
        }

        fetch("http://localhost/merfors/", {
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
                const listItem = createMerforListItem(name, datos.id);
                merforList.appendChild(listItem);
                merforForm.reset();
            });
    });


    const merforAddBtn = document.getElementById("addMerfor-btn");
    merforAddBtn.addEventListener("click", displayAddMerfor);
}
