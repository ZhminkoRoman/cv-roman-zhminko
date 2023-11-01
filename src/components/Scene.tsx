import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import styles from "../app/page.module.css";
import Camera from "./Camera";
import {
  EffectComposer,
  Pixelation,
  Bloom,
  DepthOfField,
  Vignette,
  Outline,
  Select,
  Selection,
  SMAA,
  SSAO,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Box from "./Box";
import Floor from "./Floor";

interface SceneProps {
  children?: JSX.Element;
}

const Scene = ({ children }: SceneProps) => {
  return (
    <Canvas className={styles.scene} shadows={true} camera={Camera()}>
      <SoftShadows />
      {/* <hemisphereLight color={"#e0fbfc"} groundColor={"#293241"} /> */}
      {/* <directionalLight color="white" position={[-1, 2, 4]} intensity={1} /> */}
      <pointLight position={[0, 1.5, 1]} castShadow />
      <OrbitControls />
      {/* <EffectComposer autoClear={false}>
        <Pixelation granularity={4} />
        <DepthOfField />
      </EffectComposer> */}
      <>
        <Box color={"#ee6c4d"} positionX={0} positionY={0} isToon />
        <Floor />
      </>
    </Canvas>
  );
};

export default Scene;
