import { iconO, iconX } from '../../assets'
import { styles } from '../../styles'

const WinningModal = ({ winner, headline, onQuit, onNextRound }) => {
  const isTie = winner === 'tie'

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 animate-fadeIn">
      <div className={`${styles.centering} w-full bg-semiDarkNavy py-8 gap-4 animate-riseIn`}>
        {headline && <p className="text-silver">{headline}</p>}
        {isTie ? (
          <h1 className="text-[24px] sm:text-[40px] text-silver">Round tied</h1>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <img className="animate-pop" src={winner === 'X' ? iconX : iconO} alt={winner} />
            <h1
              className="text-[24px] sm:text-[40px]"
              style={{ color: winner === 'X' ? '#31C3BD' : '#F2B137' }}
            >
              Takes the round
            </h1>
          </div>
        )}
        <div>
          <button
            className={`bg-silver text-darkNavy rounded-xl py-2 px-4 mr-4 shadow-greySmall hover:bg-silverHover ${styles.pressSmall}`}
            onClick={onQuit}
          >
            Quit
          </button>
          <button
            className={`bg-lightYellow text-darkNavy rounded-xl py-2 px-4 shadow-yellowSmall hover:bg-lightYellowHover ${styles.pressSmall}`}
            onClick={onNextRound}
          >
            Next round
          </button>
        </div>
      </div>
    </div>
  )
}

export default WinningModal
