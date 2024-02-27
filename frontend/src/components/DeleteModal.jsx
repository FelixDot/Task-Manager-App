const DeleteModal = ({ title, handleDelete, handleCancelDelete, board }) => {
    return (
        <div className="deleteModal">
            <p>{board ? `Are you sure you want to delete the Board ${title}?` : `Are you sure you want to delete the Task ${title}?`}</p>
            <div className="deleteModal-Buttons">
                <button onClick={handleDelete}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
            </div>
        </div>)
}

export default DeleteModal