const palomaForm = document.getElementById("paloma-form");
const editPalomaForm = document.getElementById("editPaloma-form");
const palomaList = document.getElementById("paloma-list");

const palomaAdd = document.getElementById("addPaloma-form");
const palomaEdit = document.getElementById("editPaloma-form");
const editPalomaTitle = document.getElementById("editPaloma-title");

const palomaAddBtn = document.getElementById("addPaloma-btn");

export function createPalomaListItem(name, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `paloma-li-${id}`;
    const palomaInfo = document.createElement("span");
    palomaInfo.textContent = `${name}`;

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

        displayEditPaloma(palomaInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost/palomas/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(palomaInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditPaloma(name, id) {

    editPalomaTitle.setAttribute("customId", id);
    editPalomaTitle.textContent = `Edit paloma ${name}`;

    editPalomaForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-paloma-edit").value;


        const data = {
            name,
        }

        fetch(`http://localhost/palomas/${id}`, {
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
                const listItem = createPalomaListItem(name, age, datos.id);
                palomaList.appendChild(listItem);
                palomaForm.reset();
            });

        document.getElementById(`paloma-li-${id}`).remove()
    });


    palomaAdd.style.display = "none";
    palomaEdit.style.display = "block";
}

export function displayAddPaloma() {
    palomaAdd.style.display = "block";
    palomaEdit.style.display = "none";
}



export function palomaRender() {

    /* TEACHER */


    const palomaForm = document.getElementById("paloma-form");
    const palomaList = document.getElementById("paloma-list");

    const palomas = fetch("http://localhost/palomas/", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createPalomaListItem(item.name, item.id);
                palomaList.appendChild(listItem);
                palomaForm.reset();

            });
        })

    console.log("olaa2222")

    palomaForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-paloma").value;



        const data = {
            name
        }

        fetch("http://localhost/palomas/", {
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
                const listItem = createPalomaListItem(name, datos.id);
                palomaList.appendChild(listItem);
                palomaForm.reset();
            });
    });


    const palomaAddBtn = document.getElementById("addPaloma-btn");
    palomaAddBtn.addEventListener("click", displayAddPaloma);
}
