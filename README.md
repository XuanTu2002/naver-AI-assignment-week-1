# Tic Tac Toe AI

A React-based Tic Tac Toe experience that pits you against an AI opponent with selectable difficulty modes. The interface is built to be responsive, informative, and keeps track of ongoing performance, so you can see how well you fare against different strategies.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.
3. **Create a production build**
   ```bash
   npm run build
   ```

> There are currently no automated tests bundled with the project. Running `npm test -- --watchAll=false` will complete without executing tests.

## How to Play

- You always play as **X** and move first.
- Click any empty square to place your symbol.
- The AI replies automatically based on the selected difficulty.
- Use **New Game** to clear the board while keeping your score.
- **Reset Scores** clears the win/loss/draw counters and streak.
- The scoreboard and streak are stored in `localStorage`, so they persist across refreshes.

### On-screen Information

- **Status panel:** Shows whether it’s your turn, the AI is thinking, or the game result.
- **Scoreboard:** Tracks player wins, AI wins, draws, and the current streak.
- **AI Metrics:** Displays the AI’s thinking time (ms) and the number of board states evaluated in Hard mode.
- **Winning highlight:** The three squares that clinch the win glow to make end states easy to see.

## AI Difficulty Levels

| Mode | Behaviour | Extra Details |
| ---- | --------- | ------------- |
| Easy | Plays random legal moves and will miss obvious blocks roughly 40% of the time. | Great for practicing fundamentals; the AI is intentionally fallible. |
| Hard | Uses the full minimax algorithm and will not lose (worst case: draw). | For each candidate move the minimax score is logged to the browser console, along with the number of board positions explored and total thinking time. |

## Project Structure

```
src/
├── App.js
├── App.css
├── components/
│   ├── Board.js
│   ├── Game.js
│   ├── GameInfo.js
│   └── Square.js
└── utils/
    ├── ai.js
    └── gameLogic.js
```

- `utils/gameLogic.js` contains board helpers such as winner detection and immutable move creation.
- `utils/ai.js` implements the Easy/Hard opponents and the minimax search.
- `components/` holds small, focused UI primitives to keep presentation separate from logic.

## Troubleshooting

- **AI logs:** Hard mode writes move evaluations to the developer console. Open the browser dev tools if you want to inspect the raw minimax scores.
- **Performance metrics:** Thinking time and position counts update after each AI response; they reset at the start of a new game.
- **Streak tracking:** The streak reflects consecutive player victories, AI victories, or draws. Switching difficulty resets the board but not the counters, so you can compare performance across modes.

Enjoy mastering tic tac toe against a relentless (or relaxed) opponent!
