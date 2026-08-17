import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
} from "@react-three/drei";
import { useState } from "react";
import "./App.css";

interface ProductProps {
  color: string;
}

function Product({ color }: ProductProps) {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.8}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[1.7, 2]} />

        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function App() {
  const [color, setColor] = useState("#00e5ff");

  const colors = [
    "#00e5ff",
    "#8b5cf6",
    "#22c55e",
    "#f97316",
  ];

  return (
    <div className="app">
      {/* HEADER */}
      <header>
        <div>
          <p className="eyebrow">
            WEEK 7 • 3D EXPERIENCE
          </p>

          <h1>Nova Sphere</h1>

          <p className="subtitle">
            An interactive 3D product experience built with
            React Three Fiber.
          </p>
        </div>

        <div className="badge">
          ● LIVE 3D
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {/* 3D VIEWER */}
        <section className="viewer">
          <Canvas
            camera={{
              position: [0, 0, 6],
              fov: 45,
            }}
            shadows
          >
            <ambientLight intensity={0.8} />

            <directionalLight
              position={[3, 4, 5]}
              intensity={2}
              castShadow
            />

            <Product color={color} />

            <Environment preset="city" />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
            />
          </Canvas>

          <div className="viewer-label">
            Drag to rotate • Scroll to zoom
          </div>
        </section>

        {/* CONFIGURATOR */}
        <aside className="controls">
          <span className="eyebrow">
            CONFIGURATOR
          </span>

          <h2>Customize your object</h2>

          <p>
            Change the material color and explore the model
            from every angle.
          </p>

          {/* COLOR CONTROL */}
          <div className="control">
            <label>Material Color</label>

            <div className="colors">
              {colors.map((item) => (
                <button
                  key={item}
                  className="color-btn"
                  style={{
                    backgroundColor: item,
                  }}
                  onClick={() => setColor(item)}
                  aria-label={`Change color to ${item}`}
                />
              ))}
            </div>
          </div>

          {/* PROJECT INFORMATION */}
          <div className="info">
            <div>
              <span>Technology</span>
              <strong>
                React Three Fiber
              </strong>
            </div>

            <div>
              <span>Interaction</span>
              <strong>
                Orbit Controls
              </strong>
            </div>

            <div>
              <span>Rendering</span>
              <strong>
                WebGL
              </strong>
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer>
        Built with React + TypeScript + Three.js •
        FlyRank Week 7
      </footer>
    </div>
  );
}

export default App;