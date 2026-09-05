'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  AdaptiveDpr,
  Billboard,
  RoundedBox,
  Stars,
  useTexture,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface ProjectCloudItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  kind: string;
  year: string;
  image: string;
  format: 'landscape' | 'portrait';
  accent: 'red' | 'cyan';
}

interface ProgressRef {
  current: number;
}

interface ProjectCloudCanvasProps {
  projects: ProjectCloudItem[];
  activeSlug: string;
  progressRef: ProgressRef;
  onFocus: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  onContextLost: () => void;
}

interface ProjectMockupProps {
  project: ProjectCloudItem;
  index: number;
  projectCount: number;
  compact: boolean;
  isActive: boolean;
  isHovered: boolean;
  hasFocusedCard: boolean;
  progressRef: ProgressRef;
  onFocus: (slug: string) => void;
  onBlur: () => void;
  onSelect: (slug: string) => void;
}

const ACCENTS = {
  red: '#ff4458',
  cyan: '#00c8ff',
} as const;

const COMPACT_QUERY = '(max-width: 767px), (max-height: 519px)';

function ProjectMockup({
  project,
  index,
  projectCount,
  compact,
  isActive,
  isHovered,
  hasFocusedCard,
  progressRef,
  onFocus,
  onBlur,
  onSelect,
}: ProjectMockupProps) {
  const orbitRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const initializedRef = useRef(false);
  const touchPointerRef = useRef(false);
  const frameMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const imageMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const topAccentMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const bottomAccentMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const sourceTexture = useTexture(project.image);
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  const accent = ACCENTS[project.accent];
  const baseTilt = ((index % 5) - 2) * 0.026;
  const isPortrait = project.format === 'portrait';
  const width = isPortrait ? 0.78 : 1.94;
  const height = isPortrait ? 1.68 : 1.09;
  const frameWidth = width + 0.14;
  const frameHeight = height + 0.22;

  const texture = useMemo(() => {
    const preparedTexture = sourceTexture.clone();
    preparedTexture.colorSpace = THREE.SRGBColorSpace;
    preparedTexture.anisotropy = Math.min(4, maxAnisotropy);
    preparedTexture.needsUpdate = true;
    return preparedTexture;
  }, [maxAnisotropy, sourceTexture]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ clock, size }, delta) => {
    const orbit = orbitRef.current;
    const group = groupRef.current;
    if (!orbit || !group) return;

    // Every card travels along the same two-sided corkscrew. Wrapping happens
    // at the farthest point, behind the visible cloud, so the loop feels endless.
    const cursor = progressRef.current * Math.max(1, projectCount - 1);
    const halfCount = projectCount / 2;
    const relativeIndex = THREE.MathUtils.euclideanModulo(
      index - cursor + halfCount,
      projectCount
    ) - halfCount;
    const depth = Math.abs(relativeIndex);
    const angle = relativeIndex * 0.9;
    const aspect = size.width / Math.max(1, size.height);
    const horizontalScale = compact
      ? THREE.MathUtils.clamp(aspect / 1.12, 0.36, 0.9)
      : 1;
    const verticalScale = compact ? 0.76 : 1;
    const radialBlend = THREE.MathUtils.smoothstep(depth, 0.04, 0.95);
    const radius = (0.92 + depth * 0.69) * radialBlend;
    const organicOffset = Math.sin((index + 1) * 2.17) * 0.18 * radialBlend;
    const maxDepth = Math.max(1, halfCount);
    const frontness = Math.pow(THREE.MathUtils.clamp(1 - depth / maxDepth, 0, 1), 1.12);
    const idleDrift = Math.sin(clock.elapsedTime * 0.45 + index * 0.82) * 0.035 * radialBlend;

    const xTarget = Math.sin(angle) * radius * horizontalScale;
    const yTarget = (
      Math.cos(angle) * radius * 0.61 + organicOffset + idleDrift
    ) * verticalScale;
    const depthTarget = compact ? 0.72 - depth * 0.58 : 0.86 - depth * 0.74;

    if (!initializedRef.current) {
      orbit.position.set(xTarget, yTarget, depthTarget);
      initializedRef.current = true;
    } else {
      orbit.position.x = THREE.MathUtils.damp(orbit.position.x, xTarget, 7.5, delta);
      orbit.position.y = THREE.MathUtils.damp(orbit.position.y, yTarget, 7.5, delta);
      orbit.position.z = THREE.MathUtils.damp(orbit.position.z, depthTarget, 7.5, delta);
    }

    const compactScale = compact ? (isPortrait ? 1.28 : 1.2) : 1;
    const depthScale = (0.64 + frontness * 0.43) * compactScale;
    const focusScale = isHovered ? (compact ? 1.06 : 1.16) : isActive ? 1.035 : 1;
    const scaleTarget = depthScale * focusScale;
    const zTarget = isHovered ? (compact ? 0.22 : 0.52) : isActive ? 0.1 : 0;
    const opacityFromDepth = compact
      ? 0.12 + Math.pow(frontness, 1.35) * 0.88
      : 0.18 + frontness * 0.82;
    const focusMultiplier = hasFocusedCard && !isActive && !isHovered ? 0.42 : 1;
    const opacityTarget = opacityFromDepth * focusMultiplier;

    const scale = THREE.MathUtils.damp(group.scale.x, scaleTarget, 7, delta);
    group.scale.setScalar(scale);
    group.position.z = THREE.MathUtils.damp(group.position.z, zTarget, 7, delta);
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      isHovered ? Math.sin(angle) * 0.16 : Math.sin(angle) * 0.055,
      6,
      delta
    );
    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      baseTilt + Math.sin(angle) * 0.045,
      5,
      delta
    );

    const materials = [
      frameMaterialRef.current,
      imageMaterialRef.current,
      topAccentMaterialRef.current,
      bottomAccentMaterialRef.current,
    ];
    for (const material of materials) {
      if (!material) continue;
      material.opacity = THREE.MathUtils.damp(material.opacity, opacityTarget, 6, delta);
    }
  });

  return (
    <group ref={orbitRef}>
      <Billboard follow>
        <group
          ref={groupRef}
          rotation={[0, 0, baseTilt]}
          onPointerEnter={(event) => {
            if (event.pointerType !== 'mouse') return;
            event.stopPropagation();
            onFocus(project.slug);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType !== 'mouse') return;
            event.stopPropagation();
            onBlur();
          }}
          onPointerDown={(event) => {
            touchPointerRef.current = event.pointerType === 'touch';
          }}
          onPointerCancel={() => {
            touchPointerRef.current = false;
          }}
          onClick={(event) => {
            event.stopPropagation();
            if (event.delta > 10) {
              touchPointerRef.current = false;
              return;
            }
            if (touchPointerRef.current && !isHovered) {
              touchPointerRef.current = false;
              onFocus(project.slug);
              return;
            }
            touchPointerRef.current = false;
            onSelect(project.slug);
          }}
        >
          <RoundedBox
            args={[frameWidth, frameHeight, 0.08]}
            radius={0.055}
            smoothness={compact ? 2 : 3}
          >
            <meshBasicMaterial
              ref={frameMaterialRef}
              color={isHovered || isActive ? '#13131a' : '#060609'}
              transparent
              opacity={1}
            />
          </RoundedBox>

          <mesh position={[0, 0.035, 0.047]}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial
              ref={imageMaterialRef}
              map={texture}
              toneMapped={false}
              transparent
              opacity={1}
            />
          </mesh>

          <mesh position={[0, frameHeight / 2 - 0.045, 0.054]}>
            <planeGeometry args={[width, 0.018]} />
            <meshBasicMaterial
              ref={topAccentMaterialRef}
              color={accent}
              transparent
              opacity={0.95}
            />
          </mesh>

          <mesh position={[width * 0.31, -frameHeight / 2 + 0.045, 0.054]}>
            <planeGeometry args={[width * 0.34, 0.012]} />
            <meshBasicMaterial
              ref={bottomAccentMaterialRef}
              color={accent}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </Billboard>
    </group>
  );
}

