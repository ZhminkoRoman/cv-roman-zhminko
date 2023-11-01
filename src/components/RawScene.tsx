import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import styles from "../app/page.module.css";
import React, { useState, useEffect } from "react";

interface SceneProps {
  children?: JSX.Element;
}

function RawScene() {
  const [scene, setScene] = useState<any>();
  return <h1>Test of Raw Scene</h1>;
}

export default RawScene;
