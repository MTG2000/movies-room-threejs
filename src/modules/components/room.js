import * as THREE from "three";
import { MathUtils } from "three";
import { createDustParticles } from "./DustParticles";

import { addToLoadingManager } from "../loader";

const reqs = {
  models: {},
  textures: {
    woodTexture1: "/textures/floor-texture.jpg",
    woodTexture2: "/textures/wall-texture.jpg",
  },
};
addToLoadingManager(reqs);

export function createRoom() {
  const room = new THREE.Object3D();
  const planeSize = 4;

  // Plane
  {
    const woodTexture = reqs.textures.woodTexture1;
    woodTexture.encoding = THREE.sRGBEncoding;
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    const repeats = 16;
    woodTexture.repeat.set(repeats, repeats);
    const geometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const material = new THREE.MeshStandardMaterial({
      map: woodTexture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.rotation.x = Math.PI * -0.5;

    const roof = mesh.clone();
    roof.rotateX(-Math.PI);
    roof.position.setY(3);

    room.add(mesh, roof);
  }

  //   Walls
  {
    // Wall 1
    const wallHeight = 3;
    const size = { x: planeSize, y: wallHeight };
    const woodTexture = reqs.textures.woodTexture2;
    woodTexture.encoding = THREE.sRGBEncoding;
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    const geometry = new THREE.PlaneGeometry(size.x, size.y);
    const material = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.4,
      metalness: 0,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, wallHeight / 2, -planeSize / 2);
    mesh.receiveShadow = true;

    // wall 2
    const mesh2 = mesh.clone();
    mesh2.position.set(0, wallHeight / 2, planeSize / 2);
    mesh2.rotateY(MathUtils.degToRad(180));

    // wall 3
    const mesh3 = mesh.clone();
    mesh3.position.set(planeSize / 2, wallHeight / 2, 0);
    mesh3.rotateY(MathUtils.degToRad(-90));

    // wall 4
    const mesh4 = mesh.clone();
    mesh4.position.set(-planeSize / 2, wallHeight / 2, 0);
    mesh4.rotateY(MathUtils.degToRad(90));

    room.add(mesh, mesh2, mesh3, mesh4);
  }

  const particles = createDustParticles();
  room.add(particles);

  return room;
}
