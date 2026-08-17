# Nova Sphere — 3D Web Experience

An interactive 3D product experience built for FlyRank Week 7 using React, TypeScript, Three.js, and React Three Fiber.

## Features

- Interactive 3D product viewer
- Automatic object rotation
- Mouse/touch orbit controls
- Scroll-to-zoom
- Material color configurator
- Real-time WebGL rendering
- Environment lighting
- Responsive mobile-friendly layout
- Accessible controls and labels

## Tech Stack

- React
- TypeScript
- Three.js
- React Three Fiber
- React Three Drei
- Vite
- CSS

## Interaction

Users can:

1. Drag the 3D object to explore it.
2. Scroll to zoom in and out.
3. Select different material colors.
4. Watch the object continuously rotate automatically.

## 3D Implementation

The 3D scene is rendered using React Three Fiber. The product is created with an `icosahedronGeometry` and a `meshStandardMaterial`.

`OrbitControls` provides camera interaction while `useFrame` handles continuous object rotation.

## Performance

The experience uses a lightweight geometry and environment lighting to keep the scene responsive. The layout is also optimized for smaller screens.

## Run Locally

```bash
npm install
npm run dev