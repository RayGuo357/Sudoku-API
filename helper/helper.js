const randomBoard = (arr) => {
    let x = 1
    if (x > arr.length) x = arr.length
    if (x < 0) x = 0
    let result = []
    for (let i = 0; i < x; i++) {
        let temp = arr[Math.floor(Math.random() * arr.length)];
        if (!result.includes(temp)) {
            result.push(temp)
        } else {
            i--
        }
    }
    return result;
}


const getTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var time = String(today.getHours()).padStart(2, '0') + ":"
        + String(today.getMinutes()).padStart(2, '0') + ":"
        + String(today.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${time}`
}

const nextEmptySpot = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return [i, j];
        }
    }
    return [-1, -1];
}

const checkRow = (board, row, value) => {
    for (let i = 0; i < board[row].length; i++) {
        if (board[row][i] === value) return false;
    }

    return true;
}

const checkColumn = (board, column, value) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][column] === value) return false;
    }

    return true;
}

const checkSquare = (board, row, column, value) => {
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(column / 3) * 3;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[boxRow + r][boxCol + c] === value) return false;
        }
    }

    return true;
}

const checkValue = (board, row, column, value) => {
    return checkRow(board, row, value) &&
        checkColumn(board, column, value) &&
        checkSquare(board, row, column, value);
};

const solver = (board) => {
    let emptySpot = nextEmptySpot(board);
    let row = emptySpot[0];
    let col = emptySpot[1];

    // there is no more empty spots
    if (row === -1) {
        return board;
    }

    for (let num = 1; num <= 9; num++) {
        if (checkValue(board, row, col, num)) {
            board[row][col] = num;
            solver(board);
        }
    }

    if (nextEmptySpot(board)[0] !== -1)
        board[row][col] = 0;

    return board;

}

function validSudoku(board) {
    for (let i = 0; i < 9; i++) {
        let row = new Set(),
            col = new Set(),
            box = new Set();

        for (let j = 0; j < 9; j++) {
            let _row = board[i][j];
            let _col = board[j][i];
            let _box = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)]

            if (_row != 0) {
                if (row.has(_row)) return false;
                row.add(_row);
            }
            if (_col != 0) {
                if (col.has(_col)) return false;
                col.add(_col);
            }

            if (_box != 0) {
                if (box.has(_box)) return false;
                box.add(_box);
            }
        }
    }
    return true
}

module.exports = { randomBoard, getTodaysDate, solver, validSudoku }