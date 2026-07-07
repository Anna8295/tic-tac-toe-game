import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styles } from '../styles'
import { logo } from '../assets'
import { MarkPicker } from './parts'

const DIFFICULTIES = ['easy', 'medium', 'hard']

const Menu = () => {
  const navigate = useNavigate()
  const [sign, setSign] = useState('X')
  const [pickingDifficulty, setPickingDifficulty] = useState(false)

  return (
    <div className={styles.fullScreen}>
      <div className={`${styles.centering} w-[327px] sm:w-[460px] gap-6 animate-riseIn`}>
        <img src={logo} alt="logo" />
        <MarkPicker sign={sign} onChange={setSign} />

        {pickingDifficulty ? (
          <div className={`${styles.centering} w-full gap-3 animate-fadeIn`}>
            <p className="text-silver text-[14px]">pick the cpu difficulty</p>
            <div className="w-full grid grid-cols-3 gap-3">
              {DIFFICULTIES.map((difficulty) => (
                <button
                  key={difficulty}
                  className={`bg-lightYellow shadow-yellowSmall hover:bg-lightYellowHover text-darkNavy rounded-xl py-3 text-[14px] sm:text-[16px] ${styles.pressSmall}`}
                  onClick={() =>
                    navigate(`/game?mode=cpu&difficulty=${difficulty}&p1=${sign}`)
                  }
                >
                  {difficulty}
                </button>
              ))}
            </div>
            <button
              className="text-silver text-[13px] hover:text-silverHover"
              onClick={() => setPickingDifficulty(false)}
            >
              back
            </button>
          </div>
        ) : (
          <>
            <button
              className={`${styles.newGamebtn} bg-lightYellow shadow-yellow hover:bg-lightYellowHover`}
              onClick={() => setPickingDifficulty(true)}
            >
              New game (vs cpu)
            </button>
            <button
              className={`${styles.newGamebtn} bg-lightBlue shadow-blue hover:bg-lightBlueHover`}
              onClick={() => navigate(`/game?mode=local&p1=${sign}`)}
            >
              New game (vs player)
            </button>
            <button
              className={`${styles.newGamebtn} bg-silver shadow-grey hover:bg-silverHover`}
              onClick={() => navigate(`/online?p1=${sign}`)}
            >
              Play online (vs friend)
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Menu
