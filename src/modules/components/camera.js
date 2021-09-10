import { addToLoadingManager } from "../loader";
const reqs = {
  models: {
    data: "models/camera/scene.gltf",
  },
};
addToLoadingManager(reqs);

export async function createCinemaCamera() {
  const data = reqs.models.data;
  let model = data.scene;
  model.scale.multiplyScalar(0.008);
  return model;
}
