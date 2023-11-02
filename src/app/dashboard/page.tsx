"use client";
import styles from "../page.module.css";
import Scene from "@/src/components/Scene";
import Box from "@/src/components/Box";
import Floor from "@/src/components/Floor";
import dynamic from "next/dynamic";

const colors = "#3d5a80 // #98c1d9 // #e0fbfc // #ee6c4d //#293241";

const DynamicScene = dynamic(() => import("@/src/components/Scene"), {
  ssr: false,
  loading: () => <p>...Loading</p>,
});

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <DynamicScene />
    </main>
  );
}
