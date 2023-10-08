"use client";
import styles from "../page.module.css";
import Scene from "@/src/components/Scene";
import Box from "@/src/components/Box";

const colors = "#3d5a80 // #98c1d9 // #e0fbfc // #ee6c4d //#293241";

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <Scene>
        <>
          <Box color={"#ee6c4d"} positionX={0} positionY={0} isToon />
          {/* <Box color={"#98c1d9"} positionX={0} positionY={0} isLight>
            <>
              <Box color={"#ee6c4d"} positionX={2.5} positionY={0} isToon />
              <Box color={"#3d5a80"} positionX={-3} positionY={1.5} isPhong />
              <Box color={"#e0fbfc"} positionX={-2.5} positionY={0} />
            </>
          </Box> */}
        </>
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
