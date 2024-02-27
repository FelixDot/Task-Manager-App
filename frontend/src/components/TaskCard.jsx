import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import "./taskCard.css";

const TaskCard = ({ tasks, deleteTask, updateTask }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTask, setEditedTask] = useState(tasks);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleEditMode = () => {
        setMenuOpen(false)
        setEditMode(!editMode)
        setEditedTask(tasks)
        
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "labels") {
            const labelsArray = value.split(",").map(label => label.trim());
            setEditedTask({ ...editedTask, [name]: labelsArray });
        } else {
            setEditedTask({ ...editedTask, [name]: value });
        }
    };

    const handleDelete = () => {
        deleteTask(tasks.id);
        setShowDeleteModal(false);

    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleDeleteButtonClick = () => {
        setShowDeleteModal(true);
        setMenuOpen(!menuOpen);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleSaveChanges = () => {
        updateTask(editedTask);
        setEditMode(false);
    };

    return (
        <div className="taskCardContainer">
            {editMode ? (
                <div className="editTaskCard">
                    <input
                        type="text"
                        name="taskName"
                        value={editedTask.taskName}
                        onChange={handleInputChange}
                    />
                    <textarea
                        className="editTaskDescription"
                        name="editTaskDescription"
                        value={editedTask.taskDescription}
                        onChange={handleInputChange}
                    />
                    <select
                        name="priority"
                        value={editedTask.priority}
                        onChange={handleInputChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <select
                        name="status"
                        value={editedTask.status}
                        onChange={handleInputChange}
                    >
                        <option value="Backlog">In Backlog</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Review">In Review</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input
                        type="text"
                        name="labels"
                        value={editedTask.labels.join(", ")}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveChanges}>Save</button>
                    <button onClick={toggleEditMode}>Cancel</button>
                </div>
            ) : (
                <div className="taskCard">
                    <div className="taskCardTitle">
                        <h3>{tasks.taskName}</h3>
                        <div className="dropdown">
                            <button className="dropdownbtn" onClick={handleMenuToggle}>...</button>
                            {menuOpen && (
                                <div className="dropdown-content">
                                    <button onClick={handleDeleteButtonClick}>Delete</button>
                                    <button onClick={toggleEditMode}>Edit</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <p>{tasks.taskDescription}</p>
                    <p>Priority: {tasks.priority}</p>
                    <p>Labels: {tasks.labels && tasks.labels.length > 0 ? tasks.labels.join(", ") : "No labels"}</p>
                </div>
            )}
            {showDeleteModal && (
                <DeleteModal title={tasks.taskName} handleDelete={handleDelete} handleCancelDelete={handleCancelDelete} board={false}/>
            )}
        </div>
    );
};

export default TaskCard;
