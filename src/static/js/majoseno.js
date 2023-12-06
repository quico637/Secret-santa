const majosenoForm = document.getElementById("majoseno-form");
const editMajosenoForm = document.getElementById("editMajoseno-form");
const majosenoList = document.getElementById("majoseno-list");

const majosenoAdd = document.getElementById("addMajoseno-form");
const majosenoEdit = document.getElementById("editMajoseno-form");
const editMajosenoTitle = document.getElementById("editMajoseno-title");

const majosenoAddBtn = document.getElementById("addMajoseno-btn");

export function createMajosenoListItem(name, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `majoseno-li-${id}`;
    const majosenoInfo = document.createElement("span");
    majosenoInfo.textContent = `${name}`;

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

        displayEditMajoseno(majosenoInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost/majosenos/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(majosenoInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditMajoseno(name, id) {

    editMajosenoTitle.setAttribute("customId", id);
    editMajosenoTitle.textContent = `Edit majoseno ${name}`;

    editMajosenoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-majoseno-edit").value;


        const data = {
            name,
        }

        fetch(`http://localhost/majosenos/${id}`, {
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
                const listItem = createMajosenoListItem(name, age, datos.id);
                majosenoList.appendChild(listItem);
                majosenoForm.reset();
            });

        document.getElementById(`majoseno-li-${id}`).remove()
    });


    majosenoAdd.style.display = "none";
    majosenoEdit.style.display = "block";
}

export function displayAddMajoseno() {
    majosenoAdd.style.display = "block";
    majosenoEdit.style.display = "none";
}



export function majosenoRender() {

    /* TEACHER */


    const majosenoForm = document.getElementById("majoseno-form");
    const majosenoList = document.getElementById("majoseno-list");

    const majosenos = fetch("http://localhost/majosenos/", {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createMajosenoListItem(item.name, item.id);
                majosenoList.appendChild(listItem);
                majosenoForm.reset();

            });
        })

    console.log("olaa2222")

    majosenoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-majoseno").value;



        const data = {
            name
        }

        fetch("http://localhost/majosenos/", {
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
                const listItem = createMajosenoListItem(name, datos.id);
                majosenoList.appendChild(listItem);
                majosenoForm.reset();
            });
    });


    const majosenoAddBtn = document.getElementById("addMajoseno-btn");
    majosenoAddBtn.addEventListener("click", displayAddMajoseno);
}
