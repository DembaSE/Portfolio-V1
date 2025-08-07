import * as THREE from 'three';
import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import CursorFollowCamera from './assets/controls/CursorFollowCamera';
import NameTitle from './assets/components/NameTitle';
import GalaxyBackground from './assets/canvas/GalaxyBackground';
import WelcomeSection from './assets/components/WelcomeSection';
import InfoCardsSection from './assets/components/InfoCardsSection';

// Slide to Unlock Component
function SlideToUnlock({ onUnlock }) {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(300);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth - 60);
    }
  }, []);

  const handleDragEnd = (_, info) => {
    if (info.point.x >= trackWidth) {
      animate(x, trackWidth, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        onComplete: onUnlock,
      });
    } else {
      animate(x, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0B1E3F',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#D6E5FA',
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: '40px',
          fontSize: '2.5rem',
          fontWeight: '600',
          letterSpacing: '4px',
          textTransform: 'uppercase',
        }}
      >
        Demba's Portfolio
      </h1>
      <motion.div
        ref={trackRef}
        style={{
          width: '300px',
          height: '60px',
          background: '#09162F',
          border: '1px solid #1A2F4D',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          position: 'relative',
          boxShadow: '0 0 10px rgba(0,255,150,0.15)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: trackWidth }}
          style={{
            x,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00ff99, #00ccff)',
            cursor: 'grab',
            zIndex: 2,
            boxShadow: '0 0 10px #00ffaa',
          }}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 1.1 }}
        />
        <div
          style={{
            position: 'absolute',
            left: '80px',
            fontSize: '14px',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #AFC7E9 20%, #ffffff 50%, #AFC7E9 80%)',
            backgroundSize: '300% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            animation: 'shine 3s ease-in-out infinite',
            userSelect: 'none',
            zIndex: 3,
            letterSpacing: '1px',
            whiteSpace: 'nowrap',
          }}
        >
          → Slide to Unlock
        </div>
      </motion.div>
    </motion.div>
  );
}

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 40,
        height: 40,
        border: '4px solid #00ccff',
        borderTop: '4px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        zIndex: 10000,
      }}
    />
  );
}

// Scene Components
function SceneBackground() {
  const { scene } = useThree();
  useFrame(() => {
    scene.background = new THREE.Color('#0B1E3F');
  });
  return null;
}

function CameraController() {
  const scroll = useScroll();
  const { camera } = useThree();
  useFrame(() => {
    if (scroll && scroll.offset !== null) {
      camera.position.y = -scroll.offset * 20;
    }
  });
  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1} />
    </>
  );
}

function Model({ setCanvasLoaded }) {
  const gltf = useLoader(GLTFLoader, '/models/earth.glb');
  const mixer = useRef();
  const { viewport } = useThree();
  const minScale = 1.9;
  const maxScale = 6.2;
  const baseScale = 1.1;
  const dynamicScale = viewport.height * baseScale;
  const scale = Math.min(Math.max(dynamicScale, minScale), maxScale);
  const posX = 0;
  const posY = -viewport.height * 3.7;
  const posZ = -5;
  const rotX = -0.5;
  const rotY = -1.0;
  const rotZ = 0.09;

  useEffect(() => {
    if (gltf) {
      setCanvasLoaded(true);
    }

    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.current.clipAction(gltf.animations[0]);
      action.play();
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
      }
    };
  }, [gltf, setCanvasLoaded]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <group>
      <primitive
        object={gltf.scene}
        position={[posX, posY, posZ]}
        scale={[scale, scale, scale]}
        rotation={[rotX, rotY, rotZ]}
      />
    </group>
  );
}

// Main App
export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0B1E3F' }}>
      <AnimatePresence>
        {!unlocked && (
          <SlideToUnlock key="lockscreen" onUnlock={() => setUnlocked(true)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {unlocked && (
          <motion.div
            key="canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#0B1E3F',
              zIndex: 0,
            }}
          >
            {!canvasLoaded && <LoadingSpinner />}
            <Canvas
              camera={{ position: [0, 0, 3] }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#0B1E3F',
              }}
            >
              <SceneBackground />
              <Lights />
              <ScrollControls pages={4} damping={0.1}>
                <Scroll>
                  <Suspense fallback={null}>
                    <GalaxyBackground />
                    <NameTitle />
                    <Model setCanvasLoaded={setCanvasLoaded} />
                  </Suspense>
                </Scroll>
                <Scroll html>
                  <div style={{ position: 'relative', width: '100vw', height: '100vh', zIndex: 1 }}>
                    <div style={{ width: '100vw', height: '100vh' }} id="TWO" />
                    <div
                      style={{
                        width: '100vw',
                        height: '60vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingTop: '30vh',
                        paddingBottom: '10vh',
                      }}
                      id="THREE"
                    >
                      <WelcomeSection />
                    </div>
                    <div style={{ width: '100vw', height: '100vh' }} id="FOUR">
                      <InfoCardsSection />
                    </div>
                  </div>
                </Scroll>
                <CameraController />
              </ScrollControls>
              <CursorFollowCamera />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Global CSS styles for spinner animation
const styleElement = document.createElement('style');
styleElement.textContent = `
  @keyframes shine {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleElement);
