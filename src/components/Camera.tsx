import { PerspectiveCamera } from "three";

const Camera = () => {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(1, 1.5, 3);
  // camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);
  return camera;
};

export default Camera;
