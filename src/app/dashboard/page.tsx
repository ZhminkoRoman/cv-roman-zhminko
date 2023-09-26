"use client";
import { Canvas } from "@react-three/fiber";
import styles from "../page.module.css";

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </main>
  );
}
