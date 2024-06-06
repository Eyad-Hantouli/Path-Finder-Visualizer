import Queue from "../data structures/Queue";

function getWeightedValue(r) {
    // Select the element with the class name `r${r}`
    const element = document.getElementById(`${r}`);
    if (!element) {
      return null; // Return null or handle the case where the element is not found
    }
  
    // Find the class that starts with `weighted-`
    const weightedClass = Array.from(element.classList).find(cls => cls.startsWith('weighted-'));
    if (!weightedClass) {
      return null; // Return null or handle the case where the weighted class is not found
    }
  
    // Extract the numeric value from the `weighted-` class name
    const weightedValue = parseInt(weightedClass.split('-')[1], 10);
    
    return weightedValue + 1;
  }

export function bfs(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation) {
    
    const queue = new Queue();
    const parents = new Map();

    queue.push(startNode);

    parents.set(`${startNode.row}-${startNode.col}`, null);

    const isBlock = (id) => {
        return document.getElementById(id).classList.contains("block") || document.getElementById(id).classList.contains("maze-wall");
    } 

    function processNextNode() {
        setTimeout(() => {
            if (queue.size() > 0) {
                const node = queue.pop();
                
                visited[node.row][node.col] = true;
                
                if (node.row === finishNode.row && node.col === finishNode.col) {
                    
                    let shortestPath = [];
                    
                    let curr = `${node.row}-${node.col}`;
                    let totalWeight = 0;
                    
                    while (parents.get(curr) != null) {
                        totalWeight += getWeightedValue(curr);
                        shortestPath.push(curr);
                        curr = parents.get(curr);
                    }
                    
                    shortestPath.shift();
                    runShortestPathAnimation(shortestPath, totalWeight);
                    return;
                }

                handleVisitCell(node.row, node.col);
                
                if (node.row-1 > -1 && !visited[node.row-1][node.col] && !isBlock(`${node.row-1}-${node.col}`)) {
                    parents.set(`${node.row-1}-${node.col}`, `${node.row}-${node.col}`);
                    queue.push({row: node.row - 1, col: node.col});
                    visited[node.row-1][node.col] = true;
                }
                
                if (node.row+1 < ROWS && !visited[node.row+1][node.col] && !isBlock(`${node.row+1}-${node.col}`)) {
                    parents.set(`${node.row+1}-${node.col}`, `${node.row}-${node.col}`);
                    queue.push({row: node.row + 1, col: node.col});
                    visited[node.row+1][node.col] = true;
                }
                
                
                if (node.col-1 > -1 && !visited[node.row][node.col-1] && !isBlock(`${node.row}-${node.col-1}`)) {
                    parents.set(`${node.row}-${node.col-1}`, `${node.row}-${node.col}`);
                    queue.push({row: node.row, col: node.col - 1});
                    visited[node.row][node.col-1] = true;
                }
                
                if (node.col+1 < COLUMNS && !visited[node.row][node.col+1] && !isBlock(`${node.row}-${node.col+1}`)) {
                    parents.set(`${node.row}-${node.col+1}`, `${node.row}-${node.col}`);
                    queue.push({row: node.row, col: node.col + 1});
                    visited[node.row][node.col+1] = true;
                }
                
                processNextNode(); // Call the function recursively to process the next node
            }
        }, 0);
    }

    console.time("processNextNode");
    processNextNode(); // Start the process
    console.timeEnd("processNextNode");
}
