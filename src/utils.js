import * as THREE from "three";

const toScreenCenter = (x, y) => [
  x - window.innerWidth / 2,
  y - window.innerHeight / 2,
];

export class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

export class DegRadHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return THREE.MathUtils.radToDeg(this.obj[this.prop]);
  }
  set value(v) {
    this.obj[this.prop] = THREE.MathUtils.degToRad(v);
  }
}

export function addAxes(el) {
  const axes = new THREE.AxesHelper();
  el.add(axes);
}

export function makeXYZGUI(gui, vector3, name, onChangeFn = () => {}) {
  const folder = gui.addFolder(name);
  folder.add(vector3, "x").min(-5).max(5).step(0.01).onChange(onChangeFn);
  folder.add(vector3, "y").min(-1).max(5).step(0.01).onChange(onChangeFn);
  folder.add(vector3, "z").min(-5).max(5).step(0.01).onChange(onChangeFn);
  folder.open();
}

export function setupModel(data) {
  const model = data.scene.children[0];
  console.log(data);

  return model;
}
