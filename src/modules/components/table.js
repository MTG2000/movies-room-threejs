import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupModel, makeXYZGUI } from "../../utils";
import { gui } from "../init";
import { addToLoadingManager } from "../loader";

const reqs = {
  models: {
    tableData: "models/wooden_table/scene.gltf",
  },
  textures: {
    texture: "models/wooden_table/textures/Material_baseColor.jpeg",
    metalicMap: "models/wooden_table/textures/Material_metallicRoughness.png",
  },
};
addToLoadingManager(reqs);

export async function createTable() {
  const texture = reqs.textures.texture;
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;

  const metalicMap = reqs.textures.metalicMap;
  metalicMap.flipY = false;
  metalicMap.encoding = THREE.sRGBEncoding;

  const material = new THREE.MeshStandardMaterial({
    roughnessMap: metalicMap,
    metalnessMap: metalicMap,
    color: 0x795548,
    map: texture,
  });

  const tableData = reqs.models.tableData;

  let model = tableData.scene;
  model.traverse((child, i) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
  model.scale.multiplyScalar(0.003);
  return model;
}
