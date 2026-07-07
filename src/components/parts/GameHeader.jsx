import { logo, restart } from '../../assets'
import { styles } from '../../styles'

const GameHeader = ({ turnLabel, onRestart }) => (
  <div className="w-[328px] sm:w-[457px] flex justify-between px-2">
    <img className="object-none" src={logo} alt="logo" />
    <div className="w-[96px] sm:w-[140px] h-[40px] sm:h-[52px] bg-semiDarkNavy mr-8 sm:mr-4 flex items-center justify-center rounded-xl shadow-darkSmall text-silver">
      <p key={turnLabel} className="text-[14px] sm:text-[16px] animate-fadeIn">
        {turnLabel}
      </p>
    </div>
    <button
      className={`w-[40px] sm:w-[52px] h-[40px] sm:h-[52px] flex items-center justify-center bg-silver rounded-xl shadow-greySmall hover:bg-silverHover ${styles.pressSmall}`}
      onClick={onRestart}
      title="Restart round"
    >
      <img src={restart} alt="restart" />
    </button>
  </div>
)

export default GameHeader
