import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export function createCd(img) {
  const geo = new THREE.BoxBufferGeometry(0.4, 0.01, 0.4);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x000000,
    metalness: 0.7,
    roughness: 0.7,
  });
  const mesh = new THREE.Mesh(geo, mat);

  // Cover
  {
    const geo = new THREE.CircleBufferGeometry(0.3 / 2, 48);
    const mat = new THREE.MeshBasicMaterial({});
    if (img) {
      const texture = textureLoader.load(img);
      mat.map = texture;
    }

    const cover = new THREE.Mesh(geo, mat);
    mesh.add(cover);
    cover.rotateX(-Math.PI / 2);
    cover.rotateZ(Math.PI);
    cover.position.setY(0.009);
  }

  return mesh;
}
