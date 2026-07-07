import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { styles } from '../styles'
import { logo } from '../assets'
import { MarkPicker } from './parts'

// no 0/O/1/I/L — room codes get read out loud or typed from another screen
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 5

const makeCode = () =>
  Array.from(
    { length: CODE_LENGTH },
    () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]
  ).join('')

const OnlineLobby = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [sign, setSign] = useState(params.get('p1') === 'O' ? 'O' : 'X')
  const [joinCode, setJoinCode] = useState('')

  return (
    <div className={styles.fullScreen}>
      <div className={`${styles.centering} w-[327px] sm:w-[460px] gap-6 animate-riseIn`}>
        <img src={logo} alt="logo" />
        <MarkPicker title="pick your mark" sign={sign} onChange={setSign} />
        <button
          className={`${styles.newGamebtn} bg-lightYellow shadow-yellow hover:bg-lightYellowHover`}
          onClick={() => navigate(`/online/host/${makeCode()}?p1=${sign}`)}
        >
          Create a room
        </button>
        <div className="w-full bg-semiDarkNavy p-4 rounded-xl shadow-dark flex flex-col gap-3">
          <p className="text-silver text-[14px]">or join a friend's room</p>
          <input
            className="w-full rounded-xl bg-darkNavy text-silver p-3 tracking-[0.3em] outline-none placeholder:text-silver placeholder:text-opacity-30"
            maxLength={CODE_LENGTH}
            placeholder="CODE"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase().trim())}
          />
          <button
            className={`${styles.newGamebtn} bg-lightBlue shadow-blue hover:bg-lightBlueHover disabled:opacity-40`}
            disabled={joinCode.length < CODE_LENGTH}
            onClick={() => navigate(`/online/guest/${joinCode}`)}
          >
            Join room
          </button>
        </div>
        <button
          className="text-silver text-[13px] hover:text-silverHover"
          onClick={() => navigate('/')}
        >
          back to menu
        </button>
      </div>
    </div>
  )
}

export default OnlineLobby
