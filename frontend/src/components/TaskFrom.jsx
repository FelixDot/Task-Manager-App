import { useState } from "react"
import "./taskForm.css"
const TaskFrom = ({ addTask, show }) => {
    const [taskName, setTaskName] = useState('')
    const [status, setStatus] = useState('Backlog')
    const [labels, setlabels] = useState('')
    const [priority, setPriority] = useState('Low')
    const [taskDescription, setTaskDescription] = useState('')
    const [error, setError] = useState("")


    const handleSave = (e) => {


        e.preventDefault()
        if (taskName.length < 3) {
            setError("Task name must be at least 3 characters long.")
            return
        }
        const labelArray = labels.split(',').map(label => label.trim())
        console.log(labelArray)
        const taskData = {
            taskName,
            status,
            labels: labelArray,
            priority,
            taskDescription
        }
        addTask(taskData)
        show(prev => !prev)
        resetForm()
    }

    const resetForm = () => {
        setTaskName('')
        setStatus('Backlog')
        setlabels('')
        setPriority('Low')
        setTaskDescription('')
        setError('')
    }
    const handleCancel = () => {
        resetForm()
        show(prev => !prev)
    }
    return (
        <div className="addTaskModal">
            <h5>Add new task</h5>
            <form onSubmit={handleSave} >
                <div>
                {error && <p className="errorMessage">{error}</p>}

                    <div className="inputBlock">
                        <label htmlFor="taskName">Task name</label>

                        <input
                            type="text"
                            className="taskName"
                            id="taskName"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="inputBlock">
                    <label htmlFor="status">Status </label>
                    <select
                        className="status"
                        value={status}
                        id="status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Backlog">Backlog</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Review">In Review</option>
                    </select>
                </div>
                <div className="inputBlock">

                    <label htmlFor="labels">Labels</label>
                    <input
                        type="text"
                        className="labels"
                        id="labels"
                        value={labels}
                        onChange={(e) => setlabels(e.target.value)}
                    />
                </div>
                <div className="inputBlock">
                    <label htmlFor="priority">Priority</label>
                    <select
                        className="priority"
                        id="priority"
                        value={status}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="inputBlock">
                    <label htmlFor="taskDescription">Description</label>
                    <textarea
                        type="text"
                        className="taskDescription"
                        id="taskDescription"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </div>
                <div className="addTaskModalButtons">
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default TaskFrom
