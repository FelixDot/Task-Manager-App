import { useState, useEffect } from "react";
import DeleteModal from "./DeleteModal";

const BoardButton = ({ board, selectBoard, deleteBoard }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1550); 
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDelete = () => {
        deleteBoard(board.id);
        setShowDeleteModal(false);
    };

    const handleDeleteButtonClick = () => {
        setShowDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const getBoardNameToShow = () => {
        if (isSmallScreen) {
            return board.boardName.charAt(0);
        } else {
            return board.boardName;
        }
    };

    return (
        <>
            <li key={board.id}>
                <button key={board.id} onClick={() => selectBoard(board)}>
                    {getBoardNameToShow()}
                </button>
                <button className="removeBoardButton" onClick={handleDeleteButtonClick}>X</button>
            </li>
            {showDeleteModal && <DeleteModal title={board.boardName} handleCancelDelete={handleCancelDelete} handleDelete={handleDelete} board={true} />}
        </>
    );
}

export default BoardButton;
