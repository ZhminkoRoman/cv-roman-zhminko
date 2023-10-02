"use client";
import { useRef } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Canvas, useLoader, extend, useFrame } from "@react-three/fiber";
import styles from "../page.module.css";
import {
  OrbitControls,
  PerspectiveCamera,
  shaderMaterial,
} from "@react-three/drei";

// extend({ PixelMaterial });
// const fragmentShader = `uniform sampler2D tDiffuse;
// uniform float pixelSize;

// void main() {
//   vec2 uv = gl_FragCoord.xy / resolution.xy;
//   uv = floor(uv * pixelSize) / pixelSize;
//   gl_FragColor = texture2D(tDiffuse, uv);
// }`;
// const vertexShader = `void main() {
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }`;

const PixelMaterial = shaderMaterial(
  {
    tDiffuse: null,
    pixelSize: 8,
  },
  // vertex shader
  `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform sampler2D tDiffuse;
    uniform float pixelSize;

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      uv = floor(uv * pixelSize) / pixelSize;
      gl_FragColor = texture2D(tDiffuse, uv);
    }
  `
);

const colors = "#3d5a80 // #98c1d9 // #e0fbfc // #ee6c4d //#293241";

const Box = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const modelPath = "/public/2.glb";

  useFrame((state, delta) => (ref.current.rotation.y += delta));

  const gltf = useLoader(GLTFLoader, modelPath);
  // const material = new PixelMaterial();
  const material = new THREE.MeshStandardMaterial({
    color: "#ee6c4d",
  });
  // const shaderMaterial = new THREE.ShaderMaterial();
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation={[0.3, 0.8, 0]}
      geometry={geometry}
      material={material}
    >
      {/* <pixelMaterial color="hotpink" pixelSize={8} /> */}
      {/* <shaderMaterial
    fragmentShader={fragmentShader}
    vertexShader={vertexShader}
  /> */}
    </mesh>
  );
};

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <Canvas className={styles.scene}>
        <hemisphereLight color={"#e0fbfc"} groundColor={"#3d5a80"} />
        <directionalLight color="white" position={[3, 2, 1]} intensity={1} />
        <OrbitControls />
        <PerspectiveCamera
          far={1000}
          near={0.1}
          fov={75}
          makeDefault
          position={[0, 0, 3]}
        />
        <Box />
      </Canvas>
      <div className={styles.text}>
        <p className={styles.text_description}>Welcome to my CV website</p>
        <p className={styles.text_description}>
          I am Roman - frontend developer
        </p>
      </div>
    </main>
  );
}
