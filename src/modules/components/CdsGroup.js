import { createCd } from "./Cd";
import * as THREE from "three";

export function createCdsGroup(img) {
  const numCd = 10;
  const root = new THREE.Object3D();
  for (let i = 0; i < numCd; i++) {
    const cd = createCd(i === numCd - 1 ? img : null);
    cd.position.setY(i * 0.01);
    cd.rotateY((Math.random() * Math.PI) / 6);
    root.add(cd);
  }
  return root;
}
