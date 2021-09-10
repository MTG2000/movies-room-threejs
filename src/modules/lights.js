import { ColorGUIHelper, makeXYZGUI } from "../utils";
import * as THREE from "three";
import { gui } from "./init";

export function createHemisphereLight({
  skyColor = 0xffffff,
  groundColor = 0x753939,
  intensity = 5,
  helperFolderName = "Hemisphere Light",
} = {}) {
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

  return light;
}

export function createBulb({ color = 0xffffff, intensity = 1 } = {}) {
  const light = new THREE.PointLight(color, intensity);
  light.position.set(0, 2.8, 0);
  light.power = 0;
  light.decay = 2;
  return light;
}

export function creaeteDirectionalLight({ color = 0xffffff, intensity = 0 }) {
  const light = new THREE.DirectionalLight(color, intensity);
  return light;
}

export function createDirectionalLightHelper({ light, gui }) {
  const helper = new THREE.DirectionalLightHelper(light);

  function updateLight() {
    light.target.updateMatrixWorld();
    helper.update();
  }
  updateLight();

  const guiDirectionalLight = gui.addFolder("Directional Light");
  guiDirectionalLight
    .addColor(new ColorGUIHelper(light, "color"), "value")
    .name("color");
  guiDirectionalLight.add(light, "intensity", 0, 2, 0.01);
  makeXYZGUI(guiDirectionalLight, light.position, "position", updateLight);
  makeXYZGUI(guiDirectionalLight, light.target.position, "target", updateLight);
  return helper;
}
