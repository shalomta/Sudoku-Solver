import { isLegal, colorPermenantPositions } from "./sudoku_functions.js";
import { sleep, createTable, createButtons, writeTable } from "./utils.js";

// initalized sudoku array
let filled_sudoku_ar = [
    [[7], [2], [], [9], [4], [5], [], [3], []],
    [[], [3], [9], [2], [], [6], [], [], [4]],
    [[1], [5], [], [7], [3], [8], [6], [9], [2]],
    [[6], [4], [7], [1], [], [3], [], [2], []],
    [[9], [8], [2], [6], [5], [7], [4], [1], [3]],
    [[3], [], [5], [4], [9], [2], [7], [], [6]],
    [[4], [9], [3], [], [6], [1], [], [5], [7]],
    [[5], [7], [], [3], [2], [], [8], [6], [9]],
    [[], [], [8], [5], [7], [9], [3], [4], []]
];

let sudoku_ar2 = [
    [[3], [], [6], [5], [], [8], [4], [], []],
    [[5], [2], [], [], [], [], [], [], []],
    [[], [8], [7], [], [], [], [], [3], [1]],
    [[], [], [3], [], [1], [], [], [8], []],
    [9, [], [], [8], [6], [3], [], [], [5]],
    [[], [5], [], [], [9], [], [6], [], []],
    [[1], [3], [], [], [], [], [2], [5], []],
    [[], [], [], [], [], [], [], [7], [4]],
    [[], [], [5], [2], [], [6], [3], [], []]
]

let sudoku_ar3 = [
    [[], [2], [], [], [3], [], [], [4], []],
    [[6], [], [], [], [], [], [], [], [3]],
    [[], [], [4], [], [], [], [5], [], []],
    [[], [], [], [8], [], [6], [], [], []],
    [[8], [], [], [], [1], [], [], [], [6]],
    [[], [], [], [7], [], [5], [], [], []],
    [[], [], [7], [], [], [], [6], [], []],
    [[4], [], [], [], [], [], [], [], [8]],
    [[], [3], [], [], [4], [], [], [2], []]
]

// empty sudoku array
let empty_sudoku_ar = [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []]
];

let sudoku_ar = sudoku_ar3;

export let counter = [0, 0];
// export let permenant_counters = [];

window.onload = () => {
    init();
}

const init = () => {
    createTable(sudoku_ar);
    writeTable(sudoku_ar, sudoku_ar2);
    // writePermenantCounters();
    createButtons(sudoku_ar);
    declareEvents();
}

const declareEvents = () => {
    document.querySelector("#id_solve_btn").addEventListener("click", () => {
        // writePermenantCounters();
        // Making the selected box frame black again
        // document.querySelector(`#box_${counter[0]}_${counter[1]}`).style.border = '1px solid black';
        // if (counter[1] == 2 || counter[1] == 5) {
        //     document.querySelector(`#box_${counter[0]}_${counter[1]}`).style.borderRight = '3px solid black';
        // }
        // if (counter[0] == 2 || counter[0] == 5) {
        //     document.querySelector(`#box_${counter[0]}_${counter[1]}`).style.borderBottom = '3px solid black';
        // }

        document.querySelector(`#box_${counter[0]}_${counter[1]}`).style.background = "white";
        document.querySelector(`#box_${counter[0]}_${counter[1]}`).style.color = "black";

        // solve(sudoku_ar);

        document.querySelector("#light_box").style.display = "flex";
        colorPermenantPositions(sudoku_ar);
        console.log(sudoku_ar);

        let worker = new Worker("./worker.js", { type: "module" });
        worker.onmessage = event => {
            document.querySelector("#light_box").style.display = "none";
            let sudoku_obj = event.data;
            if (sudoku_obj.success) {
                writeTable(sudoku_obj.table);
            }
            else {
                alert("This sudoku cannot be solved");
            }
        }

        // Adding an event listener to the light box close button so that it will
        // terminate the worker when clicked
        document.querySelector("#id_btn_light_box").addEventListener("click", () => {
            worker.terminate();
            document.querySelector("#light_box").style.display = "none";
        })
        worker.postMessage(sudoku_ar);
        // writeTable(sudoku_ar);
    });
}
