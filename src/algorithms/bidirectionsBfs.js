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

export function bidirectionsBfs(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation) {
    
    const queueStart = new Queue();
    const queueFinish = new Queue();
    const parents = new Map();

    queueStart.push(startNode);
    queueFinish.push(finishNode);

    visited[finishNode.row][finishNode.col] = true;
    visited[startNode.row][startNode.col] = true;

    document.getElementById(`${startNode.row}-${startNode.col}`).classList.add(startNode.source);
    document.getElementById(`${finishNode.row}-${finishNode.col}`).classList.add(finishNode.source);

    parents.set(`${startNode.row}-${startNode.col}`, null);

    const isBlock = (id) => {
        return document.getElementById(id).classList.contains("block") || document.getElementById(id).classList.contains("maze-wall");
    } 

    const reflect = {"s1": "s0", "s0": "s1"};

    const check = (node) => {
        return node.row + 1 < ROWS &&
        document.getElementById(`${node.row+1}-${node.col}`).classList.contains(reflect[node.source]) ? `${node.row+1}-${node.col}`:
        node.row - 1 > -1 &&
        document.getElementById(`${node.row-1}-${node.col}`).classList.contains(reflect[node.source]) ? `${node.row-1}-${node.col}`:
        node.col + 1 < COLUMNS &&
        document.getElementById(`${node.row}-${node.col+1}`).classList.contains(reflect[node.source]) ? `${node.row}-${node.col+1}`:
        node.col - 1 > -1 &&
        document.getElementById(`${node.row}-${node.col-1}`).classList.contains(reflect[node.source]) ? `${node.row}-${node.col-1}`:
        false
    }

    function processNextNode() {
        setTimeout(() => {
            if (queueStart.size() > 0 && queueFinish.size() > 0) {
                const node1 = queueStart.pop();
                const node2 = queueFinish.pop();
                
                visited[node1.row][node1.col] = true;
                visited[node2.row][node2.col] = true;
                
                const connect = check(node1) || check(node2);
                
                if (connect) {
                    
                    let shortestPath = [];
                    
                    let curr = check(node1) ? `${node1.row}-${node1.col}` : `${node2.row}-${node2.col}`;
                    let totalWeight = 1;
                    while (parents.get(curr) != null) {
                        totalWeight += getWeightedValue(curr);
                        shortestPath.push(curr);
                        curr = parents.get(curr);
                    }
                    let shortestPath2 = [];
                    curr = connect;
                    
                    while (parents.get(curr) != null) {
                        totalWeight += getWeightedValue(curr);
                        shortestPath2.push(curr);
                        curr = parents.get(curr);
                    }

                    shortestPath2 = shortestPath2.reverse();
                    
                    // shortestPath.shift();
                    runShortestPathAnimation(shortestPath2.concat(shortestPath), totalWeight);
                    return;
                }

                
                if (node1.row-1 > -1 && !visited[node1.row-1][node1.col] && !isBlock(`${node1.row-1}-${node1.col}`)) {
                    parents.set(`${node1.row-1}-${node1.col}`, `${node1.row}-${node1.col}`);
                    queueStart.push({row: node1.row - 1, col: node1.col, source: node1.source});
                    visited[node1.row-1][node1.col] = true;
                    document.getElementById(`${node1.row-1}-${node1.col}`).classList.add(node1.source);
                    handleVisitCell(node1.row-1, node1.col);
                }
                
                if (node1.row+1 < ROWS && !visited[node1.row+1][node1.col] && !isBlock(`${node1.row+1}-${node1.col}`)) {
                    parents.set(`${node1.row+1}-${node1.col}`, `${node1.row}-${node1.col}`);
                    queueStart.push({row: node1.row + 1, col: node1.col, source: node1.source});
                    visited[node1.row+1][node1.col] = true;
                    document.getElementById(`${node1.row+1}-${node1.col}`).classList.add(node1.source);
                    handleVisitCell(node1.row+1, node1.col);
                }
                
                
                if (node1.col-1 > -1 && !visited[node1.row][node1.col-1] && !isBlock(`${node1.row}-${node1.col-1}`)) {
                    parents.set(`${node1.row}-${node1.col-1}`, `${node1.row}-${node1.col}`);
                    queueStart.push({row: node1.row, col: node1.col - 1, source: node1.source});
                    visited[node1.row][node1.col-1] = true;
                    document.getElementById(`${node1.row}-${node1.col-1}`).classList.add(node1.source);
                    handleVisitCell(node1.row, node1.col-1);
                }
                
                if (node1.col+1 < COLUMNS && !visited[node1.row][node1.col+1] && !isBlock(`${node1.row}-${node1.col+1}`)) {
                    parents.set(`${node1.row}-${node1.col+1}`, `${node1.row}-${node1.col}`);
                    queueStart.push({row: node1.row, col: node1.col + 1, source: node1.source});
                    visited[node1.row][node1.col+1] = true;
                    document.getElementById(`${node1.row}-${node1.col+1}`).classList.add(node1.source);
                    handleVisitCell(node1.row, node1.col+1);
                }
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //
                //

                if (node2.row-1 > -1 && !visited[node2.row-1][node2.col] && !isBlock(`${node2.row-1}-${node2.col}`)) {
                    parents.set(`${node2.row-1}-${node2.col}`, `${node2.row}-${node2.col}`);
                    queueFinish.push({row: node2.row - 1, col: node2.col, source: node2.source});
                    visited[node2.row-1][node2.col] = true;
                    document.getElementById(`${node2.row-1}-${node2.col}`).classList.add(node2.source);
                    handleVisitCell(node2.row-1, node2.col);
                }
                
                if (node2.row+1 < ROWS && !visited[node2.row+1][node2.col] && !isBlock(`${node2.row+1}-${node2.col}`)) {
                    parents.set(`${node2.row+1}-${node2.col}`, `${node2.row}-${node2.col}`);
                    queueFinish.push({row: node2.row + 1, col: node2.col, source: node2.source});
                    visited[node2.row+1][node2.col] = true;
                    document.getElementById(`${node2.row+1}-${node2.col}`).classList.add(node2.source);
                    handleVisitCell(node2.row+1, node2.col);
                }
                
                
                if (node2.col-1 > -1 && !visited[node2.row][node2.col-1] && !isBlock(`${node2.row}-${node2.col-1}`)) {
                    parents.set(`${node2.row}-${node2.col-1}`, `${node2.row}-${node2.col}`);
                    queueFinish.push({row: node2.row, col: node2.col - 1, source: node2.source});
                    visited[node2.row][node2.col-1] = true;
                    document.getElementById(`${node2.row}-${node2.col-1}`).classList.add(node2.source);
                    handleVisitCell(node2.row, node2.col-1);
                }
                
                if (node2.col+1 < COLUMNS && !visited[node2.row][node2.col+1] && !isBlock(`${node2.row}-${node2.col+1}`)) {
                    parents.set(`${node2.row}-${node2.col+1}`, `${node2.row}-${node2.col}`);
                    queueFinish.push({row: node2.row, col: node2.col + 1, source: node2.source});
                    visited[node2.row][node2.col+1] = true;
                    document.getElementById(`${node2.row}-${node2.col+1}`).classList.add(node2.source);
                    handleVisitCell(node2.row, node2.col+1);
                }
                
                processNextNode(); // Call the function recursively to process the next node
            }
        }, 0);
    }

    processNextNode(); // Start the process
}
