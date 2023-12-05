import {
    createMeetingListItem
} from "./meeting.js"

const submitMettingButton = document.getElementById("meetingSubmitButton");
const reunionesElement = document.getElementById("reuniones");
const cabeceraElement = document.getElementById("cabecera");
const mesElement = document.getElementById("mes");
const meetingList = document.getElementById("meeting-list");

let fechaActual = new Date();
//fechaActual=new Date(2022,11,24);
const idioma = "es";
const intlMes = new Intl.DateTimeFormat(idioma, { month: 'long' });
const intlSemana = new Intl.DateTimeFormat(idioma, { weekday: 'short' });

const diaSemana = [...Array(7).keys()].map((i) => intlSemana.format(new Date(2023, 4, i + 1)));

function asignaCabecera(año, indiceMes) {
    let nombreMes = intlMes.format(new Date(año, indiceMes)).toUpperCase();
    cabeceraElement.textContent = `${nombreMes} ${año}`;
}

function asignaDiaMes(año, indiceMes) {
    const diasEnMes = new Date(año, indiceMes + 1, 0).getDate();
    const dias = [...Array(diasEnMes).keys()];
    let primerDia = new Date(año, indiceMes, 1).getDay();
    if (primerDia === 0) primerDia = 7;

    const claseCSSPrimerDia = `class='primerDia dia' style='--primerDiaMes:${primerDia}'`;
    const htmlDiaSemana = diaSemana.map((nombre) => `<li class='diaNombre'>${nombre}</li>`).join('');
    const cal = dias.map((dia, indice) => `<li ${indice === 0 ? claseCSSPrimerDia : "class='dia'"}>${dia + 1}</li>`).join('');
    mesElement.innerHTML = htmlDiaSemana + " " + cal;
}

function mostarReunionesDia(event) {
    meetingList.innerHTML = '';
    const dia = event.target.textContent;
    // reunionesElement.textContent=`No hay reuniones en el dia ${dia}`;

    const meetingDate = `2023-11-${dia}`;
    fetch(`http://localhost:3000/meetings?meetingDate=${meetingDate}`, {
        method: "GET"
    }).then(response => response.json())
        .then(data => {

            data.forEach(item => {
                const listItem = createMeetingListItem(item.meetingName, item.startHour, item.endHour, item.id, dia);
                meetingList.appendChild(listItem);
                // studentForm.reset();
            });

        });

}


export function setUp() {

    asignaCabecera(fechaActual.getFullYear(), fechaActual.getMonth());
    asignaDiaMes(fechaActual.getFullYear(), fechaActual.getMonth());

    document.querySelectorAll('.dia').forEach(dia => dia.addEventListener('click', mostarReunionesDia));


};
