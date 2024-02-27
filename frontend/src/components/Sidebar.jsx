import { useState } from "react";
import NewBoardModal from "./NewBoardModal";
import "./sidebar.css";
import boardsService from "../service/boards"
import BoardButton from "./BoardButton";
const Sidebar = ({ boards, setBoards, setBoard, logout, user }) => {
    const [showAddPopup, setShowAddPoppup] = useState(false);
    const showPopup = () => {
        setShowAddPoppup((n) => !n);
    };

    const selectBoard = (board) => {
        setBoard(board)
    }


    const addBoard = async (boardObject) => {
        const newBoard = await boardsService.createNewBoard(boardObject)
        setBoards(boards.concat(newBoard))
    }

    const removeBoard = async (boardId) => {
        try {
            await boardsService.deleteBoard(boardId)
            const updatedBoards = boards.filter(b => b.id !== boardId)
            setBoards(updatedBoards)
            setBoard()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="nav">
            <h1>Task Manager App</h1>
            <h3>Welcome {user.username}</h3>
            <ul>
                {boards.map((board) => {
                    return (
                        <BoardButton key={board.id} board={board} selectBoard={selectBoard} deleteBoard={removeBoard} />
                    )
                })}
            </ul>
            <button className="BoardTitle" onClick={() => showPopup()}>
                Add new board
            </button>
            {showAddPopup && (
                <NewBoardModal
                    addBoard={addBoard}
                    showPopup={showPopup}
                    boards={boards}
                />
            )}
            <button className="logoutButton" onClick={(e) => logout(e)}>logout</button>
        </nav>
    );
};

export default Sidebar;
