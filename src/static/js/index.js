import {
    createStudentListItem,
    displayAddStudent
} from "./student.js";

import {
    teacherRender
} from "./teacher.js";


import {
    displayAddMeeting
} from "./meeting.js";

import * as calendar from "./calendar.js";

import { palomaRender } from "./paloma.js";
import { palonoRender } from "./palono.js";

import { gloriaRender } from "./gloria.js";
import { glorinoRender } from "./glorino.js";
import { majosefaRender } from "./majosefa.js";
import { majosenoRender } from "./majoseno.js";
import { merforRender } from "./merfor.js";
import { merfonoRender } from "./merfono.js";

document.addEventListener('DOMContentLoaded', () => {

   


    /* PALOMA */

    palomaRender();

    // PALONO

    palonoRender();

    /* GLORIA */

    gloriaRender();

    glorinoRender();

    majosefaRender();

    majosenoRender();

    merforRender();

    merfonoRender();


    /* VIEWS */


    // JavaScript code to switch between views

    let presentacionView = document.getElementById("presentacion-view");
    let palomaView = document.getElementById("paloma-view");
    let palonoView = document.getElementById("palono-view");
    let gloriaView = document.getElementById("gloria-view");
    let glorinoView = document.getElementById("glorino-view");
    let majosefaView = document.getElementById("majosefa-view");
    let majosenoView = document.getElementById("majoseno-view");
    let merforView = document.getElementById("merfor-view");
    let merfonoView = document.getElementById("merfono-view");

    let arr = []

    arr.push(presentacionView);
    arr.push(palomaView);
    arr.push(palonoView);
    arr.push(gloriaView);
    arr.push(glorinoView);
    arr.push(majosefaView);
    arr.push(majosenoView);
    arr.push(merforView);
    arr.push(merfonoView);

    

    function showView(vieww) {
        arr.forEach((v) => {
            v.style.display = "none";
        })
        console.log(arr);
        vieww.style.display = "block";
    }



    const presentacionLink = document.querySelector('a[href="#presentacion-view"]');
    
    const palomaLink = document.querySelector('a[href="#paloma-view"]');
    const palonoLink = document.querySelector('a[href="#palono-view"]');
    const gloriaLink = document.querySelector('a[href="#gloria-view"]');
    const glorinoLink = document.querySelector('a[href="#glorino-view"]');
    const majosefaLink = document.querySelector('a[href="#majosefa-view"]');
    const majosenoLink = document.querySelector('a[href="#majoseno-view"]');
    const merforLink = document.querySelector('a[href="#merfor-view"]');
    const merfonoLink = document.querySelector('a[href="#merfono-view"]');

    
    presentacionLink.addEventListener("click", () => showView(presentacionView));

    palomaLink.addEventListener("click", () => showView(palomaView));
    palonoLink.addEventListener("click", () => showView(palonoView));
    gloriaLink.addEventListener("click", () => showView(gloriaView));
    glorinoLink.addEventListener("click", () => showView(glorinoView));
    majosefaLink.addEventListener("click", () => showView(majosefaView));
    majosenoLink.addEventListener("click", () => showView(majosenoView));
    merforLink.addEventListener("click", () => showView(merforView));
    merfonoLink.addEventListener("click", () => showView(merfonoView));

    // Show the student list view by default
    showView(presentacionView);


});


