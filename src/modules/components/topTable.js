import { createCinemaCamera } from "./camera";
import * as THREE from "three";
import { createLamb } from "./lamb";
import { MathUtils } from "three";
import { createCd } from "./Cd";
import { createCdsGroup } from "./CdsGroup";
import { createTelephone } from "./telephone";
import { makeXYZGUI } from "../../utils";
import { gui, scene } from "../init";
import { createPopCorn } from "./popcorn";
import { createMyMovies } from "./myMovies";

export async function createTopTable() {
  const root = new THREE.Object3D();

  const tableHeight = 0.5;
  const camera = await createCinemaCamera();
  camera.position.set(-0.7, 0.1, 0);
  camera.rotateY(Math.PI / 2);
  root.add(camera);

  const lamb = await createLamb();
  lamb.position.set(0.8, 0.027, 0.2);
  lamb.rotateY(-MathUtils.degToRad(160));
  root.add(lamb);

  const cdsGroup = createCdsGroup("/movies/the-dark-knight-min.jpg");
  cdsGroup.position.set(0.2, 0, 0.2);
  root.add(cdsGroup);

  const telephone = await createTelephone();
  telephone.position.set(0.8, 0.07, -0.25);
  root.add(telephone);

  const popcorn = await createPopCorn();
  popcorn.position.set(-0.52, 0.02, -0.35);
  popcorn.rotateY(MathUtils.degToRad(-75));
  root.add(popcorn);

  const myMovies = await createMyMovies();
  myMovies.position.set(0.2, 0.06, 0.2);
  root.add(myMovies);

  return root;
}
