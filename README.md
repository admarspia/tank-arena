# Tank Arena: Maze Challenge

![Game Banner]
**Tank Arena: Maze Challenge** is a **3D browser-based tank game** built with **HTML, CSS, and JavaScript**, using **Three.js** for rendering. Players control a tank to **navigate shrinking fence arenas**, solve **phrase-based puzzles**, and survive while avoiding collisions with walls.

---

## 🚀 Features

- **3D Shrinking Fences:** Arenas shrink toward the center over time.
- **Hidden Wall Mechanics:** Certain walls are determined by random phrases.
- **Tank Control:** Move, rotate, and shoot bullets.
- **Collision Detection:** Tanks and bullets interact with fences and obstacles.
- **Level Progression:** Multiple levels of fences with increasing size.
- **Win/Lose Conditions:** 
  - **Win:** Last fence destroyed.
  - **Lose:** Tank collides with a wall.

---

## 🎮 Gameplay

1. Player spawns in a fenced arena with a tank.
2. Navigate the arena while avoiding wall collisions.
3. Destroy fences to progress to the next level.
4. Hidden wall puzzles change each level using phrase-based logic.
5. Game ends when:
   - The last fence is destroyed → **You Win!**
   - Tank collides with a wall → **You Lose!**

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Three.js (WebGL)
- **Game Engine:** Modular JS classes:
  - `Game.js` – Core game logic
  - `Renderer.js` – 3D rendering
  - `Fance.js` – Fence creation and shrinking
  - `PlayerTank.js` – Tank movement and shooting
  - `CollisionHandler.js` – Collision detection
- **Puzzle Logic:** Phrase-based wall generation

---
👥 Team Members
  - Abrham Aragie 0089/16
  - Ahadu Akalu 0113/16
  - Amir Yimam 0169/16
  - Abenezer Dagne 056/16
  - Aschalew Getahun 0193/16
  - Dagmawi Feyissa 0367/16



