"use client";
import { useRef } from "react";

import { MeshStandardMaterial, BoxGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
interface BoxProps {
  color: string;
  positionX: number;
}

const Box = ({ color, positionX }: BoxProps): JSX.Element => {
  const ref = useRef<Mesh>(null!);

  useFrame((state, delta) => (ref.current.rotation.y += delta));

  const material = new MeshStandardMaterial({
    color,
  });
  const geometry = new BoxGeometry(1, 1, 1);

  return (
    <mesh
      ref={ref}
      position={[positionX, 0, 0]}
      rotation={[0.3, 0.8, 0]}
      geometry={geometry}
      material={material}
    />
  );
};

export default Box;
