import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Cloud } from '@react-three/drei';

const RotatingStars = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x -= 0.0005;
      ref.current.rotation.y -= 0.0005;
    }
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <RotatingStars />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default Background3D;
