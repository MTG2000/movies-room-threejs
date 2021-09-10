import * as THREE from "three";
import { addToLoadingManager } from "../loader";

const reqs = {
  models: {
    data: "models/tomons_desk_lamp/scene.gltf",
  },
  textures: {},
};
addToLoadingManager(reqs);

export async function createLamb() {
  const data = reqs.models.data;
  let model = data.scene;
  let j = 0;
  model.traverse((child, i) => {
    if (child.isMesh) {
      if (j === 1 || j == 0) (child.visible = false), j++;
    }
  });
  model.scale.multiplyScalar(0.05);

  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.SpotLight(color, intensity);
  light.power = 10;
  light.decay = 2;
  light.penumbra = 1;
  light.position.set(2.45, 4.65, 0.7);
  light.target.position.set(-0.5, 0, -0.75);
  light.target.updateMatrixWorld();
  model.add(light);

  return model;
}
