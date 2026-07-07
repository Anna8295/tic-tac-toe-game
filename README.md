
# Tic Tac Toe Game

A Tic-Tac-Toe game built with React. Pick your mark ('X' or 'O') and play as many rounds as you like, in three modes:

- **Vs CPU** — play against the computer with three difficulty levels: easy, medium, and hard (hard uses minimax and never loses).
- **Vs player** — two players sharing the same computer.
- **Online (vs friend)** — create a room, share the 5-letter code with a friend, and play from separate computers. The connection is made browser-to-browser with WebRTC (PeerJS), so no game server is needed.

## Demo

https://anna8295.github.io/tic-tac-toe-game/

## Run Locally

Download the project

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm start
```

Open the URL Vite prints (http://localhost:5173/tic-tac-toe-game/) in your browser.

Run the tests

```bash
  npm test
```

Deploy to GitHub Pages

```bash
  npm run deploy
```

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router (hash routing, so it works on GitHub Pages)
- PeerJS (WebRTC) for online multiplayer
- Vitest for the game-logic and CPU tests

## Acknowledgements

 - [The design and idea are taken from: frontendmentor.io](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v)
