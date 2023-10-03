"use client";
import styles from "../page.module.css";
import Scene from "@/src/components/Scene";
import Box from "@/src/components/Box";

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <Scene>
        <Box />
      </Scene>
      <div className={styles.text}>
        <p className={styles.text_description}>Welcome to my CV website</p>
        <p className={styles.text_description}>
          I am Roman - frontend developer
        </p>
      </div>
    </main>
  );
}
