import { moveOut } from "./components/myMovies";
import { camera } from "./init";
import gsap from "gsap/gsap-core";
import * as THREE from "three";
import { movies } from "./data";
import { switchCreditsLights } from "./components/Credits";

export const PLACES = {
  MOVIES: 0,
  SCENE: 1,
  PROJECTOR: 2,
  PHONE: 3,
  CREDITS: 4,
};

const lookAtMovie = {
  position: {
    x: -0.12,
    y: 1.055,
    z: -0.447,
  },
  lookAt: { x: -0.1, y: 0.56, z: -0.22 },
};

const lookAtScene = {
  position: {
    x: -0.003,
    y: 1.3,
    z: -1.5,
  },
  lookAt: { x: 0, y: 0.6, z: 0 },
};

const lookAtPhone = {
  position: {
    x: 0.7,
    y: 1.04,
    z: -0.5,
  },
  lookAt: { x: 0.7, y: 0.57, z: -0.25 },
};

const lookAtProjector = {
  position: { x: -0.92, y: 1.1, z: 0.94 },
  lookAt: { x: -0.92, y: 1, z: 1.95 },
};

const lookAtCredits = {
  position: { x: -0.98, y: 0.85, z: -0.43 },
  lookAt: { x: -1.98, y: 0.95, z: -0.43 },
};

// UI Elements
const sceneUI = document.getElementById("scene");
const moviesUI = document.getElementById("movies");
const creditsUI = document.getElementById("credits");
const reserveUI = document.getElementById("reserve");
const projectorUI = document.getElementById("projector");
const movieTitleUI = moviesUI.querySelector(".title");
const videoIframe = projectorUI.querySelector("iframe");

export class Manager {
  constructor() {
    this.curMovie = null;
    this.isAnimating = false;
    this.curPlace = PLACES.SCENE;
    this.curUI = null;
  }

  init() {
    document.querySelector("#go").addEventListener("click", () => {
      this.goto(PLACES.SCENE);
    });
    document.querySelector("#scene button").addEventListener("click", () => {
      this.goto(PLACES.MOVIES);
    });
    document.querySelector(".credits-btn").addEventListener("click", () => {
      this.goto(PLACES.CREDITS);
    });
    document.querySelector("#movies .nxt").addEventListener("click", () => {
      this.nextMovie(1);
    });
    document.querySelector("#movies .prev").addEventListener("click", () => {
      this.nextMovie(-1);
    });

    document
      .querySelectorAll(".reserve-btn")
      .forEach((b) =>
        b.addEventListener("click", () => this.goto(PLACES.PHONE))
      );

    document
      .querySelectorAll(".back")
      .forEach((b) =>
        b.addEventListener("click", () => this.goto(PLACES.MOVIES))
      );
    document.querySelector(".watch-trailer").addEventListener("click", () => {
      this.goto(PLACES.PROJECTOR);
    });

    document.querySelector(".submit").addEventListener("click", () => {
      movies[this.curMovie].reserved = true;
      movieTitleUI.style.color = "rgb(68, 212, 68)";
      this.goto(PLACES.MOVIES);
    });

    document.querySelectorAll(".home-btn").forEach((b) =>
      b.addEventListener("click", () => {
        this.goto(PLACES.SCENE);
      })
    );
  }

  moveCamera(moveTo, lookAt, onComplete = () => {}) {
    const duration = 1;
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startOrientation = new THREE.Quaternion().copy(camera.quaternion);

    camera.position.set(moveTo.x, moveTo.y, moveTo.z);
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);

    const targetOrientation = new THREE.Quaternion().copy(camera.quaternion);

    camera.quaternion.copy(startOrientation);
    camera.position.copy(startPosition);

    gsap.to(camera.position, {
      duration,
      ...moveTo,
      onComplete,
    });
    gsap.to(
      {},
      {
        duration,
        onUpdate: function () {
          camera.quaternion
            .copy(startOrientation)
            .slerp(targetOrientation, this.progress());
        },
      }
    );
  }

  goto(to) {
    let target;
    let uiToShow;

    if (to === PLACES.MOVIES) {
      if (this.curMovie === null) {
        this.curMovie = 0;
        moveOut(this.curMovie, movieTitleUI);
        videoIframe.src = movies[this.curMovie].video;
      }
      target = lookAtMovie;
      uiToShow = moviesUI;
    } else if (to === PLACES.PHONE) {
      target = lookAtPhone;
      uiToShow = reserveUI;
    } else if (to === PLACES.SCENE) {
      target = lookAtScene;
      uiToShow = sceneUI;
    } else if (to === PLACES.PROJECTOR) {
      target = lookAtProjector;
      uiToShow = projectorUI;
    } else if (to === PLACES.CREDITS) {
      target = lookAtCredits;
      uiToShow = creditsUI;
    } else return;

    if (this.curUI) this.hideUI(this.curUI);
    switchCreditsLights(false);
    this.moveCamera(target.position, target.lookAt, () => {
      if (uiToShow) {
        this.curUI = uiToShow;
        this.showUI(this.curUI);
        if (to === PLACES.CREDITS) switchCreditsLights(true);
      }
    });
    this.curPlace = to;
  }

  hideUI(ui) {
    gsap.to(ui.style, {
      opacity: 0,
      onComplete: () => {
        ui.style.visibility = "hidden";
      },
    });
  }
  showUI(ui) {
    ui.style.visibility = "visible";
    gsap.to(ui.style, { opacity: 1 });
  }

  nextMovie(isRight = 1) {
    this.curMovie += isRight;
    this.curMovie =
      ((this.curMovie % movies.length) + movies.length) % movies.length;
    moveOut(this.curMovie, movieTitleUI);

    videoIframe.src = movies[this.curMovie].video;
  }
}
