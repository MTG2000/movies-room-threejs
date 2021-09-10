import { Clock } from "three";

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer, cb) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.cb = cb;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();

    this.cb(delta);
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
