import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ISSPosition } from '../types/space';

interface Earth3DProps {
  issPosition?: ISSPosition;
}

function EarthSphere({ issPosition }: { issPosition?: ISSPosition }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const issRef = useRef<THREE.Mesh>(null);

  // Create Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Create gradient for Earth-like appearance
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(0.3, '#065f46');
    gradient.addColorStop(0.7, '#166534');
    gradient.addColorStop(1, '#1e3a8a');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add some land-like patterns
    ctx.fillStyle = '#22c55e';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const size = Math.random() * 30 + 10;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    
    if (issRef.current && issPosition) {
      // Convert lat/lng to 3D position on sphere
      const phi = (90 - issPosition.latitude) * (Math.PI / 180);
      const theta = (issPosition.longitude + 180) * (Math.PI / 180);
      const radius = 2.1;
      
      issRef.current.position.x = radius * Math.sin(phi) * Math.cos(theta);
      issRef.current.position.y = radius * Math.cos(phi);
      issRef.current.position.z = radius * Math.sin(phi) * Math.sin(theta);
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      
      {issPosition && (
        <mesh ref={issRef}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5} />
        </mesh>
      )}
      
      {/* ISS orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.08, 2.12, 64]} />
        <meshBasicMaterial color="#8cbdf8" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

export default function Earth3D({ issPosition }: Earth3DProps) {
  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 5]} intensity={1} />
        <EarthSphere issPosition={issPosition} />
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}