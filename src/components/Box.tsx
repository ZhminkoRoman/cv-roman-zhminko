"use client";
import { useRef } from "react";

import {
  MeshPhongMaterial,
  MeshToonMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  BoxGeometry,
  Mesh,
  DoubleSide,
  SphereGeometry,
} from "three";
import { useFrame } from "@react-three/fiber";
interface BoxProps {
  color: string;
  positionX: number;
  positionY: number;
  isLight?: boolean;
  isToon?: boolean;
  isStandart?: boolean;
  isPhong?: boolean;
  children?: JSX.Element;
}

const Box = ({
  color,
  positionX,
  positionY,
  isLight,
  isToon,
  isStandart,
  isPhong,
  children,
}: BoxProps): JSX.Element => {
  const ref = useRef<Mesh>(null!);

  useFrame((state, delta) => (ref.current.rotation.y += delta / 2));

  /**
   * !: DoubleSide make render slowly;
   * !: emissive make object lightning even without lights;
   */
  const boxGeometry = new BoxGeometry(1, 1, 1);
  const sphereGeometry = new SphereGeometry(0.5, 64, 64);

  if (isLight) {
    const material = new MeshToonMaterial({
      color,
      emissive: color,
      // side: DoubleSide,
    });
    return (
      <mesh
        ref={ref}
        position={[positionX, positionY, 0]}
        // rotation={[0.3, 0.8, 0]}
        geometry={sphereGeometry}
        material={material}
      >
        <pointLight color={"0xffffff"} intensity={20} distance={0} />
        {children && children}
      </mesh>
    );
  }

  if (isToon) {
    const material = new MeshToonMaterial({
      color,
    });
    return (
      <mesh
        ref={ref}
        position={[positionX, positionY, 2]}
        // rotation={[0.3, 0.8, 0]}
        geometry={sphereGeometry}
        material={material}
      >
        {children && children}
      </mesh>
    );
  }

  if (isPhong) {
    const material = new MeshPhongMaterial({
      color,
      shininess: 1000,
      // side: DoubleSide,
    });
    return (
      <mesh
        ref={ref}
        position={[positionX, positionY, -3]}
        // rotation={[0.3, 0.8, 0]}
        geometry={sphereGeometry}
        material={material}
      />
    );
  }

  if (isStandart) {
    const material = new MeshStandardMaterial({
      color,
      metalness: 1,
      // roughness: 1,
      // side: DoubleSide,
    });
    return (
      <mesh
        ref={ref}
        position={[positionX, positionY, 0]}
        // rotation={[0.3, 0.8, 0]}
        geometry={sphereGeometry}
        material={material}
      />
    );
  }

  const material = new MeshPhysicalMaterial({
    color,
    metalness: 1,
    clearcoat: 1,
    clearcoatRoughness: 1,
    roughness: 1,
    // side: DoubleSide,
  });
  return (
    <mesh
      ref={ref}
      position={[positionX, positionY, 0]}
      // rotation={[0.3, 0.8, 0]}
      geometry={sphereGeometry}
      material={material}
    />
  );
};

export default Box;
