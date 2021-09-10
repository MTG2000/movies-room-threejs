import "./style.css";
import { scene, camera, renderer, controls } from "./modules/init";
import { createHemisphereLight } from "./modules/lights";
import { Loop } from "./modules/Loop";
import { createRoom } from "./modules/components/room";
import { createStuffGroup } from "./modules/components/stuffGrouped";
import { Manager } from "./modules/manager";
import "@material-design-icons/font/filled.css";
import { startLoading } from "./modules/loader";

// controls.enabled = true;
function tick(d) {
  // Update Orbital Controls
  // controls.update();
}

export const loop = new Loop(camera, scene, renderer, tick);

loop.start();

// Objects
(async () => {
  await startLoading();
  const stuffGroup = await createStuffGroup();
  scene.add(stuffGroup);
  const room = createRoom();
  scene.add(room);

  const manager = new Manager();
  manager.init();
})();

// Lights
const ambientLight = createHemisphereLight();
scene.add(ambientLight);

// const directionalLight = creaeteDirectionalLight({ intensity: 2 });
// directionalLight.position.set(10, 10, 0);
// directionalLight.target.position.set(0, 0, 0);
// const directionalLightHelper = createDirectionalLightHelper({
//   light: directionalLight,
//   gui,
// });
// scene.add(directionalLight);
// scene.add(directionalLight.target);
// scene.add(directionalLightHelper);

// Helpers
// const gridHelper = new THREE.GridHelper(100);
// scene.add(gridHelper);

// objects.forEach((o) => {
//   const axes = new THREE.AxesHelper(3);
//   axes.material.depthTest = false; //setting depthTest to false means they will not check to see if they are drawing behind something else
//   axes.renderOrder = 1;
//   o.add(axes);
// });
