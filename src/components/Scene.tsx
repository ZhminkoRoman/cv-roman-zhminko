import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import styles from "../app/page.module.css";
import Camera from "./Camera";

interface SceneProps {
  children: JSX.Element;
}

const Scene = ({ children }: SceneProps) => {
  return (
    <Canvas className={styles.scene}>
      {/* <hemisphereLight color={"#e0fbfc"} groundColor={"#293241"} /> */}
      {/* <directionalLight color="white" position={[-1, 2, 4]} intensity={1} /> */}
      <PerspectiveCamera
        far={1000}
        near={0.1}
        fov={75}
        makeDefault
        position={[0, 0, 3]}
      />
      {/* <Camera /> */}
      {children}
    </Canvas>
  );
};

export default Scene;
