//inputs
let inputText = document.getElementById("inputText");
let inputDate = document.getElementById("inputDate");
let inputTime = document.getElementById("inputTime");
//outputs
let noteArea = document.getElementById("noteArea");
let textOutput = document.getElementById("textOutput");
let dateOutput = document.getElementById("dateOutput");
let timeOutput = document.getElementById("timeOutput");

var notes = [];

if (localStorage.notes) {
    notes = JSON.parse(localStorage.notes);
    fillBoard(1);
}

function fillBoard(del) {
    noteArea.innerHTML = "";

    for (let i in notes) {

        if (i == (notes.length - 1) && del == 0) {
            noteArea.innerHTML += `<div class="note" id="lastNote">
            <button title="delete" class="delete" onclick="deleteNote(${i})">X</button>
    
            <span class="textOutput">${notes[i].text}</span>
            <div>
                <span class="dateOutput">${notes[i].d}/${notes[i].m}/${notes[i].y}</span>
                <br>
                <span class="timeOutput">${notes[i].time}</span>
            </div>`;
        }
        else {
            noteArea.innerHTML += `<div class="note">
        <button title="delete" class="delete" onclick="deleteNote(${i})">X</button>

        <span class="textOutput">${notes[i].text}</span>
        <div>
            <span class="dateOutput">${notes[i].d}/${notes[i].m}/${notes[i].y}</span>
            <br>
            <span class="timeOutput">${notes[i].time}</span>
        </div>`;
        }
    }

    localStorage.notes = JSON.stringify(notes);
    inputText.value = "";
    inputDate.value = ""
    //    inputDate.value = "2022-06-05";
    inputTime.value = "";
    //    inputText.focus();
    inputText.focus();
}

function addNote() {

    let curr = new Date(); // current date
    let day = curr.getDate();
    let month = curr.getMonth() + 1;
    let year = curr.getFullYear();
    let hour = curr.getHours();
    let minute = curr.getMinutes();
    //full names = current date

    let cal = new Date(inputDate.value);
    let d = cal.getDate();
    let m = cal.getMonth() + 1;
    let y = cal.getFullYear();
    let h = inputTime.value.slice(0, 2);
    let mi = inputTime.value.slice(3, 5);


    if (inputText.value == "") {
        inputText.style = "border: 2px solid red;";
        let myTimeOut = setTimeout(clearErrors, 1000);
        inputText.focus();
    }
    else if (inputDate.value == "" || (y > "2100") ||
        (y < year) || (y == year && m < month) ||
        (y == year && m == month && d < day)) {
        inputDate.style = "color: red; font-weight: bold; border: 1px solid red;";
        let myTimeOut = setTimeout(clearErrors, 1000);
        inputDate.focus();
    }
    else if (inputTime.value == "" || /* y > "2100" || */
        (y >= year && m == month && d == day && h < hour) ||
        (y >= year && m == month && d == day && h >= hour && mi < minute)) {
        inputTime.style = "color: red; font-weight: bold; border: 1px solid red";
        let myTimeOut = setTimeout(clearErrors, 1000);
        inputTime.focus();
    }
    else {
        if (d < 10) d = "0" + d;
        if (m < 10) m = "0" + m;
        notes[notes.length] = new Note(inputText.value, d, m, y, inputTime.value);
        fillBoard(0);
        inputText.focus();
    }
}

function clearErrors() {
    inputText.style = "border: 0px";
    inputDate.style = "color: black";
    inputTime.style = "color: black";
}

function deleteNote(num) {
    if (num == 0) {
        notes.shift();
    }
    else {
        notes.splice(num, 1);
    }
    fillBoard(1);
}

function clearForm() {
    inputText.value = "";
    inputDate.value = "";
    inputTime.value = "";
    inputText.focus();
}

function cleanAll() {
    localStorage.clear();
    notes = [];
    fillBoard();
    inputText.focus();
}

