# 🎵 VanaSpotify - Music Academy Escape 🎵

**A First-Person Escape Horror-Comedy Adventure Game**

> *"Trapped in the Music Academy after class. The unhinged music teacher VanaSpotify quizzes you on music — fail, and he comes charging through the halls with his accordion wheezing. Find the keys and escape before he catches you!"*

## 🎮 Game Overview

VanaSpotify is a browser-based escape game that combines puzzle-solving, music trivia, and comedic horror. You must navigate through the Music Academy, find hidden keys, answer music quizzes correctly, and evade the relentless accordion-wielding teacher to escape alive!

## 🕹️ How to Play

### Objective
1. **Find all 4 hidden keys** scattered throughout the Music Academy
2. **Answer music quizzes** correctly (fail and VanaSpotify chases you!)
3. **Reach the front entrance** without losing your sanity
4. **Escape before time runs out**

### Controls
- **Click on rooms** to navigate the academy
- **Click on objects** to search for keys
- **Click on quiz answers** to answer VanaSpotify's music questions
- **Click navigation buttons** to move between rooms

## 📍 Locations

The game takes place in 6 rooms across the Music Academy:

1. **Music Office** - VanaSpotify's cluttered office (Start here)
2. **Main Hallway** - Long corridor with lockers
3. **Practice Room** - Soundproof room with instruments
4. **Library** - Music library with hidden compartments
5. **Concert Hall** - Grand hall with a stage
6. **Front Entrance** - Your escape route (Final destination)

## 🔑 Key Locations

- **Piano** in the Music Office
- **Chair** in the Practice Room
- **Book** in the Library
- **Microphone** in the Concert Hall

## 🎓 Music Trivia Questions

Answer music-related questions correctly to avoid triggering VanaSpotify's chase:

- How many strings does a violin have?
- What is the lowest note a piano can play?
- How many keys does a standard piano have?
- What is the "King of Instruments"?
- What does "allegro" mean in musical tempo?

And many more!

## 📊 Game Mechanics

### Sanity System
- Starts at 100%
- Decreases slowly over time (0.1% per second)
- Decreases faster when being chased (0.5% per second)
- If sanity reaches 0%, you lose!

### Time Limit
- You have 5 minutes (300 seconds) to escape
- Time display in top-right corner
- If time runs out, it's game over!

### Chase Mechanic
- Randomly triggered when moving between rooms
- Also triggered by answering quizzes incorrectly
- You must escape or get caught
- If caught, you wake up locked in the bathroom and must continue your search

### Quiz System
- Random quizzes pop up while exploring
- Answer correctly = VanaSpotify leaves peacefully
- Answer incorrectly = VanaSpotify begins his chase!

## 🏆 Win Conditions

You win if you:
✅ Collect all 4 keys
✅ Reach the front entrance
✅ Click "ESCAPE!" button
✅ Your sanity must be above 0%
✅ You must have time remaining

## 💀 Lose Conditions

You lose if:
❌ Your sanity reaches 0%
❌ Time runs out
❌ VanaSpotify catches you too many times

## 🎯 Tips & Strategies

💡 **Helpful Hints:**
- Not all objects have keys - some are just decorations
- Answer music quizzes correctly to avoid chases
- Moving between rooms is risky - you might encounter VanaSpotify
- Your sanity is your lifeline - manage it carefully
- The bathroom gives you time to recover if caught
- Check all locations before attempting to escape

## 📁 Game Files

- **index.html** - Game structure and layout
- **style.css** - Visual styling (retro terminal aesthetic)
- **game.js** - Game logic and mechanics
- **README.md** - This file

## 🚀 How to Run

1. **Download or clone** the repository
2. **Open `index.html`** in any modern web browser
3. **Start playing!** No installation or server required

## 🎨 Features

✨ **Immersive Gameplay**
- Multi-room exploration system
- Dynamic quiz mechanics
- Chase sequences with animations
- Sanity management system
- Retro terminal aesthetic

🎮 **Game Elements**
- 6 unique rooms to explore
- 4 hidden keys to find
- 5+ music trivia questions
- Real-time HUD with stats
- Chase animations
- Bathroom recovery mechanic

📱 **Technical**
- Responsive design (works on desktop and mobile)
- Smooth animations and transitions
- Real-time game state management
- No external dependencies

## 🔧 Customization

Want to modify the game? Here are key areas:

**Add More Keys:**
Edit the `totalKeys` variable in `game.js`

**Add More Rooms:**
Add new objects to the `rooms` array in `game.js`

**Add More Quizzes:**
Expand the `quizzes` array in `game.js`

**Change Colors:**
Modify hex colors in `style.css`

**Adjust Difficulty:**
- Change `timeRemaining` for time limit
- Modify sanity drain rates
- Adjust chase probability in `loadRoom()` function

## 🎵 Game Design Credits

**Concept:** First-person escape horror-comedy (think "Granny" meets a wacky music professor)

**Inspiration:** Retro terminal aesthetics, escape room games, and the chaos of music class

## 📜 License

Free to use, modify, and enjoy!

---

## 🎬 Ready to Play?

Open `index.html` and face the challenge of escaping VanaSpotify's Music Academy!

**Good luck! The accordion awaits... 🎶**

---

### Changelog

**v1.0 - Initial Release**
- 6 rooms fully implemented
- 4 keys to find
- 5 music trivia questions
- Chase mechanic with animations
- Sanity system
- Time-based gameplay
- Win/lose conditions
- HUD with real-time stats
- Retro terminal aesthetic UI

---

**Questions? Issues? Ideas?** Feel free to open an issue or contribute!

🏃‍♂️💨 *Now run before VanaSpotify finds you!* 🎵
