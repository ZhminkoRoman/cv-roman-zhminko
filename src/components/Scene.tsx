import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import styles from "../app/page.module.css";
import Camera from "./Camera";

interface SceneProps {
  children: JSX.Element;
}

const Scene = ({ children }: SceneProps) => {
  return (
    <Canvas className={styles.scene} shadows={"soft"} camera={Camera()}>
      <hemisphereLight color={"#e0fbfc"} groundColor={"#293241"} />
      <directionalLight color="white" position={[-1, 2, 4]} intensity={1} />
      {/* <OrbitControls /> */}
      {/* <PerspectiveCamera
        far={1000}
        near={0.1}
        fov={45}
        makeDefault
        position={[0, 0, 6]}
      /> */}
      {/* <Camera /> */}
      {children}
    </Canvas>
  );
};

export default Scene;
