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

function dataFetched(data) {
    console.log("test1");
    sched_data = data;
    document.getElementById("title").innerHTML = sched_data[0].id;
    const table = document.getElementById("sched_table");
    console.log("test2");
    const days_count = sched_data[0].schedule.length;
    console.log(days_count);
    let lessons_count = 0;
    for (let i = 0; i < days_count; i++) {
        lessons_count = Math.max(lessons_count, sched_data[0].schedule[i].length);
    }
    for (let row = 0; row < lessons_count; row++) {
        let new_row = table.insertRow(-1);
        for (let column = 0; column < days_count; column++) {
            let new_cell;
            if (hebrew_lang)
                new_cell = new_row.insertCell(0);
            else
                new_cell = new_row.insertCell(-1);
            new_cell.innerHTML = sched_data[0].schedule[column][row];
        }
    }


}

fetchJSONData().then(data => {
    dataFetched(data)}
);

