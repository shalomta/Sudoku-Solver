// Solving a given sudoku using the solveRecursive function
// import {sleep} from "./utils.js";

// let worker = new Worker("./worker.js");


// Checking if a given number already exists in the same row, column or square
export const isLegal = (number, position, table) => {
    // checking if the number already exist in the same row or column
    for (let j = 0; j < 9; j++) {
        if (table[position[0]][j] == number || table[j][position[1]] == number) {
            return false;
        }
    }
    //checking if the number already exist in the same square
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            if (table[j + 3 * Math.floor(position[0] / 3)][k + 3 * Math.floor(position[1] / 3)] == number) {
                return false;
            }
        }
    }
    return true;
}

// Coloring the cells that has numbers in them 
export const colorPermenantPositions = (sudoku_ar) => {
    console.log(sudoku_ar);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku_ar[i][j] == '') {
                document.querySelector(`#box_${i}_${j}`).style.fontWeight = "normal";
            }
            else{
                document.querySelector(`#box_${i}_${j}`).style.fontWeight = "bold";
            }
        }
    }
}

// Returning an array with the positions of the non empty cells 
export const writePermenantPositions = (sudoku_ar) => {
    console.log(sudoku_ar);
    let permenant_counters = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku_ar[i][j] != '') {
                permenant_counters.push([i, j]);
            }
        }
    }
    return permenant_counters;
}
