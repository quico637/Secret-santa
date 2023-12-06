const gloriaForm = document.getElementById("gloria-form");
const editGloriaForm = document.getElementById("editGloria-form");
const gloriaList = document.getElementById("gloria-list");

const gloriaAdd = document.getElementById("addGloria-form");
const gloriaEdit = document.getElementById("editGloria-form");
const editGloriaTitle = document.getElementById("editGloria-title");

const gloriaAddBtn = document.getElementById("addGloria-btn");

export function createGloriaListItem(name, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `gloria-li-${id}`;
    const gloriaInfo = document.createElement("span");
    gloriaInfo.textContent = `${name}`;

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

        displayEditGloria(gloriaInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost/glorias/${id}`, {
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(gloriaInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditGloria(name, id) {

    editGloriaTitle.setAttribute("customId", id);
    editGloriaTitle.textContent = `Edit gloria ${name}`;

    editGloriaForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-gloria-edit").value;


        const data = {
            name,
        }

        fetch(`http://localhost/glorias/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",

                "Access-Control-Allow-Origin": "*"

            },
        })
            .then(response => response.json())
            .then(datos => {
                console.log(datos)
                console.log("PUTTT")
                console.log(`datos.id = ${datos.id}`)
                const listItem = createGloriaListItem(name, age, datos.id);
                gloriaList.appendChild(listItem);
                gloriaForm.reset();
            });

        document.getElementById(`gloria-li-${id}`).remove()
    });


    gloriaAdd.style.display = "none";
    gloriaEdit.style.display = "block";
}

export function displayAddGloria() {
    gloriaAdd.style.display = "block";
    gloriaEdit.style.display = "none";
}



export function gloriaRender() {

    /* TEACHER */


    const gloriaForm = document.getElementById("gloria-form");
    const gloriaList = document.getElementById("gloria-list");

    const glorias = fetch("http://localhost/glorias/", {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createGloriaListItem(item.name, item.id);
                gloriaList.appendChild(listItem);
                gloriaForm.reset();

            });
        })

    console.log("olaa2222")

    gloriaForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-gloria").value;



        const data = {
            name
        }

        fetch("http://localhost/glorias/", {
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
                const listItem = createGloriaListItem(name, datos.id);
                gloriaList.appendChild(listItem);
                gloriaForm.reset();
            });
    });


    const gloriaAddBtn = document.getElementById("addGloria-btn");
    gloriaAddBtn.addEventListener("click", displayAddGloria);
}
