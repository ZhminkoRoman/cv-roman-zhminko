"use client";
import { useRef } from "react";

import { MeshStandardMaterial, BoxGeometry, Mesh } from "three";
import { useFrame } from "@react-three/fiber";

const colors = "#3d5a80 // #98c1d9 // #e0fbfc // #ee6c4d //#293241";

const Box = () => {
  const ref = useRef<Mesh>(null!);

  useFrame((state, delta) => (ref.current.rotation.y += delta));

  const material = new MeshStandardMaterial({
    color: "#ee6c4d",
  });
  const geometry = new BoxGeometry(1, 1, 1);

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation={[0.3, 0.8, 0]}
      geometry={geometry}
      material={material}
    />
  );
};

export default Box;
