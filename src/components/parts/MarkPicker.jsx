import { styles } from '../../styles'

const MarkPicker = ({ sign, onChange, title = "pick player 1's mark" }) => (
  <div className="w-full bg-semiDarkNavy p-4 text-silver rounded-xl shadow-dark">
    <p className="mb-2 text-[16px]">{title}</p>
    <div className="grid grid-cols-2 space-x-2 rounded-xl bg-darkNavy p-2">
      <div>
        <input
          type="radio"
          name="mark"
          id="mark-x"
          className="peer hidden"
          value="X"
          checked={sign === 'X'}
          onChange={() => onChange('X')}
        />
        <label htmlFor="mark-x" className={styles.radiobtnSign}>
          X
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="mark"
          id="mark-o"
          className="peer hidden"
          value="O"
          checked={sign === 'O'}
          onChange={() => onChange('O')}
        />
        <label htmlFor="mark-o" className={styles.radiobtnSign}>
          O
        </label>
      </div>
    </div>
    <p className="mt-2 text-[14px] text-opacity-50">remember: X goes first</p>
  </div>
)

export default MarkPicker
