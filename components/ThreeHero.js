'use client';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

function Quote3D() {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2.5}>
      <mesh>
        <torusGeometry args={[1, 0.38, 36, 100]} />
        <meshStandardMaterial
          color="#a78bfa"
          metalness={0.65}
          roughness={0.12}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeHero() {
  return (
    <div style={{ width: '100%', height: 240 }}>
      <Canvas camera={{ position: [0, 0, 4.25] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 1]} intensity={1.18} />
        <Quote3D />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
      </Canvas>
    </div>
  );
}
