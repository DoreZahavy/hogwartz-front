import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import Loader from "./Loader"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { scoreService } from "../services/score.service"



export function AdminPage() {

  const [users, setUsers] = useState(null)
  const [userToEdit, setUserToEdit] = useState({ name: '', code: '' })

  function handleChange({ target }) {
    const { name: field, value } = target
    setUserToEdit((prevUser) => ({ ...prevUser, [field]: value }))
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.query()
    setUsers(users)

  }

  async function onRemoveUser(userId) {
    try {
      await userService.removeUser(userId)
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    } catch (err) {
      showErrorMsg('Failed deleting user')
    }
  }

  async function onAddNewUser(ev) {
    ev.preventDefault()
    try {

      const newUser = await userService.addNewUser(userToEdit)
      setUsers(prevUsers => [...prevUsers, newUser])
      setUserToEdit({ name: '', code: '' })
    } catch (err) {
      showErrorMsg('Failed adding new user')
    }


  }

  async function resetScoreBoard(){
    try{

      await scoreService.resetScores()
      showSuccessMsg('Reset successful')
    }catch(err){
      showErrorMsg('Failed reset')
    }
  }
  async function resetPointsLeft(){
    try{

      const newUsers = await userService.resetPoints()
      setUsers(newUsers)
      userService.updateUserPoints(20)
      showSuccessMsg('Points refreshed')
    }catch(err){
      showErrorMsg('Failed giving points')
    }
  }


  if (!users) return <Loader />
  // return <div>Users</div>
  return (
    < main className="admin-page" >
      <h2>Welcome Admin</h2>
      <ul >
        {users.map((user) => (
          <li key={user.id} className="user-preview">
            <button onClick={() => { onRemoveUser(user.id) }}>X</button>
            <h4>{user.name} |</h4>
            <h5>Code: {user.code} |</h5>
            <h5>Points left: {user.pointsLeft}</h5>
          </li>
        ))}
      </ul>
      <form onSubmit={onAddNewUser}>
        <h3>Add new</h3>
        <input value={userToEdit.name} onChange={handleChange} required type="text" name="name" placeholder="Name" />
        <input value={userToEdit.code} onChange={handleChange} type="text" name="code" placeholder="Code (optional)" />
        <button>ADD</button>

      </form>
<div>
  <button onClick={resetPointsLeft}>RESET POINTS LEFT</button>
  <button onClick={resetScoreBoard}>RESET GAME</button>
</div>
    </main >
  )
}
