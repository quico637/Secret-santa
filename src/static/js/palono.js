const palonoForm = document.getElementById("palono-form");
const editPalonoForm = document.getElementById("editPalono-form");
const palonoList = document.getElementById("palono-list");

const palonoAdd = document.getElementById("addPalono-form");
const palonoEdit = document.getElementById("editPalono-form");
const editPalonoTitle = document.getElementById("editPalono-title");

const palonoAddBtn = document.getElementById("addPalono-btn");

export function createPalonoListItem(name, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `palono-li-${id}`;
    const palonoInfo = document.createElement("span");
    palonoInfo.textContent = `${name}`;

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

        displayEditPalono(palonoInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost/palonos/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(palonoInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditPalono(name, id) {

    editPalonoTitle.setAttribute("customId", id);
    editPalonoTitle.textContent = `Edit palono ${name}`;

    editPalonoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-palono-edit").value;


        const data = {
            name,
        }

        fetch(`http://localhost/palonos/${id}`, {
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
                const listItem = createPalonoListItem(name, age, datos.id);
                palonoList.appendChild(listItem);
                palonoForm.reset();
            });

        document.getElementById(`palono-li-${id}`).remove()
    });


    palonoAdd.style.display = "none";
    palonoEdit.style.display = "block";
}

export function displayAddPalono() {
    palonoAdd.style.display = "block";
    palonoEdit.style.display = "none";
}



export function palonoRender() {

    /* TEACHER */


    const palonoForm = document.getElementById("palono-form");
    const palonoList = document.getElementById("palono-list");

    const palonos = fetch("http://localhost/palonos/", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createPalonoListItem(item.name, item.id);
                palonoList.appendChild(listItem);
                palonoForm.reset();

            });
        })

    console.log("olaa2222")

    palonoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-palono").value;



        const data = {
            name
        }

        fetch("http://localhost/palonos/", {
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
                const listItem = createPalonoListItem(name, datos.id);
                palonoList.appendChild(listItem);
                palonoForm.reset();
            });
    });


    const palonoAddBtn = document.getElementById("addPalono-btn");
    palonoAddBtn.addEventListener("click", displayAddPalono);
}
