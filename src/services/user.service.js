import { httpService } from "./http.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
	query,
	login,
	logout,
	signup,
	getLoggedinUser,

}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function query(){
    return await httpService.get('user')
    
}
async function login(code) {
    const user = await httpService.post(`auth/login`, { code })
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user


}
async function signup(signupInfo) {

 
    const user = await httpService.post(`auth/signup`, signupInfo)
 
    
    return user

}
async function logout(){
    await httpService.post(`auth/logout`)
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)

}
