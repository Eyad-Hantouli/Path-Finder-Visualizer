import { useEffect, useState } from "react";

const Cell = ({ row, col, isMouseDown, 
                isDrawing, startNode, finishNode, 
                visited, startPosition, setStartPosition,
                finishPosition, setFinishPosition,
                setStartNode, setFinishNode, reset, BASE_CLASS_NAME}) => {

    const id = `${row}-${col}`;
    const [isBlocked, setIsBlocked] = useState(false);
    const [isWeighted, setIsWeighted] = useState(0);

    useEffect(() => {
        const doUpdate = () => {
            setIsBlocked(false);
            setIsWeighted(0);
        }

        doUpdate();
    }, [reset])

    const isStart = row === startNode.row && col === startNode.col;
    const isFinish = row === finishNode.row && col === finishNode.col;

    const isAllowToBlock = () => {
        return !isStart && !isFinish;
    }

    const handleClick = () => {
        if (isAllowToBlock() && !startPosition && !finishPosition) {
            if (!isDrawing) {
                document.getElementById(id).classList.remove("maze-wall");
                document.getElementById(id).classList.remove("block");
            }
            if (!document.getElementById(id).classList.contains("maze-wall")) {
                setIsBlocked(isDrawing === 1);
                setIsWeighted(curr => isDrawing === 2 ? Math.min(curr + (isDrawing === 2), 9) : 0);
            }
        }

        if (startPosition && !(finishNode.row === row && finishNode.col === col)) {
            setStartNode({row: row, col: col, source: "s1"});
            setStartPosition(false);
            setIsWeighted(false);
            document.getElementById(id).className = BASE_CLASS_NAME;
        }

        else if (finishPosition && !(startNode.row === row && startNode.col === col)) {
            setFinishNode({row: row, col: col, source: "s0"});
            setFinishPosition(false);
            setIsWeighted(false);
            document.getElementById(id).className = BASE_CLASS_NAME;
        }
    };

    const handleMouseOver = () => {
        if (isAllowToBlock() && isMouseDown && !startPosition && !finishPosition) {
            if (!isDrawing) {
                document.getElementById(id).classList.remove("maze-wall");
                document.getElementById(id).classList.remove("block");
            }
            if (!document.getElementById(id).classList.contains("maze-wall")) {
                setIsBlocked(isDrawing === 1);
                setIsWeighted(curr => isDrawing === 2 ? Math.min(curr + (isDrawing === 2), 9) : 0);
            }
        }
    };

    return (
        <td
            key={id}
            id={id}
            className={
                    `grid-item 
                    ${isBlocked || visited[row][col] ? "block" : ""} 
                    weighted-${isWeighted || 0}`
                }
            onClick={handleClick}
            onMouseOver={handleMouseOver}
        >
            {isWeighted > 0 && 
            <div className="weight-value-holder">
                <b className="weight-value">
                    <i class="fa-solid fa-weight-hanging weight-icon"></i>
                    <b>{isWeighted}</b>
                </b>
            </div>
            }
            {isStart 
                ? <div className="icon-holder"><i class="fa-solid fa-circle-play"></i></div> 
                : <></>
            }

            {isFinish
                ? <div className="icon-holder"><i class="fa-solid fa-flag-checkered"></i></div> 
                : <></>
            }
        </td>
    );
};

export default Cell;
