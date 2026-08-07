import { useRef, useMemo } from 'react';
import { useGLTF, Ring, Float } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

/**
 * Full Holographic Human Body 3D Asset
 * - Complete humanoid anatomy (Head, Chest, Torso, Arms, Legs, Feet)
 * - Dynamic wireframe material overwrite with emissive cyan glow
 * - Pure delta-driven 60FPS useFrame mutation (zero setState in loops)
 * - Clickable & raycastable interactive anatomical hotspots
 */
export default function HolographicAsset({
  selectedZone = null,
  hoveredZone = null,
  onSelectZone,
  onHoverZone,
}) {
  const groupRef = useRef();
  const modelRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const heartRef = useRef();

  // Load the complete humanoid GLTF model
  const { scene } = useGLTF('/HumanBody.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  // High-performance glowing cyan holographic wireframe materials
  const holographicMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00f0ff'),
      emissive: new THREE.Color('#00ffff'),
      emissiveIntensity: 1.8,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
    });
  }, []);

  const haloMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#22d3ee'),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
  }, []);

  // Performance Rule: Clean delta-based mutation without setState or CSS keyframes
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.position.y = 0.9 + Math.sin(state.clock.elapsedTime * 1.2) * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
      ring2Ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (heartRef.current) {
      const beat = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.15;
      heartRef.current.scale.set(beat, beat, beat);
    }
  });

  return (
    <group ref={groupRef} position={[1.4, -1.0, 0]} scale={1.25}>
      {/* Floating Holographic Container */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
        <group ref={modelRef}>
          
          {/* ── Complete Humanoid Skinned Meshes ──────────────────────── */}
          {nodes.Hips && <primitive object={nodes.Hips} />}

          {nodes.Wolf3D_Body && (
            <skinnedMesh
              geometry={nodes.Wolf3D_Body.geometry}
              material={holographicMaterial}
              skeleton={nodes.Wolf3D_Body.skeleton}
            />
          )}

          {nodes.Wolf3D_Outfit_Top && (
            <skinnedMesh
              geometry={nodes.Wolf3D_Outfit_Top.geometry}
              material={holographicMaterial}
              skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
          )}

          {nodes.Wolf3D_Outfit_Bottom && (
            <skinnedMesh
              geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
              material={holographicMaterial}
              skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
          )}

          {nodes.Wolf3D_Outfit_Footwear && (
            <skinnedMesh
              geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
              material={holographicMaterial}
              skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
          )}

          {nodes.Wolf3D_Head && (
            <skinnedMesh
              geometry={nodes.Wolf3D_Head.geometry}
              material={holographicMaterial}
              skeleton={nodes.Wolf3D_Head.skeleton}
            />
          )}

          {nodes.Wolf3D_Hair && (
            <skinnedMesh
              geometry={nodes.Wolf3D_Hair.geometry}
              material={holographicMaterial}
              skeleton={nodes.Wolf3D_Hair.skeleton}
            />
          )}

          {/* ── Interactive Hotspot Nodes (Head, Chest, Stomach, Limbs) ── */}

          {/* 1. Head & Brain Hotspot */}
          <mesh
            position={[0, 1.6, 0.05]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectZone && onSelectZone('head');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              onHoverZone && onHoverZone('head');
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
              onHoverZone && onHoverZone(null);
            }}
          >
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive={selectedZone === 'head' || hoveredZone === 'head' ? '#00ffff' : '#0891b2'}
              emissiveIntensity={selectedZone === 'head' || hoveredZone === 'head' ? 3.5 : 1.4}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* 2. Chest & Heart Hotspot (with pulsing heartbeat) */}
          <group position={[0, 1.25, 0.1]}>
            <mesh
              ref={heartRef}
              onClick={(e) => {
                e.stopPropagation();
                onSelectZone && onSelectZone('chest');
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
                onHoverZone && onHoverZone('chest');
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
                onHoverZone && onHoverZone(null);
              }}
            >
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial
                color="#f43f5e"
                emissive={selectedZone === 'chest' || hoveredZone === 'chest' ? '#fb7185' : '#e11d48'}
                emissiveIntensity={selectedZone === 'chest' || hoveredZone === 'chest' ? 3.5 : 1.5}
                wireframe
                transparent
                opacity={0.85}
              />
            </mesh>
          </group>

          {/* 3. Stomach & Abdomen Hotspot */}
          <mesh
            position={[0, 0.95, 0.08]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectZone && onSelectZone('stomach');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              onHoverZone && onHoverZone('stomach');
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
              onHoverZone && onHoverZone(null);
            }}
          >
            <sphereGeometry args={[0.17, 16, 16]} />
            <meshStandardMaterial
              color="#eab308"
              emissive={selectedZone === 'stomach' || hoveredZone === 'stomach' ? '#fde047' : '#ca8a04'}
              emissiveIntensity={selectedZone === 'stomach' || hoveredZone === 'stomach' ? 3.2 : 1.3}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* 4. Limbs & Joint Hotspots (Arms & Knees) */}
          <mesh
            position={[-0.45, 1.0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectZone && onSelectZone('limbs');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              onHoverZone && onHoverZone('limbs');
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
              onHoverZone && onHoverZone(null);
            }}
          >
            <sphereGeometry args={[0.13, 14, 14]} />
            <meshStandardMaterial
              color="#10b981"
              emissive={selectedZone === 'limbs' || hoveredZone === 'limbs' ? '#34d399' : '#059669'}
              emissiveIntensity={selectedZone === 'limbs' || hoveredZone === 'limbs' ? 3.2 : 1.3}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>

          <mesh
            position={[0.45, 1.0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectZone && onSelectZone('limbs');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              onHoverZone && onHoverZone('limbs');
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
              onHoverZone && onHoverZone(null);
            }}
          >
            <sphereGeometry args={[0.13, 14, 14]} />
            <meshStandardMaterial
              color="#10b981"
              emissive={selectedZone === 'limbs' || hoveredZone === 'limbs' ? '#34d399' : '#059669'}
              emissiveIntensity={selectedZone === 'limbs' || hoveredZone === 'limbs' ? 3.2 : 1.3}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Leg Hotspots */}
          <mesh
            position={[-0.18, 0.45, 0.05]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectZone && onSelectZone('limbs');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              onHoverZone && onHoverZone('limbs');
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
              onHoverZone && onHoverZone(null);
            }}
          >
            <sphereGeometry args={[0.12, 14, 14]} />
            <meshStandardMaterial
              color="#10b981"
              emissive={selectedZone === 'limbs' || hoveredZone === 'limbs' ? '#34d399' : '#059669'}
              emissiveIntensity={selectedZone === 'limbs' || hoveredZone === 'limbs' ? 3.2 : 1.3}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>

          <mesh
            position={[0.18, 0.45, 0.05]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectZone && onSelectZone('limbs');
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              onHoverZone && onHoverZone('limbs');
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
              onHoverZone && onHoverZone(null);
            }}
          >
            <sphereGeometry args={[0.12, 14, 14]} />
            <meshStandardMaterial
              color="#10b981"
              emissive={selectedZone === 'limbs' || hoveredZone === 'limbs' ? '#34d399' : '#059669'}
              emissiveIntensity={selectedZone === 'limbs' || hoveredZone === 'limbs' ? 3.2 : 1.3}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>

        {/* Orbiting Hologram Radar Scan Rings */}
        <group ref={ring1Ref} position={[0, 0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <Ring args={[0.7, 0.73, 48]} material={haloMaterial} />
        </group>

        <group ref={ring2Ref} position={[0, 0, 0]}>
          <Ring args={[0.9, 0.93, 48]} material={haloMaterial} />
        </group>
      </Float>
    </group>
  );
}

useGLTF.preload('/HumanBody.glb');