function Cloud({
  projects,
  activeSlug,
  progressRef,
  onFocus,
  onSelect,
  compact,
}: Omit<ProjectCloudCanvasProps, 'onContextLost'> & { compact: boolean }) {
  const cloudRef = useRef<THREE.Group>(null);
  const previousProgressRef = useRef(0);
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null);
  const regress = useThree((state) => state.performance.regress);

  useFrame(({ camera, clock, pointer }, delta) => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const time = clock.getElapsedTime();
    const progress = progressRef.current;

    const moved = Math.abs(progress - previousProgressRef.current) > 0.0005;
    if (moved && !compact) regress();

    if (focusedSlug && moved) {
      setFocusedSlug(null);
      onFocus(null);
    }
    previousProgressRef.current = progress;

    const idleYaw = focusedSlug ? 0 : Math.sin(time * 0.16) * 0.055;
    const targetY = idleYaw + (compact ? 0 : pointer.x * 0.035);
    const targetX = Math.sin(progress * Math.PI * 2) * 0.035
      - (compact ? 0 : pointer.y * 0.035);
    const targetZ = (progress - 0.5) * 0.11;

    cloud.rotation.y = THREE.MathUtils.damp(cloud.rotation.y, targetY, 2.8, delta);
    cloud.rotation.x = THREE.MathUtils.damp(cloud.rotation.x, targetX, 2.8, delta);
    cloud.rotation.z = THREE.MathUtils.damp(cloud.rotation.z, targetZ, 2.8, delta);
    cloud.position.y = THREE.MathUtils.damp(
      cloud.position.y,
      compact
        ? -0.16 + (0.5 - progress) * 0.12 + Math.sin(time * 0.22) * 0.018
        : (0.5 - progress) * 0.28 + Math.sin(time * 0.22) * 0.035,
      2.4,
      delta
    );
    cloud.position.z = THREE.MathUtils.damp(
      cloud.position.z,
      Math.sin(progress * Math.PI * 2) * 0.1,
      2.4,
      delta
    );

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      compact ? 0 : pointer.x * 0.18,
      3,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      compact ? 0 : pointer.y * 0.1,
      3,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      (compact ? 8.9 : 10.15) - Math.sin(progress * Math.PI) * (compact ? 0.12 : 0.28),
      2.6,
      delta
    );
    camera.lookAt(0, compact ? -0.12 : 0, -1.25);
  });

  return (
    <group ref={cloudRef}>
      {projects.map((project, index) => (
        <ProjectMockup
          key={project.id}
          project={project}
          index={index}
          projectCount={projects.length}
          compact={compact}
          isActive={activeSlug === project.slug}
          isHovered={focusedSlug === project.slug}
          hasFocusedCard={focusedSlug !== null}
          progressRef={progressRef}
          onFocus={(slug) => {
            setFocusedSlug(slug);
            onFocus(slug);
          }}
          onBlur={() => {
            setFocusedSlug(null);
            onFocus(null);
          }}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

function OrbitLines() {
  return (
    <group position={[0, -0.25, -4.5]} rotation={[Math.PI / 2.45, 0.2, 0]}>
      <mesh>
        <torusGeometry args={[5.6, 0.012, 6, 160]} />
        <meshBasicMaterial color="#ff4458" transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[0.1, 0.22, 0.1]}>
        <torusGeometry args={[4.35, 0.01, 6, 160]} />
        <meshBasicMaterial color="#00c8ff" transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

function SceneDecor({ compact }: { compact: boolean }) {
  return (
    <>
      <Stars
        radius={compact ? 17 : 24}
        depth={compact ? 9 : 14}
        count={compact ? 180 : 480}
        factor={compact ? 1.55 : 2.1}
        saturation={0}
        fade
        speed={compact ? 0.06 : 0.12}
      />
      {compact ? null : <OrbitLines />}
    </>
  );
}

function ContextGuard({ onContextLost }: Pick<ProjectCloudCanvasProps, 'onContextLost'>) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    return () => canvas.removeEventListener('webglcontextlost', handleContextLost);
  }, [gl, onContextLost]);

  return null;
}

export default function ProjectCloudCanvas(props: ProjectCloudCanvasProps) {
  const [compact, setCompact] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia(COMPACT_QUERY).matches
  ));

  useEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY);
    const sync = () => setCompact(query.matches);
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return (
    <Canvas
      key={compact ? 'compact' : 'full'}
      camera={{
        position: [0, 0, compact ? 8.9 : 10.2],
        fov: compact ? 54 : 48,
        near: 0.1,
        far: 40,
      }}
      dpr={compact ? 2 : [1, 1.5]}
      performance={{ min: compact ? 1 : 0.8, max: 1, debounce: 450 }}
      frameloop="always"
      gl={{
        antialias: true,
        alpha: true,
        precision: 'highp',
        stencil: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: true,
      }}
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color('#050506'), 0)}
      onPointerMissed={() => props.onFocus(null)}
    >
      <fog attach="fog" args={['#050506', 9, 20]} />
      {compact ? null : <AdaptiveDpr pixelated={false} />}
      <ContextGuard onContextLost={props.onContextLost} />
      <SceneDecor compact={compact} />
      <Suspense fallback={null}>
        <Cloud
          projects={props.projects}
          activeSlug={props.activeSlug}
          progressRef={props.progressRef}
          onFocus={props.onFocus}
          onSelect={props.onSelect}
          compact={compact}
        />
      </Suspense>
    </Canvas>
  );
}
