import React from 'react';
import { useFrame } from '@react-three/fiber';

function FloatingSphere({ position, color }: { position: [number, number, number], color: string }) {
  const ref = React.useRef<any>();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + position[0]) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 0, 5]} intensity={1.2} color="#FD3555" />
      <FloatingSphere position={[-2, 0, 0]} color="#FD3555" />
      <FloatingSphere position={[2, 1, -1]} color="#B853FF" />
      <FloatingSphere position={[0, -1, 1]} color="#EFEFEF" />
    </>
  );
}