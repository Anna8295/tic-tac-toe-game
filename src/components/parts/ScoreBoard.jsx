import { styles } from '../../styles'

const ScoreBoard = ({ scores, xLabel, oLabel }) => (
  <div className="flex items-center justify-between gap-4 text-darkNavy">
    <div className={`${styles.scorediv} bg-lightBlue`}>
      <p className={styles.scoreText}>X {xLabel}</p>
      <p className={styles.scoreNumber}>{scores.X}</p>
    </div>
    <div className={`${styles.scorediv} bg-silver`}>
      <p className={styles.scoreText}>ties</p>
      <p className={styles.scoreNumber}>{scores.ties}</p>
    </div>
    <div className={`${styles.scorediv} bg-lightYellow`}>
      <p className={styles.scoreText}>O {oLabel}</p>
      <p className={styles.scoreNumber}>{scores.O}</p>
    </div>
  </div>
)

export default ScoreBoard
