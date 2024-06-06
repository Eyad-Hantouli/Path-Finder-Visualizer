import PriorityQueue from "../data structures/PriorityQueue";

function manhattanDistance(point1, point2) {
    const distance = Math.abs(point1.row - point2.row) + Math.abs(point1.col - point2.col);
    return distance;
}

function euclideanDistance(point1, point2) {
    const dx = point1.row - point2.row;
    const dy = point1.col - point2.col;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}

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


export function aStar(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation) {
    
    const priorityQueue = new PriorityQueue();
    const parents = new Map();
    const gScore = {}; // New object to store the cost to reach each node

    priorityQueue.push([startNode, 0]); // Initialize the priority queue with the start node and a cost of 0

    parents.set(`${startNode.row}-${startNode.col}`, null);
    gScore[`${startNode.row}-${startNode.col}`] = 0; // The cost to reach the start node is 0

    const isBlock = (id) => {
        return document.getElementById(id).classList.contains("block") || document.getElementById(id).classList.contains("maze-wall");
    }

    function processNextNode() {
        setTimeout(() => {
            if (priorityQueue.size() > 0) {
                const [node, cost] = priorityQueue.pop();

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

                if (getWeightedValue(`${node.row}-${node.col}`) > 0) {
                    document.getElementById(`${node.row}-${node.col}`).classList.add("broken-weight");
                }
                handleVisitCell(node.row, node.col);

                const neighbors = [
                    {row: node.row - 1, col: node.col},
                    {row: node.row + 1, col: node.col},
                    {row: node.row, col: node.col - 1},
                    {row: node.row, col: node.col + 1}
                ];

                for (let i = 0; i < neighbors.length; i++) {
                    const newNode = neighbors[i];

                    if (newNode.row >= 0 && newNode.row < ROWS && newNode.col >= 0 && newNode.col < COLUMNS && !visited[newNode.row][newNode.col] && !isBlock(`${newNode.row}-${newNode.col}`)) {
                        const newCost = gScore[`${node.row}-${node.col}`] + getWeightedValue(`${node.row}-${node.col}`); // Assume a cost of 1 to move to a neighboring node

                        if (!gScore[`${newNode.row}-${newNode.col}`] || newCost < gScore[`${newNode.row}-${newNode.col}`]) {
                            gScore[`${newNode.row}-${newNode.col}`] = newCost;
                            const fScore = newCost + euclideanDistance(newNode, finishNode); // fScore is the sum of the cost to reach the node and the heuristic cost
                            priorityQueue.push([newNode, fScore]);
                            parents.set(`${newNode.row}-${newNode.col}`, `${node.row}-${node.col}`);
                            // visited[newNode.row][newNode.col] = true;
                        }
                    }
                }

                processNextNode();
            }
        }, 0);
    }

    processNextNode();
}
