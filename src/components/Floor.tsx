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
  PlaneGeometry,
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

const Floor = (): JSX.Element => {
  const ref = useRef<Mesh>(null!);

  const geometry = new PlaneGeometry(2000, 2000);
  const material = new MeshPhongMaterial({
    color: 0xcbcbcb,
    depthWrite: false,
    side: DoubleSide,
  });

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={geometry}
      material={material}
    />
  );
};

export default Floor;
