import {
  MeshPhongMaterial,
  MeshToonMaterial,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  BoxGeometry,
  Mesh,
  DoubleSide,
  SphereGeometry,
  Vector3,
  PerspectiveCamera,
} from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Pixelation,
  Vignette,
} from "@react-three/postprocessing";

function PixelScene() {
  const { scene, camera, gl, size } = useThree();

  // Создание и настройка 3D-объектов
  const boxGeometry = new BoxGeometry(1, 1, 1);
  const boxMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new Mesh(boxGeometry, boxMaterial);

  // Установка позиции объекта
  cube.position.set(0, 0, 0);

  // Добавление объекта в сцену
  scene.add(cube);

  // Создание и настройка RenderPixelPass
  // const pixelatePass = new RenderPixelPass(size.width, size.height);

  // Настраиваем функцию анимации, чтобы обновлять RenderPixelPass на каждом кадре
  // useFrame(() => {
  //   pixelatePass.setSize(size.width, size.height);
  //   pixelatePass.renderToScreen = true; // Установите этот флаг, чтобы эффект отображался на экране
  // });

  return null; // Возвращение null, так как компонент MyScene не должен рендериться
}

export default PixelScene;
