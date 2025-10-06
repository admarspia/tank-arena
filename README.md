# Tank Arena: Maze Escape 

**Tank Arena: Maze Escape** is a 2D browser-based tank battle game built with **HTML, CSS, and JavaScript**, combining **action gameplay** with **puzzle-like maze navigation**.  
Players must **navigate through maze-like maps**, defeat AI-controlled tanks, and **reach the exit** while avoiding obstacles.  
The game supports **single-player mode** with AI opponents and **multiplayer mode** using real-time WebSocket communication.

---

##  Team Members
- Abrham Aragie 0089/16  
- Ahadu Akalu 0103/16  
- Abenezer Dagne 056/16  
- Aschalew Getahun 0193/16  
- Dabmawi Feyisa 0367/16  

---

## 🎯 Goal
Build a **modular game engine** that handles rendering, physics, player control, and maze navigation while experimenting with:  

-  **Real-time multiplayer synchronization**  
-  **AI behavior** using C++ (compiled to WebAssembly) to navigate mazes and engage the player  
-  **Efficient canvas-based rendering** for dynamic mazes and obstacles  
-  **Maze mechanics**: procedurally generated or predefined maps with walls, paths, and exit points  

---

##  Current Status
Currently setting up the **core game engine**, including:  

- Player movement and shooting  
- Collision system  
- Basic game loop using `requestAnimationFrame`  
- Maze framework that supports:  
  - Loading maze layouts from JSON  
  - Rendering walls and paths on the canvas  
  - Maze-based collision detection for tanks and bullets  

**Next Steps:**  

1. Implement AI tanks navigating the maze using **C++ → WebAssembly** logic  
2. Add **multiplayer support** with synchronized game states  
3. Introduce **power-ups**, dynamic obstacles, and progressively complex maze levels  

---

## Gameplay Overview
- Players start in a **maze level** with walls, corridors, and a defined exit  
- **Objective:** Navigate the maze while defeating AI tanks and reaching the exit  
- **Single-Player Mode:** AI tanks use pathfinding logic to chase the player  
- **Multiplayer Mode:** All players share the same maze, with real-time movement and combat  
- **Power-Ups (Optional):** Health packs, ammo, speed boosts, or radar to reveal hidden paths  

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript (Canvas API)  
- **Backend:** JavaScript using node.js runtime environment (WebSocket server)  
- **AI / Performance Module:** C++ → WebAssembly  

---

