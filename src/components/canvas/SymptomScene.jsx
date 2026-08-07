import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import FullHumanBody3D from './FullHumanBody3D';
import HumanBodyModel from './HumanBodyModel';
import CameraRig from './CameraRig';

/**
 * SymptomScene — Studio Lighting Canvas for Realistic 3D Human Avatar
 * - High-CRI Natural Studio 3D Lighting Rig (warm key + soft fill + subtle rim)
 * - True-to-life skin tones, textures, and clothing rendering
 * - Left-aligned placement for hospital touchscreen kiosk UX
 */
export default function SymptomScene({
  selectedZone = null,
  hoveredZone = null,
  onSelectZone,
  onHoverZone,
}) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.05, 3.4], fov: 45 }}
        className="w-full h-full pointer-events-auto"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* ── High-CRI Photorealistic Studio Lighting Rig ─────────────── */}
        <ambientLight intensity={1.1} color="#ffffff" />
        
        {/* Key Light (Front-Top, Natural White) */}
        <directionalLight position={[-1.15, 3.5, 3.5]} intensity={2.6} color="#ffffff" castShadow />
        
        {/* Soft Warm Fill Light (Front-Left) */}
        <pointLight position={[-3, 1.5, 2]} intensity={1.2} color="#fed7aa" />
        
        {/* Subtle Cool Rim Light (Back-Right, creates depth separation) */}
        <pointLight position={[2, 2, -2]} intensity={1.5} color="#93c5fd" />
        
        {/* Overhead Spot for Hair and Shoulder Definition */}
        <spotLight
          position={[-1.15, 4, 1.5]}
          angle={0.7}
          penumbra={0.9}
          intensity={2.2}
          color="#f8fafc"
        />

        {/* Ambient Holographic Particle Starfield */}
        <Stars radius={50} depth={30} count={1000} factor={3} saturation={0.8} fade speed={1.0} />

        {/* Smooth Camera Controller */}
        <CameraRig selectedZone={selectedZone} />

        {/* Orbit Controls pointing towards the realistic 3D model */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.8}
          maxDistance={5.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
          target={[-1.15, 0.0, 0]}
          dampingFactor={0.05}
        />

        {/* Photorealistic 3D Human Avatar Model */}
        <Suspense
          fallback={
            <HumanBodyModel
              selectedZone={selectedZone}
              hoveredZone={hoveredZone}
              onSelectZone={onSelectZone}
              onHoverZone={onHoverZone}
            />
          }
        >
          <FullHumanBody3D
            selectedZone={selectedZone}
            hoveredZone={hoveredZone}
            onSelectZone={onSelectZone}
            onHoverZone={onHoverZone}
          />
        </Suspense>

        {/* Subtle Bloom for gentle ambient glow */}
        <EffectComposer multisampling={4}>
          <Bloom
            luminanceThreshold={0.55}
            luminanceSmoothing={0.8}
            intensity={0.4}
            levels={6}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
