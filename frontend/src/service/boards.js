import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/boards'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
    return token;
  }
const getUserBoards = async (username) => {
    const config = ({
        headers:{ Authorization: token },
      })
    try {
        const response = await axios.get(`${ baseUrl }/${username}`, config)
        return response.data
    } catch (error) {
        console.error('Error fetching users boards', error);
    }
  }

  const createNewBoard = async newBoard => {

    const config = ({
      headers:{ Authorization: token },
    })
    try {
        const response = await axios.post(baseUrl, newBoard, config)
        return response.data
    } catch (error) {
        console.error('Error creating new board', error);
}
  }


  const addTask = async (newTask, boardId) => {
    const config = ({
        headers:{ Authorization: token },
      })
    try {
        const url = baseUrl.concat(`/${boardId}/tasks`)
        const response = await axios.post(url, newTask, config)
        return response.data
    } catch (error) {
        console.error('Error adding Task', error);
    }
  }

  const deleteBoard = async (boardId) =>{
    const config = ({
        headers:{ Authorization: token },
      })
    
      const url = baseUrl.concat(`/${boardId}`) 
      try{
        const response = await axios.delete(url,config)
        return response.data
      } catch (error) {
        console.error('Error deleting board', error)
      }
  }
  export default { getUserBoards, setToken, createNewBoard,deleteBoard, addTask ,getToken}