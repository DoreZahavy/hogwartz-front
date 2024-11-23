import { useEffect, useState } from "react";
import { HomeHeader } from "./HomeHeader";
import { UserMsg } from "./UserMsg";
import { userService } from "../services/user.service";
import { CodeModal } from "./CodeModal";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

import ScoreBoard from "./ScoreBoard";
import { scoreService } from "../services/score.service";
import Loader from "./Loader";
import ScoreModal from "./ScoreModal";





export function HomePage() {


    const [user, setUser] = useState(userService.getLoggedinUser())
    const [scoreBoard, setScoreBoard] = useState(null)
    const [selectedHouse, setSelectedHouse] = useState(null)

    useEffect(() => {
        loadScores()
    }, [])

    async function loadScores() {
        try{

            const scoreBoard = await scoreService.fetchScoreBoard()
            setScoreBoard(scoreBoard)
        } catch(err){
            showErrorMsg('Failed loading scores')
        }
    }

    async function raisePoints(amount) {
        try{

            const newScoreBoard = await scoreService.raisePoints(selectedHouse, amount)
            showSuccessMsg(`${amount} points to ${selectedHouse}`)
            setScoreBoard(newScoreBoard)
            setSelectedHouse(null)
        } catch(err){
            showErrorMsg('Failed giving points')

        }

    }

    async function onLogout() {
        try {
            await userService.logout()
            setUser(null)
            showSuccessMsg('Logout successful')

        } catch (err) {
            console.log('problem logging out - err:', err)
            showErrorMsg('Logout failed')
        }
    }
    async function onLogin(code) {
        try {
            const loggedinUser = await userService.login(code)
            setUser(loggedinUser)
            showSuccessMsg('Welcome back!')

        } catch (err) {
            console.log('problem logging in - err:', err)
            showErrorMsg('Wrong code')
        }
    }

    return (
        < main className="home-page" >
            <HomeHeader user={user} logout={onLogout} />
            {scoreBoard ?
                <ScoreBoard scores={scoreBoard} setSelectedHouse={setSelectedHouse} /> :
                <Loader />}
            {!user && <CodeModal login={onLogin} />}
            {selectedHouse && <ScoreModal
                setSelectedHouse={setSelectedHouse}
                raisePoints={raisePoints} />}
            <UserMsg />

        </main >
    )
}
