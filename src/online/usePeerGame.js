import { useEffect, useRef, useState } from 'react'
import { Peer } from 'peerjs'

// Room codes become peer ids on the public PeerJS broker; the prefix keeps
// them from colliding with other apps using the same broker.
const peerId = (code) => `annav-tictactoe-${code.toLowerCase()}`

// status: 'connecting' | 'waiting' | 'connected' | 'closed' | 'error'
export const usePeerGame = ({ role, code, onMessage }) => {
  const [status, setStatus] = useState('connecting')
  const [errorType, setErrorType] = useState(null)
  const connRef = useRef(null)
  const onMessageRef = useRef(onMessage)
  onMessageRef.current = onMessage

  useEffect(() => {
    setStatus('connecting')
    setErrorType(null)

    const peer = new Peer(role === 'host' ? peerId(code) : undefined)

    const wire = (conn) => {
      connRef.current = conn
      conn.on('open', () => setStatus('connected'))
      conn.on('data', (message) => onMessageRef.current(message))
      conn.on('close', () => setStatus('closed'))
      conn.on('error', () => setStatus('closed'))
    }

    peer.on('open', () => {
      if (role === 'host') setStatus('waiting')
      else wire(peer.connect(peerId(code), { reliable: true }))
    })

    peer.on('connection', (conn) => {
      // one opponent per room — refuse extra connections
      if (connRef.current) conn.close()
      else wire(conn)
    })

    peer.on('error', (err) => {
      setErrorType(err.type)
      setStatus('error')
    })

    return () => {
      connRef.current = null
      peer.destroy()
    }
  }, [role, code])

  const send = (message) => {
    if (connRef.current?.open) connRef.current.send(message)
  }

  return { status, errorType, send }
}
