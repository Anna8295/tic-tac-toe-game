import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Game, Menu, OnlineGame, OnlineLobby } from './components'

// HashRouter so routes survive refreshes and deep links on GitHub Pages,
// which can't rewrite URLs to index.html.
const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/game" element={<Game />} />
      <Route path="/online" element={<OnlineLobby />} />
      <Route path="/online/:role/:code" element={<OnlineGame />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </HashRouter>
)

export default App
