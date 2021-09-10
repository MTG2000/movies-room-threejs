import * as THREE from "three";

export function createProjectionCanvas() {
  const geo = new THREE.BoxBufferGeometry(1.4, 0.01, 1.4 / 2);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    metalness: 0,
    roughness: 0.7,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotateX(Math.PI / 2);
  mesh.position.set(-0.88, 1, 1.95);

  const stickGeo = new THREE.CylinderBufferGeometry(0.03, 0.03, 1.4, 8);
  const stickMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 1,
    roughness: 0.3,
  });

  const stickMesh = new THREE.Mesh(stickGeo, stickMat);
  stickMesh.rotateZ(Math.PI / 2);
  stickMesh.position.setZ(-1.4 / 4);
  mesh.add(stickMesh);

  return mesh;
}
