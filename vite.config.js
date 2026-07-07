import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages at https://anna8295.github.io/tic-tac-toe-game/
export default defineConfig({
  base: '/tic-tac-toe-game/',
  plugins: [react()],
})
