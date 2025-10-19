Week 1 Assignment - React
Week 1 Assignment: Tic Tac Toe AI
🎯 Overview
Build an interactive TicTacToe game in React featuring an AI opponent with multiple difficulty levels. This assignment reinforces the minimax algorithm concepts from lecture while giving you freedom to add your own creative touches.

📋 Core Requirements
1. Functional Game
✅ Complete TicTacToe game with proper win/draw detection
✅ Clean, responsive UI that works on desktop and mobile
✅ New Game button to reset the board
✅ Clear indication of whose turn it is (player vs AI)
✅ Visual highlight of winning combination
2. AI Implementation
Implement 2 difficulty levels with clear differences in play style:
Easy Mode
Random valid moves
Should be easily beatable
Occasionally misses obvious blocks
Hard Mode
Full minimax implementation
Should be unbeatable (worst case: draw)
Console log the score evaluation for each move
3. Game Features
Score Tracking
Track wins/losses/draws across multiple games
Display current streak
Persist scores in browser (localStorage) or just in session
Performance Metrics
Display number of positions evaluated (for Hard mode)
Show AI "thinking time" in milliseconds
Update metrics after each AI move
4. Code Quality
Clean Architecture
Separate game logic from UI components
AI logic in its own module/file
Proper use of React hooks (useState, useEffect)
Documentation
README with:
Setup instructions
How to play
Explanation of AI difficulty levels
Code comments for complex logic (especially minimax)

🚀 Getting Started
Suggested Project Structure
src/
├── App.jsx           # Main game component
├── components/
│   ├── Board.jsx     # Game board component
│   ├── Square.jsx    # Individual square
│   └── GameInfo.jsx  # Score, status, controls
├── utils/
│   ├── gameLogic.js  # Win checking, game state
│   └── ai.js         # AI algorithms
└── App.css           # Styles

Implementation Tips
Test each difficulty level - Make sure Easy is actually easy!
Add features incrementally - Get core game working first
Use console.log liberally - Especially for debugging minimax

🎯 Success Criteria
You'll know you've succeeded when:
You can't beat your Hard AI (best case: draw)
Your Easy AI loses most games against you
Someone else can play your game without instructions
You can explain how minimax works to a friend
You're proud to share what you built
Remember: The goal is deep understanding, not just completion. Focus on learning the concepts well - that's what will make you a better developer. We're here to help if you get stuck!
Good luck, and have fun! 🎮

