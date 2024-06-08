import { useState } from "react";

const Alert = ({ showWidthAlert, setShowWidthAlert }) => {

    const [page, setPage] = useState(1);

    if (!showWidthAlert) return <></>

    return (
        <>
            <div className="alert-background" onClick={() => {localStorage.setItem("widthAlert", true); setShowWidthAlert(false);}}></div>
            <div className="alert-holder">
                <p className="alert-text">
                {page === 1 &&
                    <>
                        <h3>Welcome to my path finder project,</h3><br />
                        Description:<br />
                        Project aims to visualize the most popular path finding algorithms.<br />
                        <br />
                    </>
                }
                {page === 2 &&
                    <>
                        <h3>Features:</h3><br />
                        - Draw walls.<br />
                        - Put weights.<br />
                        - Generate a random maze.<br />
                        - Dynamic grid size<br />
                        <br />
                    </>
                }
                {page === 3 &&
                    <>
                        <h3>How to use:</h3><br />
                        Draw some walls, put some weights, select an algorithm, run, and enjoy.<br />
                        <br />
                        <h3>Notes:</h3><br />
                        - You can edit the grid size to be suitable for your screen size.<br />
                        <br />
                        &copy; Iyad Hantouli - 2024<br />
                    </>
                }
                </p>
                <div className="alert-button-holder">
                    <button className="alert-button" onClick={() => {
                        if (page === 3) {
                            localStorage.setItem("widthAlert", true);
                            setShowWidthAlert(false);
                        }
                        else {
                            setPage(curr => curr+1);
                        }
                    }}>
                        {page === 3 ? <>Start</> : <>Next</>}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Alert;
