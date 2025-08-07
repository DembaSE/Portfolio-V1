import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

// Import your icon images
import ReactIcon from '../react-icon.png';
import PythonIcon from '../Python-icon.png';
import JsIcon from '../js-icon.png';

function GalaxyElement({ texture, position, size }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const elapsedTime = clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(elapsedTime) * 0.5;
      ref.current.rotation.y = elapsedTime * 0.2;
    }
  });

  return (
    <sprite ref={ref} position={position} scale={[size, size, 1]}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
}

function Star({ position }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const elapsedTime = clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(elapsedTime * 0.7) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
    </mesh>
  );
}

export default function GalaxyBackground() {
  // Load textures for the icons
  const reactTexture = useLoader(TextureLoader, ReactIcon);
  const pythonTexture = useLoader(TextureLoader, PythonIcon);
  const jsTexture = useLoader(TextureLoader, JsIcon);

  const icons = [
    { texture: reactTexture, position: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, -Math.random() * 50 - 10], size: 2 },
    { texture: pythonTexture, position: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, -Math.random() * 50 - 10], size: 2 },
    { texture: jsTexture, position: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, -Math.random() * 50 - 10], size: 2 },
    // Add more icons as needed
  ];

  const stars = Array.from({ length: 100 }, () => ({
    position: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, -Math.random() * 100 - 10]
  }));

  return (
    <>
      {icons.map((icon, i) => (
        <GalaxyElement key={i} texture={icon.texture} position={icon.position} size={icon.size} />
      ))}
      {stars.map((star, i) => (
        <Star key={i} position={star.position} />
      ))}
    </>
  );
}
