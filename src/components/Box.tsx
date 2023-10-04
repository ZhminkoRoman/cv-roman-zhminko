"use client";
import { useRef } from "react";

import { MeshStandardMaterial, BoxGeometry, Mesh, DoubleSide } from "three";
import { useFrame } from "@react-three/fiber";
interface BoxProps {
  color: string;
  positionX: number;
  isLight?: boolean;
}

const Box = ({ color, positionX, isLight }: BoxProps): JSX.Element => {
  const ref = useRef<Mesh>(null!);

  useFrame((state, delta) => (ref.current.rotation.y += delta));

  /**
   * !: DoubleSide make render slowly;
   * !: emissive make object lightning even without lights;
   */
  const material = new MeshStandardMaterial({
    color,
    emissive: isLight ? color : "",
    // side: DoubleSide,
  });
  const geometry = new BoxGeometry(1, 1, 1);

  if (isLight) {
    return (
      <mesh
        ref={ref}
        position={[positionX, 0, 0]}
        rotation={[0.3, 0.8, 0]}
        geometry={geometry}
        material={material}
      >
        <pointLight color={"0xffffff"} intensity={3} />
      </mesh>
    );
  }

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
