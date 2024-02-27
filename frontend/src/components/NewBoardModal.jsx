import { useState } from "react";
import "./newBoardModal.css"
const NewBoardModal = ({ addBoard, showPopup, boards }) => {
    const [newboardname, setNewBoardName] = useState("");


    const SubmitNewBoardName = (event) => {
        event.preventDefault();
        addBoard({
            boardName: newboardname
        })
        showPopup(false)
        setNewBoardName('')
    };

    const handleBoardNameInputChange = (event) => {
        setNewBoardName(event.target.value);
    };

    const isBoardNameValid = newboardname.length >= 3;

    return (
        <div className="addBoardModal">
            <form className="addBoardModalContent" onSubmit={SubmitNewBoardName}>

                <h4>Create a new Board</h4>
                <div className="inputBlock">
                    <label htmlFor="boardname">Board name</label>
                    <input
                        onChange={handleBoardNameInputChange}
                        required
                        value={newboardname}
                        type="text"
                        id="boardname"
                        placeholder="e.g. Default Board"
                    /></div>
                <div className="addBoardModalButtons">
                    <button type="submit" disabled={!isBoardNameValid}>Create Board</button>
                    <button onClick={showPopup}>Cancel</button>
                </div>
            </form>
        </div>
    );
};
export default NewBoardModal;
