'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/logo.glb';

function LogoModel({ onLoaded }: { onLoaded: () => void }) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Modeli boyutundan bagimsiz olarak sahneye sigacak sekilde normalize et
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3()).length();
    return size > 0 ? 3.4 / size : 1;
  }, [scene]);

  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.35;
    const targetX = pointer.current.y * 0.2;
    const targetZ = pointer.current.x * 0.1;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={group} scale={scale}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </Float>
  );
}

export default function HeroLogo3D() {
  const [modelAvailable, setModelAvailable] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // GLB henuz uretilmediyse webp fallback'te kal
  useEffect(() => {
    let alive = true;
    fetch(MODEL_URL, { method: 'HEAD' })
      .then((res) => {
        if (alive && res.ok) {
          useGLTF.preload(MODEL_URL);
          setModelAvailable(true);
        }
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  if (!modelAvailable) {
    return <img src="/logo.webp" alt="Piton Studios" className="hero-logo" />;
  }

  return (
    <div className="hero-logo hero-logo-3d">
      <img
        src="/logo.webp"
        alt="Piton Studios"
        className="hero-logo-fallback"
        style={{ opacity: modelLoaded ? 0 : 1 }}
      />
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-4, -2, -3]} intensity={0.6} color="#2b9ce0" />
        <Suspense fallback={null}>
          <LogoModel onLoaded={() => setModelLoaded(true)} />
        </Suspense>
      </Canvas>
    </div>
  );
}
