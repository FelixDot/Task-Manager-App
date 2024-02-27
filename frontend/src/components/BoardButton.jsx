import { useState } from "react";
import DeleteModal from "./DeleteModal";

const BoardButton = ({ board, selectBoard, deleteBoard }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        deleteBoard(board.id)
        setShowDeleteModal(false);

    }

    const handleDeleteButtonClick = () => {
        setShowDeleteModal(true);

    }
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };
    return (
        <>
            <li key={board.id}>
                <button key={board.id} onClick={() => selectBoard(board)}>
                    {board.boardName}
                </button>
                <button className="removeBoardButton" onClick={handleDeleteButtonClick}>X</button>
            </li>
            {showDeleteModal && <DeleteModal title={board.boardName} handleCancelDelete={handleCancelDelete} handleDelete={handleDelete} board={true} />}
        </>
    );
}

export default BoardButton