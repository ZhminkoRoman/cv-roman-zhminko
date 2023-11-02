import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import styles from "../app/page.module.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface SceneProps {
  children?: JSX.Element;
}

function RawScene() {
  const refBody = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scene] = useState(new THREE.Scene());
  const [_camera, setCamera] = useState<any>();
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [target] = useState(new THREE.Vector3(-0.5, 1.2, 0));
  const [_controls, setControls] = useState<any>();
  const [initialCameraPosition] = useState(
    new THREE.Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI)
    )
  );

  const easeOutCirc = (x: number) => {
    return Math.sqrt(x - Math.pow(x - 1, 4));
  };

  const handleWindowResize = useCallback(() => {
    const { current: container } = refBody;

    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      renderer.setSize(scW, scH);
    }
  }, [renderer]);

  useEffect(() => {
    const { current: container } = refBody;

    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const scale = scH * 0.08 + 4;
      // const camera = new THREE.OrthographicCamera(
      //   -scale,
      //   scale,
      //   scale,
      //   -scale,
      //   0.1,
      //   1000
      // );
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      setCamera(camera);

      const ambientLight = new THREE.DirectionalLight("#ccc", 1);
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      setControls(controls);

      const material = new THREE.MeshToonMaterial({
        color: "red",
      });
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.receiveShadow = true;
      mesh.castShadow = true;

      scene.add(mesh);

      let req: any = null;
      let frame = 0;

      const animate = () => {
        req = requestAnimationFrame(animate);
        frame = frame <= 100 ? frame + 1 : frame;

        if (frame <= 100) {
          const p = initialCameraPosition;
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

          camera.position.y = 10;
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          camera.position.z =
            p.x * Math.cos(rotSpeed) - p.z * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          controls.update();
        }

        renderer.render(scene, camera);
      };
      animate();
      setLoading(false);
    }
    return () => {
      // cancelAnimationFrame(req);
      renderer?.dispose();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);

    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={refBody}>
      {loading && <p>loading...</p>}
    </div>
  );
}

export default RawScene;
