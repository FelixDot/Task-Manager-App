import { useState, useEffect } from 'react'

import "./App.css"
import Sidebar from "./components/Sidebar"
import Board from "./components/Board"
import boardsService from "./service/boards"
import loginService from "./service/login"

function App() {
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification]= useState('')


    const [boards, setBoards] = useState([])
    const [board, setBoard] = useState()



    useEffect(() => {
        const checkLoggedInUser = async () => {
          const loggedUserJson = window.localStorage.getItem('loggedKanbanUser');
          if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson);
            try {

      
              setUser(user);
              boardsService.setToken(user.token);
              fetchBoards(user);
            } catch (error) {
              window.localStorage.removeItem('loggedKanbanUser');
              setUser(null);
            }
          }
        };
      
        checkLoggedInUser();
      }, [board]);
    
      const fetchBoards = async user => {
        try {
          const allBoards = await boardsService.getUserBoards(user.username);
          setBoards(allBoards);
        } catch (error) {
          if (error.message === 'Unauthorized') {
            handleLogout();
          } else {
            console.error('Error fetching user boards:', error);
          }
        }
      };

      

      const loginForm = () => (
        <>
          <h1>Log in to Application</h1>
          <div className='error'>{notification}</div>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                id='username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button id='login-button' type="submit">login</button>
          </form>
        </>
      )
      const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedKanbanUser')
        setUser(null)
      }

      const handleLogin = async (event) => {
        event.preventDefault()
        try{

          const user = await loginService.login({
            username, password
          })

          window.localStorage.setItem(
            'loggedKanbanUser', JSON.stringify(user)
          )
          boardsService.setToken(user.token)
          setUser(user)
          fetchBoards(user)
          setUsername('')
          setPassword('')
          setNotification(`${user.name} logged in` )
        }catch(exception){
            setNotification('wrong username or password')
          setTimeout(() => {
            setNotification('')
          },6000)
        }
      }
    


  return (
    <div className="main">
    {user === null ? loginForm(): 
    <>
      <Sidebar boards={boards} setBoards={setBoards} setBoard={setBoard} logout={handleLogout} user={user}/>

      {board && <Board board={board} setBoard={setBoard} /> }
    </>
    }
    </div>
  )
}

export default App
