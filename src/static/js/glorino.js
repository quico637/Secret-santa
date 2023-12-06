const glorinoForm = document.getElementById("glorino-form");
const editGlorinoForm = document.getElementById("editGlorino-form");
const glorinoList = document.getElementById("glorino-list");

const glorinoAdd = document.getElementById("addGlorino-form");
const glorinoEdit = document.getElementById("editGlorino-form");
const editGlorinoTitle = document.getElementById("editGlorino-title");

const glorinoAddBtn = document.getElementById("addGlorino-btn");

export function createGlorinoListItem(name, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `glorino-li-${id}`;
    const glorinoInfo = document.createElement("span");
    glorinoInfo.textContent = `${name}`;

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

        displayEditGlorino(glorinoInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost/glorinos/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(glorinoInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditGlorino(name, id) {

    editGlorinoTitle.setAttribute("customId", id);
    editGlorinoTitle.textContent = `Edit glorino ${name}`;

    editGlorinoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-glorino-edit").value;


        const data = {
            name,
        }

        fetch(`http://localhost/glorinos/${id}`, {
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
                const listItem = createGlorinoListItem(name, age, datos.id);
                glorinoList.appendChild(listItem);
                glorinoForm.reset();
            });

        document.getElementById(`glorino-li-${id}`).remove()
    });


    glorinoAdd.style.display = "none";
    glorinoEdit.style.display = "block";
}

export function displayAddGlorino() {
    glorinoAdd.style.display = "block";
    glorinoEdit.style.display = "none";
}



export function glorinoRender() {

    /* TEACHER */


    const glorinoForm = document.getElementById("glorino-form");
    const glorinoList = document.getElementById("glorino-list");

    const glorinos = fetch("http://localhost/glorinos/", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createGlorinoListItem(item.name, item.id);
                glorinoList.appendChild(listItem);
                glorinoForm.reset();

            });
        })

    console.log("olaa2222")

    glorinoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-glorino").value;



        const data = {
            name
        }

        fetch("http://localhost/glorinos/", {
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
                const listItem = createGlorinoListItem(name, datos.id);
                glorinoList.appendChild(listItem);
                glorinoForm.reset();
            });
    });


    const glorinoAddBtn = document.getElementById("addGlorino-btn");
    glorinoAddBtn.addEventListener("click", displayAddGlorino);
}
