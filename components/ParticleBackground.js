// 'use client';

// import { Canvas, useFrame } from '@react-three/fiber';
// import { useRef, useMemo, useEffect, useState } from 'react';
// import * as THREE from 'three';

// function CircleParticles({ count = 100 }) {
//   const mesh = useRef();

//   const positions = useMemo(() => {
//     const pos = [];
//     for (let i = 0; i < count; i++) {
//       const angle = (i / count) * Math.PI * 2;
//       const radius = 5 + Math.random(); // Create a circular pattern
//       const x = Math.cos(angle) * radius;
//       const y = Math.sin(angle) * radius;
//       const z = Math.random() * 2 - 1;
//       pos.push(x, y, z);
//     }
//     return new Float32Array(pos);
//   }, [count]);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     if (mesh.current) {
//       mesh.current.rotation.z = t * 0.1;
//     }
//   });

//   return (
//     <points ref={mesh}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={positions.length / 3}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         color={'#ffffff'}
//         size={0.15}
//         sizeAttenuation
//         transparent
//         opacity={0.6}
//         blending={THREE.AdditiveBlending}
//         depthWrite={false}
//       />
//     </points>
//   );
// }

// export default function ParticleBackground() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         width: '100vw',
//         height: '100vh',
//         top: 0,
//         left: 0,
//         zIndex: 0,
//         pointerEvents: 'none',
//       }}
//     >
//       <Canvas
//         camera={{ position: [0, 0, 10], fov: 60 }}
//         gl={{ alpha: true, antialias: true }}
//         style={{
//           background: 'transparent',
//         }}
//       >
//         <ambientLight intensity={0.2} />
//         <CircleParticles count={120} />
//       </Canvas>
//     </div>
//   );
// }


'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function CircleParticles({ count = 200 }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  
  // Create a color palette
  const colors = useMemo(() => {
    const palette = [
      new THREE.Color(0.9, 0.4, 0.9),  // Pink
      new THREE.Color(0.6, 0.4, 0.9),  // Purple
      new THREE.Color(0.4, 0.6, 0.9),  // Blue
      new THREE.Color(0.9, 0.9, 0.4)   // Gold
    ];
    
    const col = [];
    for (let i = 0; i < count; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)];
      col.push(color.r, color.g, color.b);
    }
    return new Float32Array(col);
  }, [count]);

  // Create circular formations with multiple rings
  const positions = useMemo(() => {
    const pos = [];
    const rings = 5;
    const particlesPerRing = count / rings;
    
    for (let r = 0; r < rings; r++) {
      const radius = 3 + r * 1.5;
      for (let i = 0; i < particlesPerRing; i++) {
        const angle = (i / particlesPerRing) * Math.PI * 2;
        const variance = 0.3 * Math.random();
        const x = Math.cos(angle) * (radius + variance);
        const y = Math.sin(angle) * (radius + variance);
        const z = (Math.random() - 0.5) * 10;
        pos.push(x, y, z);
      }
    }
    return new Float32Array(pos);
  }, [count]);

  // Add slight size variation
  const sizes = useMemo(() => {
    const size = [];
    for (let i = 0; i < count; i++) {
      size.push(0.1 + Math.random() * 0.2);
    }
    return new Float32Array(size);
  }, [count]);

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    
    if (mesh.current) {
      // Gentle rotation
      mesh.current.rotation.z = time * 0.05;
      
      // Pulsing effect
      mesh.current.material.size = 0.1 + Math.sin(time * 0.5) * 0.05;
      
      // Subtle mouse interaction
      if (hovered) {
        mesh.current.position.x = THREE.MathUtils.lerp(
          mesh.current.position.x,
          mouse.x * 0.5,
          0.03
        );
        mesh.current.position.y = THREE.MathUtils.lerp(
          mesh.current.position.y,
          mouse.y * 0.5,
          0.03
        );
      }
    }
  });

  return (
    <points 
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#a78bfa" />
        
        <CircleParticles count={300} />
        
        <EffectComposer>
          <Bloom
            intensity={1.2}
            kernelSize={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.4}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}