# 3D Fireworks System

## Components

- `src/fx/Fireworks.tsx` — Three.js Canvas với rocket + particle system
- `src/fx/Confetti.tsx` — Canvas 2D confetti với physics

## Fireworks implementation

### Rocket system
- Launch: 800ms interval, max 6 rockets active
- Each rocket: position + velocity Vector3, age tracking, color from palette
- Explosion: 28 particles radially spread, random speed 2-6
- Gravity: 9 * delta downward on rockets, 2.5 * delta on particles
- Blending: `THREE.AdditiveBlending` for glow effect

### Confetti implementation
- 180 pieces, Canvas 2D (performant, no GPU overhead)
- Random colors from 8-color palette
- Physics: gravity 0.04, rotation, fade out at 70% screen height
- Resize handler for responsive canvas

## Performance

- Rockets max 6, particles max 200
- Canvas 2D confetti — no Three.js overhead
- RAF-based animation loop

## Colors

`['#ff77c1', '#5cc8ff', '#ffe27a', '#7cffcb', '#ff6b6b', '#a78bfa', '#fb7185', '#22d3ee']`
