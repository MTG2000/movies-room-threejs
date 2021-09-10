import * as THREE from "three";
import { loop } from "../../script";
import dd from "three/examples/fonts/helvetiker_regular.typeface.json";
import { MathUtils } from "three";

const loader = new THREE.FontLoader();

let creditsLight;

export async function createCredits() {
  const root = new THREE.Object3D();

  //   Text
  {
    const font = loader.parse(dd);
    const geometry = new THREE.TextGeometry("MTG", {
      font: font,
      size: 0.2,
      height: 0.03,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
    });
    const material = new THREE.MeshPhongMaterial({
      color: 0x3e76c8,
      flatShading: true,
      metalness: 1,
    });
    const model = new THREE.Mesh(geometry, material);
    model.position.setX(-0.28);
    root.add(model);
  }
  //   Plane
  {
    const geo = new THREE.BoxBufferGeometry(1, 0.01, 0.6);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0,
      roughness: 0.7,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotateX(Math.PI / 2);
    mesh.position.setY(0.1);

    const stickGeo = new THREE.CylinderBufferGeometry(0.03, 0.03, 1, 8);
    const stickMat = new THREE.MeshStandardMaterial({
      color: 0xffe841,
      metalness: 0.4,
      roughness: 0.5,
    });
    const stickMesh = new THREE.Mesh(stickGeo, stickMat);
    stickMesh.rotateZ(Math.PI / 2);
    stickMesh.position.setY(0.42);
    const stickMesh2 = stickMesh.clone();
    stickMesh2.position.setY(-0.18);

    const stickGeo2 = new THREE.CylinderBufferGeometry(0.03, 0.03, 0.6, 8);
    const stickMesh3 = new THREE.Mesh(stickGeo2, stickMat);
    stickMesh3.position.set(-0.48, 0.12, 0);
    const stickMesh4 = stickMesh3.clone();
    stickMesh4.position.setX(0.48);
    root.add(mesh, stickMesh, stickMesh2, stickMesh3, stickMesh4);

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.SpotLight(color, intensity);
    creditsLight = light;
    light.power = 0;
    light.decay = 4;
    light.penumbra = 1;
    light.position.set(0, 0.68, 0.55);
    light.target.position.set(-1.88, 0.95, -0.43);
    light.target.updateMatrixWorld();
    root.add(light);
    root.rotateY(Math.PI / 2);
  }
  const mxRotation = root.rotation.y + MathUtils.degToRad(5);
  const mnRotation = root.rotation.y;
  let rotDir = 1;

  root.tick = (delta) => {
    root.rotation.y += delta * rotDir * 0.05;
    if (root.rotation.y > mxRotation || root.rotation.y < mnRotation) {
      if (root.rotation.y > mxRotation) root.rotation.y = mxRotation;
      if (root.rotation.y < mnRotation) root.rotation.y = mnRotation;
      rotDir *= -1;
    }
  };
  loop.updatables.push(root);
  root.position.set(-1.88, 0.95, -0.43);

  return root;
}

export function switchCreditsLights(on = true) {
  if (creditsLight) creditsLight.power = on ? 10 : 0;
}
