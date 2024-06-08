import { useEffect, useState } from "react";
import Cell from "./Cell";
import { Algorithms } from "./enums/algorithmsEnum";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";
import { bidirectionsBfs } from "./algorithms/bidirectionsBfs";
import { generateMaze } from "./maze functions/generateMaze";
import { greedyBestFirstSearch } from "./algorithms/greedyBestFirstSearch";
import { aStar } from "./algorithms/aStar";
import { dijkstra } from "./algorithms/dijkstra";
import Alert from "./Alert";

function App() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDrawing, setIsDrawing] = useState(1);
  const [algorithm, setAlgorithm] = useState(Algorithms.DIJKSTRA);
  const [startPosition, setStartPosition] = useState(false);
  const [finishPosition, setFinishPosition] = useState(false);
  const [startNode, setStartNode] = useState({row: 9, col: 10, source: "s1"});
  const [finishNode, setFinishNode] = useState({row: 9, col: 50, source: "s0"});
  const [update, setUpdate] = useState(false);
  const [reset, setReset] = useState(false);
  
  const [pencilPick, setPicilPick] = useState(false);
  const [weightPick, setWeightPick] = useState(false);
  const [eraserPick, setEraserPick] = useState(false);
  const [showWidthAlert, setShowWidthAlert] = useState(false);
  
  const [shortestPath, setShortestPath] = useState("--");
  const [totalWeight, setTotalWeight] = useState("--");
  
  const MIN_ROWS = 5;
  const MAX_ROWS = 61;

  const MIN_COLUMNS = 5;
  const MAX_COLUMNS = 61;

  const BASE_CLASS_NAME = "grid-item weighted-0";
  const [ROWS, setRows] = useState(20);
  const [COLUMNS, setColumns] = useState(61);
  let visited = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(false));

  let prev = null;

  const checkWidth = () => {
    // window.innerWidth < 1080 && 
    if (!localStorage.getItem("widthAlert")) {
        setShowWidthAlert(true);
    }
    
  };

  const handleEditRows = (e) => {
    const value = e.target.value;
    if (value < MIN_ROWS || value > MAX_ROWS) return;
    setRows(Math.max(5, Math.min(59, value)));

    setStartNode(curr => (
      {
        row: parseInt(value / 2),
        col: 2,
        source: curr.source
      }
    ));
    setFinishNode(curr => (
      {
        row: parseInt(value / 2),
        col: COLUMNS-2,
        source: curr.source
      }
    ));
  }

  const handleEditColumns = (e) => {
    const value = e.target.value;
    if (value < MIN_COLUMNS || value > MAX_COLUMNS) return;
    setColumns(Math.max(5, Math.min(61, value)));

    setStartNode(curr => (
      {
        row: parseInt(ROWS / 2),
        col: 2,
        source: curr.source
      }
    ));
    setFinishNode(curr => (
      {
        row: parseInt(ROWS / 2),
        col: value-2,
        source: curr.source
      }
    ));
  }

  const handleBeforeUnload = (e) => {
    localStorage.removeItem("widthAlert");
    // e.preventDefault(); 
    e.returnValue = ''; 
  }

  useEffect(() => {
    window.addEventListener('resize', checkWidth);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Check the width on initial render
    checkWidth();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkWidth);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  const clear = (all) => {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((e) => {
      e.classList.remove("shortest-path");
      e.classList.remove("visited");
      e.classList.remove("current-node");
      e.classList.remove("s1");
      e.classList.remove("s0");
      e.classList.remove("broken-weight");
    });

    if (all) {
      gridItems.forEach((e) => {
        e.className = BASE_CLASS_NAME;
      })
      setReset(c => !c);
    }

    prev = null;
    visited = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(false));

    setShortestPath("--");
    setTotalWeight("--");
    
  }

  const runShortestPathAnimation = (shortestPath, totalWeight) => {
    shortestPath.forEach((e, index) => {
      setTimeout(() => {
        const htmlElement = document.getElementById(e);
        htmlElement.classList.add("shortest-path");
      }, index * 100); // Delay each step by 500 milliseconds
    });

    setShortestPath(shortestPath.length);
    setTotalWeight(totalWeight - 1);
  };


  const handleVisitCell = (row, col) => {
    if (startNode.row === row && startNode.col === col || finishNode.row === row && finishNode.col === col) return;
    setTimeout(() => {
      setUpdate(c => !c);
      if (prev != null)
        document.getElementById(prev).classList.remove("current-node");
      const htmlElement = document.getElementById(`${row}-${col}`);
      htmlElement.classList.add("visited");
      document.getElementById(`${row}-${col}`).classList.add("current-node");
      prev = `${row}-${col}`;
    }, 200)
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const items = Array.from({ length: ROWS }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: COLUMNS }, (_, colIndex) => (
        <Cell key={`${rowIndex}-${colIndex}`} 
           row={rowIndex} 
           col={colIndex} 
           isMouseDown={isMouseDown} 
           isDrawing={isDrawing}
           startNode={startNode}
           finishNode={finishNode}
           visited = {visited}

           startPosition={startPosition}
           setStartPosition={setStartPosition}
           finishPosition={finishPosition}
           setFinishPosition={setFinishPosition}
           setStartNode={setStartNode}
           setFinishNode={setFinishNode}

           reset={reset}
           BASE_CLASS_NAME={BASE_CLASS_NAME}

        />
      ))}
    </tr>
  ));

  const editStartPosition = (e) => {
    setFinishPosition(false);
    setStartPosition(c => !c);
  } 
  const editFinishPosition = (e) => {
    setStartPosition(false);
    setFinishPosition(c => !c);
  } 

  const run = () => {
    clear(false);
    if (algorithm == Algorithms.BFS) bfs(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation);
    if (algorithm == Algorithms.DFS) dfs(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation);
    if (algorithm == Algorithms.BIDIRECTIONS_BFS) bidirectionsBfs(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation);    
    if (algorithm == Algorithms.GREEDY_BEST_FIRST_SEARCH) greedyBestFirstSearch(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation);    
    if (algorithm == Algorithms.A_STAR) aStar(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation);    
    if (algorithm == Algorithms.DIJKSTRA) dijkstra(startNode, finishNode, ROWS, COLUMNS, handleVisitCell, visited, runShortestPathAnimation);    
  }

  return (<div className="App">
  <Alert showWidthAlert={showWidthAlert} setShowWidthAlert={setShowWidthAlert} />
    <div className="controller-holder">
      <div className="controller container">
        <button onClick={run}>Run <i class="fa-solid fa-play"></i></button>
        <button onClick={(e) => {setIsDrawing(1)}} className={`${pencilPick ? "clicked" : ""}`}>Pencil <i class="fa-solid fa-pencil"></i></button>
        <button onClick={(e) => {setIsDrawing(2)}} className={`${weightPick ? "clicked" : ""}`}>Weight <i class="fa-solid fa-weight-hanging"></i></button>
        <button onClick={(e) => {setIsDrawing(false)}} className={`${eraserPick ? "clicked" : ""}`}>Eraser <i class="fa-solid fa-eraser"></i></button>
        <button onClick={editStartPosition} className={`${startPosition ? "clicked" : ""}`}>Edit Start Position <i class="fa-solid fa-circle-play"></i></button>
        <button onClick={editFinishPosition} className={`${finishPosition ? "clicked" : ""}`}>Edit Finish Position <i class="fa-solid fa-flag-checkered"></i></button>
        <button onClick={() => {clear(true)}}>Clear <i class="fa-solid fa-broom"></i></button>
        <button onClick={() => {generateMaze(ROWS, COLUMNS, startNode, finishNode, clear)}}>Random Maze <i class="fa-solid fa-cubes"></i></button>
        <select id="algorithms" onChange={(e) => {setAlgorithm(e.target.value)}}>
          <option value={Algorithms.DIJKSTRA}>Dijkstra</option>
          <option value={Algorithms.A_STAR}>A*</option>
          <option value={Algorithms.GREEDY_BEST_FIRST_SEARCH}>Greedy Best First Search</option>
          <option value={Algorithms.BIDIRECTIONS_BFS}>Bidirectional BFS</option>
          <option value={Algorithms.BFS}>BFS</option>
          <option value={Algorithms.DFS}>DFS</option>
        </select>
      </div>
    </div>
    <div className="info container">
      { algorithm == Algorithms.DIJKSTRA &&
        <p>Dijkstra's Algorithm is <strong><i>weighted</i></strong> and <strong><i>guarantee</i></strong> the shortest path!</p>
      }
      { algorithm == Algorithms.A_STAR &&
        <p>A* Search Algorithm is <strong><i>weighted</i></strong> and <strong><i>guarantee</i></strong> the shortest path!</p>
      }
      { algorithm == Algorithms.GREEDY_BEST_FIRST_SEARCH &&
        <p>Greedy Best-first Search is <strong><i>weighted</i></strong> and <strong><i>does not guarantee</i></strong> the shortest path!</p>
      }
      { algorithm == Algorithms.BIDIRECTIONS_BFS &&
        <p>Bidirectional BFS Algorithm is <strong><i>unweighted</i></strong> and <strong><i>guarantee</i></strong> the shortest path!</p>
      }
      { algorithm == Algorithms.BFS &&
        <p>Breath-first Search is <strong><i>unweighted</i></strong> and <strong><i>guarantee</i></strong> the shortest path!</p>
      }
      { algorithm == Algorithms.DFS &&
        <p>Depth-first Search is <strong><i>unweighted</i></strong> and <strong><i>does not guarantee</i></strong> the shortest path!</p>
      }
      
      <div className="details">
        <div className="bottom-line-holder">
          <div>
            <b>Shortest path details</b>
            <b>Length: {shortestPath}</b>
            <b>Total weight: {totalWeight}</b>
          </div>

          <div>
            <b>Grid Size: 
              <input type="number" defaultValue={ROWS} onChange={handleEditRows}></input>
              <input type="number" defaultValue={COLUMNS} onChange={handleEditColumns}></input>
            </b>
          </div>
        </div>
      </div>
    </div>
    <table>
      <tbody className="grid-container" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        {/* Create 6000 grid items (100 columns * 60 rows) */}
        {items}
      </tbody>
    </table>
    
    </div>);
}

export default App;
