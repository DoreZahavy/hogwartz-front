import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
  query,
  login,
  logout,
  signup,
  getLoggedinUser,
  addNewUser,
  removeUser,
  resetPoints,
  updateUserPoints
}

function updateUserPoints(score) {
  const sessionUser = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
  )
  sessionUser.pointsLeft = score
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(sessionUser))
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function addNewUser(userInfo) {
  // return await httpService.post('user', userInfo)
  return await httpService.post(`auth/signup`, userInfo)

}
async function removeUser(userId) {
  return await httpService.delete(`user/${userId}`)
}

async function query() {
  return await httpService.get('user')
}
async function login(code) {
  console.log("🚀 ~ login ~ code:", code)
  try {

    const user = await httpService.post(`auth/login`, { code })
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
  } catch (err) {
    console.log('err', err)
    throw err
  }
}
async function signup(signupInfo) {
  const user = await httpService.post(`auth/signup`, signupInfo)

  return user
}
async function logout() {
  await httpService.post(`auth/logout`)
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function resetPoints(resetAmount) {
  return await httpService.put('user/reset-points/' + resetAmount)
}
