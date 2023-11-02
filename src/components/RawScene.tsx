import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import styles from "../app/page.module.css";
import React, { useState, useEffect, useRef } from "react";

interface SceneProps {
  children?: JSX.Element;
}

function RawScene() {
  const refBody = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [scene] = useState(new THREE.Scene());
  const [_camera, setCamera] = useState<any>();
  const [renderer, setRenderer] = useState<any>();
  const [target] = useState(new THREE.Vector3(-0.5, 1.2, 0));
  const [_controls, setControls] = useState<any>();

  useEffect(() => {
    return () => {};
  }, []);

  return <div ref={refBody}></div>;
}

export default RawScene;
