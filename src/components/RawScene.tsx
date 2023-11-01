import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import styles from "../app/page.module.css";
import React, { Component, RefObject } from "react";

interface SceneProps {
  children?: JSX.Element;
}

class RawScene extends Component {
  private aspectRatio = window.innerWidth / window.innerHeight;
  private scene: THREE.Scene = new THREE.Scene(); // Задайте начальное значение
  private camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(
    -this.aspectRatio,
    this.aspectRatio,
    1,
    -1,
    0.1,
    10
  );
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  private canvasRef: RefObject<HTMLCanvasElement>;
  private composer = new EffectComposer(this.renderer);
  private gui: GUI = new GUI();
  private params = {
    pixelSize: 6,
    normalEdgeStrength: 0.3,
    depthEdgeStrength: 0.4,
    pixelAlignedPanning: true,
  };
  private clock = new THREE.Clock();

  constructor(props: {}) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.camera.position.y = 2 * Math.tan(Math.PI / 6);
    this.camera.position.z = 2;

    // Создайте экземпляр WebGLRenderTarget для использования вместо canvasRef
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );

    // Привяжите рендерер к WebGLRenderTarget
    this.renderer.setRenderTarget(renderTarget);

    // Добавьте код для создания объектов и настройки сцены
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.background = new THREE.Color(0x151729);

    const renderPixelatedPass = new RenderPixelatedPass(
      6,
      this.scene,
      this.camera
    );
    this.composer.addPass(renderPixelatedPass);
    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);

    // window.addEventListener("resize", this.onWindowResize);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.maxZoom = 2;

    this.gui
      .add(this.params, "pixelSize")
      .min(1)
      .max(16)
      .step(1)
      .onChange(() => {
        renderPixelatedPass.setPixelSize(this.params.pixelSize);
      });
    // this.gui
    //   .add(renderPixelatedPass, "normalEdgeStrength")
    //   .min(0)
    //   .max(2)
    //   .step(0.05);
    // this.gui
    //   .add(renderPixelatedPass, "depthEdgeStrength")
    //   .min(0)
    //   .max(1)
    //   .step(0.05);
    this.gui.add(this.params, "pixelAlignedPanning");

    const loader = new THREE.TextureLoader();
    const texChecker = this.pixelTexture(loader.load("./checker.png"));
    const texChecker2 = this.pixelTexture(loader.load("./checker.png"));
    texChecker.repeat.set(3, 3);
    texChecker2.repeat.set(1.5, 1.5);

    const boxMaterial = new THREE.MeshPhongMaterial({ map: texChecker2 });

    this.addBox(0.4, 0, 0, Math.PI / 4, boxMaterial);
    this.addBox(0.5, -0.5, -0.5, Math.PI / 4, boxMaterial);

    const planeSideLength = 2;
    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(planeSideLength, planeSideLength),
      new THREE.MeshPhongMaterial({ map: texChecker })
    );
    planeMesh.receiveShadow = true;

    planeMesh.rotation.x = -Math.PI / 2;
    this.scene.add(planeMesh);

    const radius = 0.2;
    const geometry = new THREE.IcosahedronGeometry(radius);
    const crystalMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        color: 0x68b7e9,
        emissive: 0x4f7e8b,
        shininess: 10,
        specular: 0xffffff,
      })
    );
    crystalMesh.receiveShadow = true;
    crystalMesh.castShadow = true;
    this.scene.add(crystalMesh);

    this.scene.add(new THREE.AmbientLight(0x757f8e, 3));

    const directionalLight = new THREE.DirectionalLight(0xfffecd, 1.5);
    directionalLight.position.set(100, 100, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(2048, 2048);
    this.scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(
      0xffc100,
      10,
      10,
      Math.PI / 16,
      0.02,
      2
    );
    spotLight.position.set(2, 2, 0);
    const target = spotLight.target;
    this.scene.add(target);
    target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    this.animate();
  }

  onWindowResize() {
    this.camera.left = -this.aspectRatio;
    this.camera.right = this.aspectRatio;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  addBox(
    boxSideLength: number,
    x: number,
    z: number,
    rotation: number,
    boxMaterial: THREE.MeshPhongMaterial
  ) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(boxSideLength, boxSideLength, boxSideLength),
      boxMaterial
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.rotation.y = rotation;
    mesh.position.y = boxSideLength / 2;
    mesh.position.set(x, boxSideLength / 2 + 0.0001, z);
    this.scene.add(mesh);
    return mesh;
  }

  pixelTexture(texture: THREE.Texture) {
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const t = this.clock.getElapsedTime();

    // this.crystalMesh.material.emissiveIntensity = Math.sin( t * 3 ) * .5 + .5;
    // crystalMesh.position.y = .7 + Math.sin( t * 2 ) * .05;
    // crystalMesh.rotation.y = this.stopGoEased( t, 2, 4 ) * 2 * Math.PI;

    const rendererSize = this.renderer.getSize(new THREE.Vector2());
    const aspectRatio = rendererSize.x / rendererSize.y;
    if (this.params["pixelAlignedPanning"]) {
      // this.pixelAlignFrustum( this.camera, aspectRatio, Math.floor( rendererSize.x / this.params[ 'pixelSize' ] ),
      // 	Math.floor( rendererSize.y / this.params[ 'pixelSize' ] ) );
    } else if (this.camera.left != -aspectRatio || this.camera.top != 1.0) {
      // Reset the Camera Frustum if it has been modified
      this.camera.left = -aspectRatio;
      this.camera.right = aspectRatio;
      this.camera.top = 1.0;
      this.camera.bottom = -1.0;
      this.camera.updateProjectionMatrix();
    }

    this.composer.render();
  }

  easeInOutCubic(x: number) {
    return x ** 2 * 3 - x ** 3 * 2;
  }

  linearStep(x: number, edge0: number, edge1: number) {
    const w = edge1 - edge0;
    const m = 1 / w;
    const y0 = -m * edge0;
    return THREE.MathUtils.clamp(y0 + m * x, 0, 1);
  }

  stopGoEased(x: number, downtime: number, period: number) {
    const cycle = (x / period) | 0;
    const tween = x - cycle * period;
    const linStep = this.easeInOutCubic(
      this.linearStep(tween, downtime, period)
    );
    return cycle + linStep;
  }

  // pixelAlignFrustum( camera, aspectRatio, pixelsPerScreenWidth, pixelsPerScreenHeight ) {

  //   // 0. Get Pixel Grid Units
  //   const worldScreenWidth = ( ( camera.right - camera.left ) / camera.zoom );
  //   const worldScreenHeight = ( ( camera.top - camera.bottom ) / camera.zoom );
  //   const pixelWidth = worldScreenWidth / pixelsPerScreenWidth;
  //   const pixelHeight = worldScreenHeight / pixelsPerScreenHeight;

  //   // 1. Project the current camera position along its local rotation bases
  //   const camPos = new THREE.Vector3(); camera.getWorldPosition( camPos );
  //   const camRot = new THREE.Quaternion(); camera.getWorldQuaternion( camRot );
  //   const camRight = new THREE.Vector3( 1.0, 0.0, 0.0 ).applyQuaternion( camRot );
  //   const camUp = new THREE.Vector3( 0.0, 1.0, 0.0 ).applyQuaternion( camRot );
  //   const camPosRight = camPos.dot( camRight );
  //   const camPosUp = camPos.dot( camUp );

  //   // 2. Find how far along its position is along these bases in pixel units
  //   const camPosRightPx = camPosRight / pixelWidth;
  //   const camPosUpPx = camPosUp / pixelHeight;

  //   // 3. Find the fractional pixel units and convert to world units
  //   const fractX = camPosRightPx - Math.round( camPosRightPx );
  //   const fractY = camPosUpPx - Math.round( camPosUpPx );

  //   // 4. Add fractional world units to the left/right top/bottom to align with the pixel grid
  //   camera.left = - aspectRatio - ( fractX * pixelWidth );
  //   camera.right = aspectRatio - ( fractX * pixelWidth );
  //   camera.top = 1.0 - ( fractY * pixelHeight );
  //   camera.bottom = - 1.0 - ( fractY * pixelHeight );
  //   camera.updateProjectionMatrix();

  // }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default RawScene;
