"use client";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Canvas, useLoader, extend } from "@react-three/fiber";
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

export default function Dashboard() {
  const modelPath = "/public/2.glb";

  const gltf = useLoader(GLTFLoader, modelPath);
  const material = new PixelMaterial();
  // const shaderMaterial = new THREE.ShaderMaterial();
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  return (
    <main className={styles.dashboard}>
      <Canvas className={styles.scene}>
        {/* <hemisphereLight /> */}
        <directionalLight color="white" position={[3, 2, 1]} intensity={1} />
        <OrbitControls />
        <PerspectiveCamera
          far={1000}
          near={1}
          fov={45}
          makeDefault
          position={[0, 0, 5]}
        />
        <mesh
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
      </Canvas>
      <div className={styles.text}>
        <p className={styles.text_description}>Welcome to my CV website</p>
      </div>
    </main>
  );
}
