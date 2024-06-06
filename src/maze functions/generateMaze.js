
const generateRandomNumbers = (x) => {
    const nums = [];
        for (let i = 0; i < x; i++) {
            nums.push(Math.floor(Math.random() * 60));
        }
    return nums;
};


export function generateMaze (ROWS, COLUMNS, startNode, finishNode, clear) {

    const className = "block";

    clear(true);

    for (let i = 0; i < COLUMNS; i++) {
        setTimeout(() => {
            if (
                `${0}-${i}` !== `${startNode.row}-${startNode.col}` && `${0}-${i}` !== `${finishNode.row}-${finishNode.col}`
            )
            document.getElementById(`${0}-${i}`).classList.add(className);
        }, i * 30)
    }
    for (let i = 0; i < ROWS; i++) {
        setTimeout(() => {
            if (
                `${i}-${0}` !== `${startNode.row}-${startNode.col}` && `${i}-${0}` !== `${finishNode.row}-${finishNode.col}`
            )
            document.getElementById(`${i}-${0}`).classList.add(className);
        }, i * 80)
    }
    for (let i = COLUMNS-1; i > -1; i--) {
        setTimeout(() => {
            if (
                `${ROWS-1}-${i}` !== `${startNode.row}-${startNode.col}` && `${ROWS-1}-${i}` !== `${finishNode.row}-${finishNode.col}`
            )
            document.getElementById(`${ROWS-1}-${i}`).classList.add(className);
        }, (COLUMNS - i) * 30)
    }
    for (let i = ROWS-1; i > -1; i--) {
        setTimeout(() => {
            if (
                `${i}-${COLUMNS-1}` !== `${startNode.row}-${startNode.col}` && `${i}-${COLUMNS-1}` !== `${finishNode.row}-${finishNode.col}`
            )
            document.getElementById(`${i}-${COLUMNS-1}`).classList.add(className);
        }, (ROWS - i) * 80)
    }

    setTimeout(() => {
        for (let i = 0; i < ROWS; i++) {
            const nums = generateRandomNumbers(15);
            nums.forEach((j, index) => {
                setTimeout(() => {
                    if (
                        i > 0 && i < ROWS-1 && j > 0 && j < COLUMNS-1 &&
                        `${i}-${j}` !== `${startNode.row}-${startNode.col}` &&
                        `${i}-${j}` !== `${finishNode.row}-${finishNode.col}`
                    ) {
                        document.getElementById(`${i}-${j}`).classList.add(className);
                    }
                }, index * 100); // Delay each step by 500 milliseconds
            });
        }
    }, 2000)
}