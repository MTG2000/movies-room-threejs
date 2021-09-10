import { createCd } from "./Cd";
import * as THREE from "three";
import { movies } from "../data";
import { Vector3 } from "three";
import gsap from "gsap/gsap-core";

let meshs = [];

const inPos = new Vector3(0, 0, 0);
export const outPos = new Vector3(-0.3, 0, -0.42);

export function createMyMovies() {
  const root = new THREE.Object3D();
  for (let i = 0; i < movies.length; i++) {
    const cd = createCd(movies[i].img);
    meshs.push(cd);
    root.add(cd);
  }
  return root;
}
function fixIdx(idx) {
  return ((idx % movies.length) + movies.length) % movies.length;
}

export function moveOut(idx, uiElement) {
  let prevIdx = fixIdx(idx - 1),
    nxtIdx = fixIdx(idx + 1);
  idx = fixIdx(idx);

  gsap.to(meshs[prevIdx].position, {
    duration: 0.7,
    x: inPos.x,
    y: inPos.y,
    z: inPos.z,
  });
  gsap.to(meshs[nxtIdx].position, {
    duration: 0.7,
    x: inPos.x,
    y: inPos.y,
    z: inPos.z,
  });
  uiElement.style.opacity = 1;
  gsap.to(uiElement.style, {
    opacity: 0,
    duration: 0.7,
    onComplete: () => {
      uiElement.textContent = movies[idx].name;
      if (movies[idx].reserved) {
        uiElement.style.color = "rgb(68, 212, 68)";
      } else {
        uiElement.style.color = "#FFF";
      }
    },
  });
  gsap.to(uiElement.style, { opacity: 1, delay: 0.7, duration: 0.7 });

  gsap.to(meshs[idx].position, {
    delay: 0.7,
    x: outPos.x,
    y: outPos.y,
    z: outPos.z,
  });
}
