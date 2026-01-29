const DAYS_WEEK_ENGLISH = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_WEEK_HEBREW = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת'];
const WEEK_ENGLISH = "Week";
const WEEK_HEBREW = 'שבוע';

const LANGUAGES = ['עברית', 'English'];

async function fetchJSONData() {
  try {
    const response = await fetch('./sched.json'); // Fetch the file
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parse the JSON data into a JavaScript object
    console.log(data); // You can now access the data: console.log(data.name);
    return data;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

let sched_data =[]; //schedule from json
let hebrew_lang = true;
let curr_class;
let today;
let today_day;
let whole_week = true;

function setLang() {
    const languages = document.getElementById("lang");
    let lang = languages.value;
    if (lang == 0) 
        hebrew_lang = true;
    else
        hebrew_lang = false;

    fillDays();
    fillScheduleTable();
}

function fillLang() {
    const languages = document.getElementById("lang");
    for (let i = 0; i < LANGUAGES.length; i++) {
        const el = document.createElement("option");
        el.value = i;
        el.innerText = LANGUAGES[i];
        languages.appendChild(el);
    }
    languages.value = 0;
    hebrew_lang = true;

    languages.addEventListener("change", setLang);
}

function fillScheduleTable() {
    const table = document.getElementById("sched_table");
    table.innerHTML = "";
    let lessons_count = 0;
    const days_count = sched_data[curr_class].schedule.length;
    if (whole_week) {
        console.log(days_count);
        for (let i = 0; i < days_count; i++) {
            lessons_count = Math.max(lessons_count, sched_data[curr_class].schedule[i].length);
        }
    } else
        lessons_count = sched_data[curr_class].schedule[today_day].length;
    for (let row = 0; row < lessons_count; row++) {
        let new_row = table.insertRow(-1);
        if (whole_week) {
            for (let column = 0; column < days_count; column++) {
            let new_cell;
                if (hebrew_lang)
                    new_cell = new_row.insertCell(0);
                else
                    new_cell = new_row.insertCell(-1);
                new_cell.innerHTML = sched_data[curr_class].schedule[column][row];
            }
        } else {
            let new_cell;
                new_cell = new_row.insertCell(-1);
                new_cell.innerHTML = sched_data[curr_class].schedule[today_day][row];
        }
    }
}

function setSelClass() {
    let sel_class = document.getElementById("child_class");
    curr_class = sel_class.value;
    fillScheduleTable();
}

function fillClsses() { //fill <select> with all classes to choose one
    let sel_class = document.getElementById("child_class");
    for (let i = 0; i < sched_data.length; i++) {
        const el = document.createElement("option");
        el.value = i;
        el.textContent = sched_data[i].child_class;
        sel_class.appendChild(el);
    }
    curr_class = 0;
    sel_class.value = curr_class;
    sel_class.addEventListener("change", setSelClass);
}

function setSelDay() {
    let sel_days = document.getElementById("days_week");
    today_day = sel_days.value;
    if (today_day != sched_data[curr_class].schedule.length)
        whole_week = false;
    else
        whole_week = true;
    fillScheduleTable();
}

function fillDays() { //fill <select> for day for schedule
    today = new Date();
    console.log(today);
    today_day = today.getDay();
    console.log(today.getDay());

    let sel_days = document.getElementById("days_week");
    sel_days.innerHTML = "";
    for (let i = 0; i < sched_data[curr_class].schedule.length; i++) {
        const el = document.createElement("option");
        el.value = i;
        if (hebrew_lang)
            el.textContent = DAYS_WEEK_HEBREW[i];
        else 
            el.textContent = DAYS_WEEK_ENGLISH[i];
        sel_days.appendChild(el);
    }
    const el = document.createElement("option");
    el.value = sched_data[curr_class].schedule.length;
    console.log(el.value);
    if (hebrew_lang)
        el.textContent = WEEK_HEBREW;
    else 
        el.textContent = WEEK_ENGLISH;
    sel_days.appendChild(el);

    sel_days.value = sched_data[curr_class].schedule.length;
    whole_week = true;
    
    sel_days.addEventListener("change", setSelDay);
}

function dataFetched(data) {
    sched_data = data;

    fillLang();

    fillClsses();

    fillDays();
    
    fillScheduleTable();
}

fetchJSONData().then(data => {
    dataFetched(data)}
);

