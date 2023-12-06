const majosefaForm = document.getElementById("majosefa-form");
const editMajosefaForm = document.getElementById("editMajosefa-form");
const majosefaList = document.getElementById("majosefa-list");

const majosefaAdd = document.getElementById("addMajosefa-form");
const majosefaEdit = document.getElementById("editMajosefa-form");
const editMajosefaTitle = document.getElementById("editMajosefa-title");

const majosefaAddBtn = document.getElementById("addMajosefa-btn");

export function createMajosefaListItem(name, id) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

    listItem.setAttribute('customId', id);
    listItem.id = `majosefa-li-${id}`;
    const majosefaInfo = document.createElement("span");
    majosefaInfo.textContent = `${name}`;

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

        displayEditMajosefa(majosefaInfo.textContent, id);
    });

    removeButton.addEventListener("click", () => {
        const id = listItem.getAttribute('customId');
        listItem.remove();
        fetch(`http://localhost/majosefas/${id}`, {
            method: "DELETE",
            headers : {
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => response.json())
            .then(datos => console.log(datos));
    });

    buttonsDiv.appendChild(updateButton);
    buttonsDiv.appendChild(removeButton);

    listItem.appendChild(majosefaInfo);
    listItem.appendChild(buttonsDiv);

    return listItem;
}

export function displayEditMajosefa(name, id) {

    editMajosefaTitle.setAttribute("customId", id);
    editMajosefaTitle.textContent = `Edit majosefa ${name}`;

    editMajosefaForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-majosefa-edit").value;


        const data = {
            name,
        }

        fetch(`http://localhost/majosefas/${id}`, {
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
                const listItem = createMajosefaListItem(name, age, datos.id);
                majosefaList.appendChild(listItem);
                majosefaForm.reset();
            });

        document.getElementById(`majosefa-li-${id}`).remove()
    });


    majosefaAdd.style.display = "none";
    majosefaEdit.style.display = "block";
}

export function displayAddMajosefa() {
    majosefaAdd.style.display = "block";
    majosefaEdit.style.display = "none";
}



export function majosefaRender() {

    /* TEACHER */


    const majosefaForm = document.getElementById("majosefa-form");
    const majosefaList = document.getElementById("majosefa-list");

    const majosefas = fetch("http://localhost/majosefas/", {
        method: "GET",
        headers : {
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
        .then(data => {

            // Loop through each item in the array
            data.forEach(item => {
                // Do something with each item
                console.log(item);
                console.log("array")

                const listItem = createMajosefaListItem(item.name, item.id);
                majosefaList.appendChild(listItem);
                majosefaForm.reset();

            });
        })

    console.log("olaa2222")

    majosefaForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name-majosefa").value;



        const data = {
            name
        }

        fetch("http://localhost/majosefas/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
                
            },
        })
            .then(response => response.json())
            .then(datos => {
                console.log(datos)
                console.log("POSTTT")
                console.log(`datos.id = ${datos.id}`)
                const listItem = createMajosefaListItem(name, datos.id);
                majosefaList.appendChild(listItem);
                majosefaForm.reset();
            });
    });


    const majosefaAddBtn = document.getElementById("addMajosefa-btn");
    majosefaAddBtn.addEventListener("click", displayAddMajosefa);
}
