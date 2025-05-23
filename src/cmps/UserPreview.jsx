import { useState } from "react"

export function UserPreview({ user, onRemoveUser }) {


    const [showActivities, setShowActivities] = useState(false)

    function toggleActivities() {
        setShowActivities(prev => !prev)
    }



    return (
        <>
            <li className="user-preview">

                <button onClick={() => { onRemoveUser(user._id) }}>X</button>
                <h4>{user.name} |</h4>
                <h5>Code: {user.code} |</h5>
                <h5>Points left: {user.pointsLeft}</h5>
                <p className="toggle-btn" onClick={toggleActivities}>{showActivities ? '⬆️' : '⬇️'}</p>

            </li>
            <li>

                {showActivities && <ActivityList activities={user.activities} />}
            </li>

        </>
    )
}

function ActivityList({ activities }) {

    function formatTime(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('en-IL', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            // year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
    }

    if (!activities.length) return <p>No activities for this user</p>

    return (
        <ul>
            {activities.toSorted((a, b) => b.at - a.at).map((act) => (
                <li key={act.at}>
                    <p>{formatTime(act.at)} - {act.action}</p>
                </li>
            ))}

        </ul>
    )
}