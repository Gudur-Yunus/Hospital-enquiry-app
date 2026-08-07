import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CameraRig — Smooth Easing Controller
 * Framed for prominent 3D Human Body Model positioned at [-1.15, -1.25, 0]
 */

const CAMERA_POSITIONS = {
  default: {
    pos: new THREE.Vector3(0, 0.05, 3.4),
    target: new THREE.Vector3(-1.15, 0.0, 0),
  },
  head: {
    pos: new THREE.Vector3(-1.15, 1.1, 1.8),
    target: new THREE.Vector3(-1.15, 1.1, 0),
  },
  chest: {
    pos: new THREE.Vector3(-1.15, 0.6, 1.8),
    target: new THREE.Vector3(-1.15, 0.6, 0),
  },
  stomach: {
    pos: new THREE.Vector3(-1.15, 0.2, 1.8),
    target: new THREE.Vector3(-1.15, 0.2, 0),
  },
  limbs: {
    pos: new THREE.Vector3(-1.15, -0.4, 2.2),
    target: new THREE.Vector3(-1.15, -0.4, 0),
  },
};

export default function CameraRig({ selectedZone }) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(-1.15, 0.0, 0));

  useFrame((_, delta) => {
    const config = selectedZone && CAMERA_POSITIONS[selectedZone]
      ? CAMERA_POSITIONS[selectedZone]
      : CAMERA_POSITIONS.default;

    const step = Math.min(1, delta * 4.5);

    // 1. Interpolate camera position
    camera.position.lerp(config.pos, step);

    // 2. Interpolate camera lookAt target
    currentTarget.current.lerp(config.target, step);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
