const merfonoForm = document.getElementById("merfono-form");
const editMerfonoForm = document.getElementById("editMerfono-form");
const merfonoList = document.getElementById("merfono-list");

const merfonoAdd = document.getElementById("addMerfono-form");
const merfonoEdit = document.getElementById("editMerfono-form");
const editMerfonoTitle = document.getElementById("editMerfono-title");

const merfonoAddBtn = document.getElementById("addMerfono-btn");

export function createMerfonoListItem(name, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `merfono-li-${id}`;
    const merfonoInfo = document.createElement("span");
    merfonoInfo.textContent = `${name}`;

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

        displayEditMerfono(merfonoInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost/merfonos/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(merfonoInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditMerfono(name, id) {

    editMerfonoTitle.setAttribute("customId", id);
    editMerfonoTitle.textContent = `Edit merfono ${name}`;

    editMerfonoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-merfono-edit").value;


        const data = {
            name,
        }

        fetch(`http://localhost/merfonos/${id}`, {
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
                const listItem = createMerfonoListItem(name, age, datos.id);
                merfonoList.appendChild(listItem);
                merfonoForm.reset();
            });

        document.getElementById(`merfono-li-${id}`).remove()
    });


    merfonoAdd.style.display = "none";
    merfonoEdit.style.display = "block";
}

export function displayAddMerfono() {
    merfonoAdd.style.display = "block";
    merfonoEdit.style.display = "none";
}



export function merfonoRender() {

    /* TEACHER */


    const merfonoForm = document.getElementById("merfono-form");
    const merfonoList = document.getElementById("merfono-list");

    const merfonos = fetch("http://localhost/merfonos/", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createMerfonoListItem(item.name, item.id);
                merfonoList.appendChild(listItem);
                merfonoForm.reset();

            });
        })

    console.log("olaa2222")

    merfonoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-merfono").value;



        const data = {
            name
        }

        fetch("http://localhost/merfonos/", {
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
                const listItem = createMerfonoListItem(name, datos.id);
                merfonoList.appendChild(listItem);
                merfonoForm.reset();
            });
    });


    const merfonoAddBtn = document.getElementById("addMerfono-btn");
    merfonoAddBtn.addEventListener("click", displayAddMerfono);
}
