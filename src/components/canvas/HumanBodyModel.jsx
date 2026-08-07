import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const ZONE_CONFIG = {
  head: {
    color: '#06B6D4',
    name: 'Head & Brain',
    labelKey: 'zoneHead',
  },
  chest: {
    color: '#F43F5E',
    name: 'Chest & Heart',
    labelKey: 'zoneChest',
  },
  stomach: {
    color: '#F59E0B',
    name: 'Stomach & Abdomen',
    labelKey: 'zoneStomach',
  },
  limbs: {
    color: '#10B981',
    name: 'Limbs & Joints',
    labelKey: 'zoneLimbs',
  },
};

/**
 * HumanBodyModel — Clean Procedural Fallback Mesh
 * Scaled up to 1.45 for prominent presentation
 */
export default function HumanBodyModel({
  selectedZone = null,
  hoveredZone = null,
  onSelectZone,
  onHoverZone,
}) {
  const groupRef = useRef();
  const rotationGroupRef = useRef();

  useFrame((state, delta) => {
    if (rotationGroupRef.current) {
      rotationGroupRef.current.rotation.y += delta * 0.28;
    }
  });

  const handlePointerOver = (e, zone) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    onHoverZone && onHoverZone(zone);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'default';
    onHoverZone && onHoverZone(null);
  };

  const handleClick = (e, zone) => {
    e.stopPropagation();
    onSelectZone && onSelectZone(zone);
  };

  const bodyMat = new THREE.MeshStandardMaterial({
    color: '#0284c7',
    emissive: '#0369a1',
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.95,
  });

  return (
    <group ref={groupRef} position={[-1.15, -1.25, 0]} scale={1.45}>
      <Float speed={1.2} rotationIntensity={0.03} floatIntensity={0.05}>
        <group ref={rotationGroupRef}>
          {/* Head */}
          <group
            position={[0, 1.62, 0]}
            onClick={(e) => handleClick(e, 'head')}
            onPointerOver={(e) => handlePointerOver(e, 'head')}
            onPointerOut={handlePointerOut}
          >
            <mesh material={bodyMat}>
              <sphereGeometry args={[0.22, 24, 24]} />
            </mesh>
          </group>

          {/* Chest */}
          <group
            position={[0, 1.28, 0]}
            onClick={(e) => handleClick(e, 'chest')}
            onPointerOver={(e) => handlePointerOver(e, 'chest')}
            onPointerOut={handlePointerOut}
          >
            <mesh material={bodyMat}>
              <boxGeometry args={[0.56, 0.38, 0.3]} />
            </mesh>
          </group>

          {/* Stomach */}
          <group
            position={[0, 0.98, 0]}
            onClick={(e) => handleClick(e, 'stomach')}
            onPointerOver={(e) => handlePointerOver(e, 'stomach')}
            onPointerOut={handlePointerOut}
          >
            <mesh material={bodyMat}>
              <boxGeometry args={[0.48, 0.32, 0.28]} />
            </mesh>
          </group>

          {/* Limbs */}
          <group
            onClick={(e) => handleClick(e, 'limbs')}
            onPointerOver={(e) => handlePointerOver(e, 'limbs')}
            onPointerOut={handlePointerOut}
          >
            {/* Left Arm */}
            <mesh position={[-0.35, 1.15, 0]} rotation={[0, 0, -0.15]} material={bodyMat}>
              <cylinderGeometry args={[0.07, 0.06, 0.65, 12]} />
            </mesh>
            {/* Right Arm */}
            <mesh position={[0.35, 1.15, 0]} rotation={[0, 0, 0.15]} material={bodyMat}>
              <cylinderGeometry args={[0.07, 0.06, 0.65, 12]} />
            </mesh>
            {/* Left Leg */}
            <mesh position={[-0.14, 0.45, 0]} material={bodyMat}>
              <cylinderGeometry args={[0.08, 0.07, 0.85, 12]} />
            </mesh>
            {/* Right Leg */}
            <mesh position={[0.14, 0.45, 0]} material={bodyMat}>
              <cylinderGeometry args={[0.08, 0.07, 0.85, 12]} />
            </mesh>
          </group>

          {/* Base Ring */}
          <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.45, 0.48, 48]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
