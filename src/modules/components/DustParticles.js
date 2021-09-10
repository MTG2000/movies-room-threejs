import * as THREE from "three";
import { loop } from "../../script";

export function createDustParticles() {
  const nParticles = 100;
  const positions = [];
  const sizes = [];

  const radius = 4;

  const geometry = new THREE.BufferGeometry();
  for (let i = 0; i < nParticles; i++) {
    positions.push((Math.random() * 2 - 1) * radius);
    positions.push((Math.random() * 2 - 1) * radius);
    positions.push((Math.random() * 2 - 1) * radius);
    sizes.push(0.04);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute(
    "size",
    new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage)
  );

  const uniforms = {
    pointTexture: {
      value: new THREE.TextureLoader().load("textures/dust.png"),
    },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: document.getElementById("vertexshader").textContent,
    fragmentShader: document.getElementById("fragmentshader").textContent,

    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexColors: true,
  });
  const particleSystem = new THREE.Points(geometry, material);
  particleSystem.position.set(2, 0, 2);

  particleSystem.tick = (delta) => {
    particleSystem.rotation.x -= delta * 0.05;
    particleSystem.rotation.z += delta * 0.05;
  };
  loop.updatables.push(particleSystem);

  return particleSystem;
}
