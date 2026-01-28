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

function fillScheduleTable() {
    const table = document.getElementById("sched_table");
    table.innerHTML = "";
    const days_count = sched_data[curr_class].schedule.length;
    console.log(days_count);
    let lessons_count = 0;
    for (let i = 0; i < days_count; i++) {
        lessons_count = Math.max(lessons_count, sched_data[curr_class].schedule[i].length);
    }
    for (let row = 0; row < lessons_count; row++) {
        let new_row = table.insertRow(-1);
        for (let column = 0; column < days_count; column++) {
            let new_cell;
            if (hebrew_lang)
                new_cell = new_row.insertCell(0);
            else
                new_cell = new_row.insertCell(-1);
            new_cell.innerHTML = sched_data[curr_class].schedule[column][row];
        }
    }
}

function dataFetched(data) {
    sched_data = data;

    let sel_class = document.getElementById("child_class");
    for (let i = 0; i < sched_data.length; i++) {
        const el = document.createElement("option");
        el.value = i;
        el.textContent = sched_data[i].child_class;
        sel_class.appendChild(el);
    }
    curr_class = 0;
    sel_class.value = curr_class;
    sel_class.addEventListener("change", fillScheduleTable);
    
    fillScheduleTable();
}

fetchJSONData().then(data => {
    dataFetched(data)}
);

