import { isLegal, writePermenantPositions } from "./js/sudoku_functions.js";

const solve = (table) => {
    if (!solveRecursive([0, 0], table, writePermenantPositions(table))) {
        return {
            success: false,
            table: table
        };
    }
    return {
        success: true,
        table: table
    };
}

// Solving a given sudoku using bactrack algorithm
const solveRecursive = (position, table, permenant_positions) => {
    if (position[0] == -1) {
        return true;
    }

    let next_position;
    if (position[1] < 8) {
        next_position = [position[0], position[1] + 1];
    }
    else if (position[0] < 8) {
        next_position = [position[0] + 1, 0];
    }
    else {
        next_position = [-1, -1];
    }

    let isPermenant = false;
    permenant_positions.forEach(item => {
        if (item.toString() == position.toString()) {
            isPermenant = true;
        }
    });
    if (isPermenant) {
        return solveRecursive(next_position, table, permenant_positions);
    }

    for (let i = 1; i <= 9; i++) {
        if (isLegal(i, position, table)) {
            table[position[0]][position[1]] = i;
            // document.querySelector(`#box_${position[0]}_${position[1]}`).innerHTML = i;
            // debugger;
            // console.log("1");
            if (solveRecursive(next_position, table, permenant_positions)) {
                return true;
            }

        }
    }

    // document.querySelector(`#box_${position[0]}_${position[1]}`).innerHTML = '';
    table[position[0]][position[1]] = '';
    // sleep(500);    
    return false;
}


self.onmessage = event => {
    const table = event.data;
    console.log("Worker activated");
    const result = solve(table);

    self.postMessage(result);
    self.close();
}