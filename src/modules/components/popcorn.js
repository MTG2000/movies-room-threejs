import * as THREE from "three";
import { addToLoadingManager } from "../loader";

const reqs = {
  models: {
    data: "/models/pop_corn/scene.gltf",
  },
  textures: {
    texture: "/models/pop_corn/textures/blinn3_baseColor.jpeg",
  },
};
addToLoadingManager(reqs);

export async function createPopCorn() {
  const texture = reqs.textures.texture;
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const data = reqs.models.data;
  let model = data.scene;
  model.scale.multiplyScalar(0.02);

  model.traverse((child, i) => {
    if (child.isMesh) {
      child.material = material;
    }
  });

  return model;
}
