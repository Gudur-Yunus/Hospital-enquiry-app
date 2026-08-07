import { useRef, useMemo } from 'react';
import { useGLTF, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

/**
 * FullHumanBody3D — Clean Medical Mannequin
 * - Hides glasses/sunglasses and fashion accessories
 * - Renders natural skin with a subtle clean medical tint
 * - No fashion show vibes — hospital-grade clean anatomy display
 */
export default function FullHumanBody3D({
  selectedZone = null,
  hoveredZone = null,
  onSelectZone,
  onHoverZone,
}) {
  const groupRef = useRef();
  const rotationGroupRef = useRef();
  const baseRingRef = useRef();

  const { scene } = useGLTF('/HumanBody.glb');

  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(scene);

    clone.traverse((child) => {
      // Hide glasses, hair accessories, and fashion items
      if (child.name && (
        child.name.toLowerCase().includes('glass') ||
        child.name.toLowerCase().includes('hair')
      )) {
        child.visible = false;
        return;
      }

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Keep original textures but apply a clean, neutral medical tone
        if (child.material) {
          const mat = child.material.clone();
          mat.depthWrite = true;
          mat.transparent = false;
          mat.needsUpdate = true;
          child.material = mat;
        }
      }
    });

    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (rotationGroupRef.current) {
      rotationGroupRef.current.rotation.y += delta * 0.25;
    }
    if (baseRingRef.current) {
      baseRingRef.current.rotation.z += delta * 0.3;
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

  return (
    <group ref={groupRef} position={[-1.15, -1.25, 0]} scale={1.48}>
      <Float speed={1.0} rotationIntensity={0.02} floatIntensity={0.04}>
        <group ref={rotationGroupRef}>
          
          <primitive object={clonedScene} />

          {/* HEAD hitbox */}
          <group
            position={[0, 1.62, 0.02]}
            onClick={(e) => handleClick(e, 'head')}
            onPointerOver={(e) => handlePointerOver(e, 'head')}
            onPointerOut={handlePointerOut}
          >
            <mesh position={[0, -0.02, 0]}>
              <cylinderGeometry args={[0.26, 0.23, 0.48, 16]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>

          {/* CHEST hitbox */}
          <group
            position={[0, 1.28, 0.04]}
            onClick={(e) => handleClick(e, 'chest')}
            onPointerOver={(e) => handlePointerOver(e, 'chest')}
            onPointerOut={handlePointerOut}
          >
            <mesh>
              <boxGeometry args={[0.58, 0.4, 0.35]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>

          {/* STOMACH hitbox */}
          <group
            position={[0, 1.02, 0.04]}
            onClick={(e) => handleClick(e, 'stomach')}
            onPointerOver={(e) => handlePointerOver(e, 'stomach')}
            onPointerOut={handlePointerOut}
          >
            <mesh>
              <boxGeometry args={[0.52, 0.38, 0.33]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>

          {/* LIMBS hitboxes */}
          <group
            onClick={(e) => handleClick(e, 'limbs')}
            onPointerOver={(e) => handlePointerOver(e, 'limbs')}
            onPointerOut={handlePointerOut}
          >
            <mesh position={[-0.35, 1.08, 0]} rotation={[0, 0, -0.15]}>
              <cylinderGeometry args={[0.14, 0.12, 0.72, 14]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <mesh position={[0.35, 1.08, 0]} rotation={[0, 0, 0.15]}>
              <cylinderGeometry args={[0.14, 0.12, 0.72, 14]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <mesh position={[-0.14, 0.45, 0]}>
              <cylinderGeometry args={[0.16, 0.14, 0.95, 14]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <mesh position={[0.14, 0.45, 0]}>
              <cylinderGeometry args={[0.16, 0.14, 0.95, 14]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <mesh position={[-0.14, 0.05, 0.06]}>
              <boxGeometry args={[0.22, 0.15, 0.32]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <mesh position={[0.14, 0.05, 0.06]}>
              <boxGeometry args={[0.22, 0.15, 0.32]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>

          {/* Clean platform ring */}
          <group position={[0, -0.01, 0]}>
            <mesh ref={baseRingRef} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.45, 0.48, 48]} />
              <meshBasicMaterial color="#94a3b8" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.62, 0.65, 48]} />
              <meshBasicMaterial color="#64748b" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
          </group>

        </group>
      </Float>
    </group>
  );
}

useGLTF.preload('/HumanBody.glb');
