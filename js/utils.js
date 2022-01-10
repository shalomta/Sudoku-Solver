import { counter, sudoku_ar } from "./app_sudoku.js";
import { isLegal, writePermenantPositions } from "./sudoku_functions.js";

let permenant_counters = [];

// rendering the sudoku to HTML
export const createTable = (sudoku_ar) => {
    // Updating permenant counters
    permenant_counters = writePermenantPositions(sudoku_ar);

    let sudoku_div = document.querySelector("#id_sudoku_div");
    let table = document.createElement("table");
    sudoku_div.append(table);


    sudoku_ar.forEach((row, i) => {
        let tr = document.createElement("tr");
        table.append(tr);
        row.forEach((column, j) => {
            let td = document.createElement("td");
            td.innerHTML = `${column}`;
            td.id = `box_${i}_${j}`;
            td.style.border = '1px solid black';
            if (j == 2 || j == 5) {
                td.style.borderRight = '3px solid black';
            }
            if (i == 2 || i == 5) {
                td.style.borderBottom = '3px solid black';
            }
            tr.append(td);
            td.addEventListener("click", () => {

                // table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.border = "1px solid black";
                // if (counter[1] == 2 || counter[1] == 5) {
                //     table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.borderRight = '3px solid black';
                // }
                // if (counter[0] == 2 || counter[0] == 5) {
                //     table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.borderBottom = '3px solid black';
                // }

                table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.background = "white";
                table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.color = "black";
                counter[0] = i;
                counter[1] = j;
                // table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.border = "3px solid green";
                table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.background = "grey";
                table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.color = "white";
            })
        })
    })

    table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.background = "grey";
    table.querySelector(`#box_${counter[0]}_${counter[1]}`).style.color = "white";
}

// Writing to the screen a given sudoku
export const writeTable = (sudoku_ar) => {
    permenant_counters = writePermenantPositions(sudoku_ar);
    // console.log(permenant_counters);
    emptySudoku();
    for (let row = 0; row < sudoku_ar.length; row++) {
        for (let column = 0; column < sudoku_ar[row].length; column++) {
            // table[row][column] = newTable[row][column];
            document.querySelector(`#box_${row}_${column}`).innerHTML = sudoku_ar[row][column];
        }
    }
}

const emptySudoku = () => {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            // table[row][column] = '';
            document.querySelector(`#box_${row}_${column}`).innerHTML = '';
        }
    }
}

// rendering buttons to HTML
export const createButtons = () => {
    let buttons_div = document.querySelector("#id_buttons_div");
    buttons_div.innerHTML = '';

    for (let i = 1; i <= 9; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.className = "btn btn-secondary m-1";
        buttons_div.append(btn);

        btn.addEventListener("click", () => {
            if (isLegal(i, counter, sudoku_ar)) {
                // console.log(isPermenant());
                // console.log(sudoku_ar);
                if (!isPermenant()){
                    document.querySelector(`#box_${counter[0]}_${counter[1]}`).innerHTML = i;
                    sudoku_ar[counter[0]][counter[1]] = i;
                }
            }
        })
    }

    let btn = document.createElement("button");
    btn.innerHTML = 'X';
    btn.className = "btn btn-danger m-1";
    buttons_div.append(btn);

    btn.addEventListener("click", () => {
        if (!isPermenant()) {
            document.querySelector(`#box_${counter[0]}_${counter[1]}`).innerHTML = '';
            sudoku_ar[counter[0]][counter[1]] = '';
        }
    })
}

// Checking if the current counter is permenant and connot be changed
const isPermenant = () => {
    let _isPermenant = false;
    permenant_counters.forEach(item => {
        if (item.toString() == counter.toString()) {
            _isPermenant = true;
        }
    });
    return _isPermenant;
}

export const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}