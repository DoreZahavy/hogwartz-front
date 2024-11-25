import star from '../assets/star.svg'
import backIcon from '../assets/back.svg'
import sendStar from '../assets/send-star.svg'
import fullStar from '../assets/full-star.svg'
import { useState } from 'react'
import Loader from './Loader'

export default function ScoreModal({ selectedHouse, setSelectedHouse, raisePoints }) {

    const [score, setScore] = useState(0)

    return (
        <section className="score-screen">

            <section className="score-modal">
                <h2>Points to {selectedHouse}</h2>
                <div className="stars">

                    {[...Array(5)].map((num, idx) =>
                    (
                        <img src={score > idx ? fullStar : star}
                            onClick={() => setScore(idx + 1)}
                            alt="star"
                            key={idx} />
                    )
                    )}
                </div>
                <div className='actions'>

                    <button>
                        <span>Send</span>
                        <img src={sendStar} onClick={() => raisePoints(score)} alt="star" />
                    </button>
                    <img onClick={() => setSelectedHouse(null)} src={backIcon} alt="back" />
                </div>

            </section>

        </section>
    )
}