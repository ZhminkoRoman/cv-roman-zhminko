"use client";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

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
  const [xPosition, setXPosition] = useState(0);

  const cubeHeight = 1;
  const yOffset = cubeHeight / 2;

  const moveSpeed = 0.01;
  const rotationSpeed = 0.02;

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.rotation.x = Math.PI / 2;
  //   }
  //   const moveBox = (event: Event | KeyboardEvent) => {
  //     if (ref.current) {
  //       ref.current.position.x += moveSpeed;
  //       ref.current.rotation.y -= moveSpeed;
  //       console.log(ref.current.rotation.y, ref.current.position.y, yOffset);
  //       // if (ref.current.position.y === yOffset) {

  //       // }
  //     }
  //   };
  //   window.addEventListener("keydown", (e: Event | KeyboardEvent) =>
  //     moveBox(e)
  //   );
  //   return () =>
  //     window.removeEventListener("keydown", (e: Event | KeyboardEvent) =>
  //       moveBox(e)
  //     );
  // }, [ref]);

  // useFrame((state, delta) => (ref.current.rotation.y += delta / 2));

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
        // position={[positionX, positionY, 0]}
        // rotation={[0.3, 0.8, 0]}
        geometry={sphereGeometry}
        material={material}
        receiveShadow={true}
      >
        <pointLight color={"0xffffff"} intensity={20} distance={0} />
        {children && children}
      </mesh>
    );
  }

  if (isToon) {
    const material = new MeshToonMaterial({
      color,
      // transparent: true,
      // opacity: 0.9,
    });
    console.log(yOffset);
    return (
      <mesh
        ref={ref}
        position={[0, yOffset, 0]}
        // rotation={[0.3, 0.8, 0]}
        geometry={boxGeometry}
        receiveShadow={true}
        castShadow
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
        receiveShadow={true}
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
        receiveShadow={true}
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
      receiveShadow={true}
      geometry={sphereGeometry}
      material={material}
    />
  );
};

export default Box;
