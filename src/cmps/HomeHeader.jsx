
import { NavLink } from "react-router-dom"
import hogLogo from '../assets/hogwarts.svg'
import logoutIcon from '../assets/logout.svg'
import adminIcon from '../assets/admin.svg'
import { InstallBtn } from "./InstallBtn"





export function HomeHeader({ user, logout }) {








    return (
        <header className="home-header">

            <NavLink to='/'> <img className="logo" src={hogLogo} /></NavLink>
            <nav className="header-nav">

                {user && <h2>{'Welcome ' + user.name}</h2>}
                <InstallBtn/>
                {user && <img onClick={logout} src={logoutIcon} />}
                {user && user.name === 'Dean' && <NavLink className="flex-center" to='/admin'><img src={adminIcon} /></NavLink>}
            </nav>

        </header>
    )
}


