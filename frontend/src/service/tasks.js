import axios from 'axios'
import boardsService from './boards'
const baseUrl = 'http://localhost:3001/api/tasks'


const deleteTask = async(taskId) =>{
    const token = boardsService.getToken()
    const config = ({
        headers:{ Authorization: token },
      })

    const url = baseUrl.concat(`/${taskId}`)
    try {
        const response = await axios.delete(url,config)
        return response.data
      } catch (error) {
        console.error('Error deleting task', error)
      }

}


const updateTask = async(updatedTask)=>{
    
    const url = baseUrl.concat(`/${updatedTask.id}`)
    try {
        const response = await axios.put(url,updatedTask)
        console.log(response)
        return response.data
      } catch (error) {
        console.error('Error updating task', error)
      }

}
export default {deleteTask, updateTask}