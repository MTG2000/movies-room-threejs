import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupModel, makeXYZGUI } from "../../utils";
import { gui } from "../init";
import { addToLoadingManager } from "../loader";

const reqs = {
  models: {
    data: "models/telephone/scene.gltf",
  },
  textures: {
    texture: "models/telephone/textures/Material_57_baseColor.png",
    metalicMap: "models/telephone/textures/Material_57_metallicRoughness.png",
  },
};
addToLoadingManager(reqs);

export async function createTelephone() {
  const texture = reqs.textures.texture;
  const metalicTexture = reqs.textures.metalicMap;

  metalicTexture.flipY = true;
  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;
  const material = new THREE.MeshStandardMaterial({
    metalnessMap: metalicTexture,
    roughnessMap: metalicTexture,
    map: texture,
  });
  const data = reqs.models.data;
  let model = data.scene;
  model.scale.multiplyScalar(0.05);

  model.traverse((child, i) => {
    if (child.isMesh) {
      child.material = material;
    }
  });

  return model;
}
