"use client";
import styles from "../page.module.css";
import RawScene from "@/src/components/RawScene";
import Box from "@/src/components/Box";
import Floor from "@/src/components/Floor";

const colors = "#3d5a80 // #98c1d9 // #e0fbfc // #ee6c4d //#293241";

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <RawScene />
    </main>
  );
}
