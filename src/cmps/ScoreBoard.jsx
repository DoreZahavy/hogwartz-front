
import Gryffindor from '../assets/Gryffindor.webp'
import Ravenclaw from '../assets/Ravenclaw.webp'
import Hufflepuff from '../assets/Hufflepuff.webp'
import Slytherin from '../assets/Slytherin.webp'


export default function ScoreBoard({ scores, setSelectedHouse }) {

    const iconMap = {
        Gryffindor,
        Ravenclaw,
        Hufflepuff,
        Slytherin
    }



    return (
        <section className="score-board">

            {scores.map(score => {
                return (
                    <article className='score-preview' key={score.houseName}>
                        <img onClick={() => setSelectedHouse(score.houseName)}
                            src={iconMap[score.houseName]}
                            alt={score.houseName} />
                        <h1>{score.houseName}</h1>
                        {/* <h1>{score.score}</h1> */}
                    </article>
                )
            })}

        </section>
    )
}