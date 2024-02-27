import { useState } from "react";
import NewBoardModal from "./NewBoardModal";
import "./sidebar.css";
import boardsService from "../service/boards"
const Sidebar = ({ boards, setBoards, setBoard ,logout}) => {
  const [showAddPopup, setShowAddPoppup] = useState(true);
  const showPopup = () => {
    setShowAddPoppup((n) => !n);
  };

  const selectBoard = (board)=>{
    setBoard(board)
  }


  const addBoard = async(boardObject) =>{
    const newBoard = await boardsService.createNewBoard(boardObject)
    setBoards(boards.concat(newBoard))
    console.log('hello')
  }

  const removeBoard = async(boardId)=>{
    try{
    await boardsService.deleteBoard(boardId)
    const updatedBoards = boards.filter(b => b.id !== boardId)
    setBoards(updatedBoards)
    setBoard()
    }catch(error){
        console.log(error)
    }
    
    

  }

  return (
    <nav className="nav">
      Tast Manager App
      <ul>
        {boards.map((board) => {
          return (
            <li key={board.id}>
              <button key={board.id} onClick={() => selectBoard(board)}>
                {board.boardName}
              </button>
              <button onClick={ ()=>removeBoard(board.id)}>X</button>
            </li>
          );
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
      <button onClick={(e) => logout(e)}>logout</button>
    </nav>
  );
};

export default Sidebar;
