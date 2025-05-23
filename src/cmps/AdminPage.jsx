import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import Loader from "./Loader"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { scoreService } from "../services/score.service"
import { Link } from 'react-router-dom'
import { UserPreview } from "./UserPreview"




export function AdminPage() {

  const [users, setUsers] = useState(null)
  const [userToEdit, setUserToEdit] = useState({ name: '', code: '' })
  const [resetAmount, setResetAmount] = useState(20)
  const [scoreBoard, setScoreBoard] = useState(null)




  function handleChange({ target }) {
    const { name: field, value } = target
    setUserToEdit((prevUser) => ({ ...prevUser, [field]: value }))
  }
  function handleAmountChange({ target }) {
    setResetAmount(+target.value)
  }

  useEffect(() => {
    loadUsers()
    loadScores()
  }, [])

  async function loadUsers() {
    const users = await userService.query()
    setUsers(users)
  }

  async function loadScores() {
    try {

      const scoreBoard = await scoreService.fetchScoreBoard()
      setScoreBoard(scoreBoard)
    } catch (err) {
      showErrorMsg('Failed loading scores')
    }
  }

  async function onRemoveUser(userId) {
    try {
      await userService.removeUser(userId)
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
    } catch (err) {
      showErrorMsg('Failed deleting user')
    }
  }

  async function onAddNewUser(ev) {
    ev.preventDefault()
    try {

      const newUser = await userService.addNewUser({ ...userToEdit, pointsLeft: resetAmount })
      setUsers(prevUsers => [...prevUsers, newUser])
      setUserToEdit({ name: '', code: '' })
    } catch (err) {
      showErrorMsg('Failed adding new user')
    }


  }

  async function resetScoreBoard() {
    try {

      const cleanScoreBoard = await scoreService.resetScores()
      setScoreBoard(cleanScoreBoard)
      showSuccessMsg('Reset successful')
    } catch (err) {
      showErrorMsg('Failed reset')
    }
  }


  async function resetPointsLeft() {
    try {

      const newUsers = await userService.resetPoints(resetAmount)
      setUsers(newUsers)
      userService.updateUserPoints(20)
      showSuccessMsg('Points refreshed')
    } catch (err) {
      showErrorMsg('Failed giving points')
    }
  }


  async function onDownloadCSV() {
    try {

      const blob = await scoreService.downloadCSV()

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'house_scores.csv'
      document.body.appendChild(a)
      a.click()
      a.remove()

      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('CSV download failed:', err)
    }

  }


  if (!users) return <Loader />
  return (
    < main className="admin-page" >
      <h2>Welcome Admin</h2>
      <ul >
        {users.map((user) => (
          <UserPreview key={user._id} user={user} onRemoveUser={onRemoveUser} />
        ))}
      </ul>

      <form onSubmit={onAddNewUser}>
        <h3>Add new user</h3>
        <input value={userToEdit.name} onChange={handleChange} required type="text" name="name" placeholder="Name" />
        <input value={userToEdit.code} onChange={handleChange} type="text" name="code" placeholder="Code (optional)" />
        <button>ADD</button>
      </form>

      <div style={{ 'marginBlock': '10px', gap: '10px', display: 'flex' }}>
        <button onClick={resetPointsLeft}>RESET ALL USERS POINTS</button>
        <input type="number" value={resetAmount} onChange={handleAmountChange} />
      </div>
      <div style={{ 'marginBlock': '10px', gap: '10px', display: 'flex' }}>
        <button onClick={resetScoreBoard}>RESET ALL SCORES</button>
        <button onClick={onDownloadCSV}>CSV</button>

      </div>
      <Link to={'/'}>Go back</Link>
      {scoreBoard &&
        <section className="score-board">

          {scoreBoard.map(score => {
            return (
              <article className='score-preview' key={score.houseName}>
                <h1>{score.houseName}</h1>
                <h1>{score.score}</h1>
              </article>
            )
          })}

        </section>
      }

    </main >
  )
}
