import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';

import ReactIcon from '../react-icon.png';
import PythonIcon from '../Python-icon.png';
import JsIcon from '../js-icon.png';
import SwiftIcon from '../swift-icon.png';
import AndroidIcon from '../android-icon.png';
import ProgrammingIcon from '../programming.png';
import SwedenIcon from '../sweden-icon.png';
import ParisIcon from '../paris-icon.png';
import JavaIcon from '../java-icon.png';
import VsIcon from '../vs-icon.png';

function GalaxyElement({ texture, position, size }) {
  const ref = useRef();
  const oscillationSpeedX = Math.random() * 0.5 + 0.1;
  const oscillationSpeedY = Math.random() * 0.5 + 0.1;
  const oscillationSpeedZ = Math.random() * 0.5 + 0.1;
  const oscillationAmplitudeX = Math.random() * 1 + 0.5;
  const oscillationAmplitudeY = Math.random() * 1 + 0.5;
  const rotationSpeed = Math.random() * 0.5 + 0.2;

  useFrame(({ clock }) => {
    if (ref.current) {
      const elapsedTime = clock.getElapsedTime();
      const baseX = position[0];
      const baseY = position[1];
      const baseZ = position[2];
      const oscillationX = Math.sin(elapsedTime * oscillationSpeedX) * oscillationAmplitudeX;
      const oscillationY = Math.sin(elapsedTime * oscillationSpeedY) * oscillationAmplitudeY;
      const oscillationZ = Math.sin(elapsedTime * oscillationSpeedZ) * oscillationAmplitudeY;

      ref.current.position.x = baseX + oscillationX;
      ref.current.position.y = baseY + oscillationY;
      ref.current.position.z = baseZ + oscillationZ;
      ref.current.rotation.x = elapsedTime * rotationSpeed;
      ref.current.rotation.y = elapsedTime * rotationSpeed;
    }
  });

  return (
    <sprite ref={ref} position={position} scale={[size, size, 1]}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
}

function Star({ initialPosition }) {
  const ref = useRef();
  const { radius, initialAngle, baseY } = useMemo(() => {
    const x = initialPosition[0];
    const z = initialPosition[2];
    return {
      radius: Math.sqrt(x * x + z * z),
      initialAngle: Math.atan2(z, x),
      baseY: initialPosition[1],
    };
  }, [initialPosition]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const elapsedTime = clock.getElapsedTime();
      const angularSpeed = 0.041;
      const angle = initialAngle + elapsedTime * angularSpeed;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = baseY + Math.sin(elapsedTime * 1.5) * 0.1;

      ref.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={ref} position={initialPosition}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
    </mesh>
  );
}

function ShootingStar({ onComplete }) {
  const ref = useRef();
  const [position, setPosition] = useState([
    Math.random() * 100 - 50,
    Math.random() * 50 + 25,
    Math.random() * -100 - 50,
  ]);
  const [direction] = useState([
    Math.random() * 2 - 1,
    Math.random() * -2 - 1,
    Math.random() * -1,
  ]);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += direction[0] * 0.1;
      ref.current.position.y += direction[1] * 0.1;
      ref.current.position.z += direction[2] * 0.1;

      setOpacity((prevOpacity) => {
        const newOpacity = prevOpacity - 0.005;
        return newOpacity > 0 ? newOpacity : 0;
      });
    }
  });

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(direction[0] * -5, direction[1] * -5, direction[2] * -5));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={ref} position={position}>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial
        attach="material"
        color="#ffffff"
        linewidth={2}
        transparent={true}
        opacity={opacity}
      />
    </line>
  );
}

function ShootingStarsManager() {
  const [shootingStarActive, setShootingStarActive] = useState(true);

  const handleShootingStarComplete = () => {
    setShootingStarActive(false);
    setTimeout(() => setShootingStarActive(true), 1000);
  };

  return (
    <>
      {shootingStarActive && <ShootingStar onComplete={handleShootingStarComplete} />}
    </>
  );
}

function randomWithinRangeButAvoidCenter(range, minDist) {
  let value;
  do {
    value = (Math.random() - 0.5) * range;
  } while (Math.abs(value) < minDist);
  return value;
}

function distanceXY(pos1, pos2) {
  const dx = pos1[0] - pos2[0];
  const dy = pos1[1] - pos2[1];
  return Math.sqrt(dx * dx + dy * dy);
}

export default function GalaxyBackground() {
  const reactTexture = useLoader(TextureLoader, ReactIcon);
  const pythonTexture = useLoader(TextureLoader, PythonIcon);
  const jsTexture = useLoader(TextureLoader, JsIcon);
  const swiftTexture = useLoader(TextureLoader, SwiftIcon);
  const androidTexture = useLoader(TextureLoader, AndroidIcon);
  const programmingTexture = useLoader(TextureLoader, ProgrammingIcon);
  const swedenTexture = useLoader(TextureLoader, SwedenIcon);
  const parisTexture = useLoader(TextureLoader, ParisIcon);
  const javaTexture = useLoader(TextureLoader, JavaIcon);
  const vsTexture = useLoader(TextureLoader, VsIcon);

  const textures = [
    reactTexture,
    pythonTexture,
    jsTexture,
    swiftTexture,
    androidTexture,
    programmingTexture,
    swedenTexture,
    parisTexture,
    javaTexture,
    vsTexture,
  ];

  const icons = [];
  const minDistance = 6;
  const rangeXY = 40;
  const minDistFromCenter = 8;
  const minY = -2;
  const maxY = 7.5;

  for (let i = 0; i < textures.length; i++) {
    let pos;
    let tries = 0;
    do {
      const x = randomWithinRangeButAvoidCenter(rangeXY, minDistFromCenter);
      const yCandidate = randomWithinRangeButAvoidCenter(rangeXY, minDistFromCenter);
      const y = Math.min(Math.max(yCandidate, minY), maxY);
      const z = -Math.random() * 15 - 2;
      pos = [x, y, z];
      const minSafeDistance = minDistance * 0.9 + tries / 100 * minDistance * 0.1;
      const tooClose = icons.some((icon) => distanceXY(icon.position, pos) < minSafeDistance);
      if (!tooClose || tries > 100) break;
      tries++;
    } while (true);
    icons.push({ texture: textures[i], position: pos, size: 2 });
  }

  const stars = Array.from({ length: 450 }, () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = Math.random() * 100 + 50;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return { initialPosition: [x, y, z] };
  });

  return (
    <>
      {icons.map((icon, i) => (
        <GalaxyElement key={i} texture={icon.texture} position={icon.position} size={icon.size} />
      ))}
      {stars.map((star, i) => (
        <Star key={i} initialPosition={star.initialPosition} />
      ))}
    </>
  );
}
