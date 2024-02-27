import { useState } from "react";

const NewBoardModal = ({ addBoard, showPopup, boards }) => {
  //todo cancel function
  const [newboardname, setNewBoardName] = useState("");


  const SubmitNewBoardName = (event) => {
    event.preventDefault();
    addBoard({
        boardName:newboardname
      })
      setNewBoardName('')
  };

  const handleBoardNameInputChange = (event) => {
    setNewBoardName(event.target.value);
  };

  return (
    <div className="modal">
      <div className="overlay">
        <form className="modal-content" onSubmit={SubmitNewBoardName}>
          <h4>New Board</h4>
          <label htmlFor="boardname">Board name</label>
          <input
            onChange={handleBoardNameInputChange}
            required
            value={newboardname}
            type="text"
            id="boardname"
            placeholder="e.g. Default Board"
          />
          <div>
            <button type="submit">Create Board</button>
            <button onClick={showPopup}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewBoardModal;
