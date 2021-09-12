import { LoadingManager, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader";

const modelLoader = new GLTFLoader();
const texturesLoader = new TextureLoader();

let modelsToLoad = [],
  texturesToLoad = [];

export function addToLoadingManager(reqs) {
  if (reqs.models)
    for (const [key, url] of Object.entries(reqs.models)) {
      modelsToLoad.push({
        reqs,
        key,
        url,
      });
    }

  if (reqs.textures)
    for (const [key, url] of Object.entries(reqs.textures)) {
      texturesToLoad.push({
        reqs,
        key,
        url,
      });
    }
}

let totalItems = 1,
  loadedItems = 0;

export async function startLoading() {
  totalItems += modelsToLoad.length + texturesToLoad.length;

  loadedItems = 0;
  for (const item of modelsToLoad) {
    item.reqs.models[item.key] = await modelLoader.loadAsync(item.url);
    loadedItems++;
    updateLoadingUI(true);
  }

  for (const item of texturesToLoad) {
    item.reqs.textures[item.key] = await texturesLoader.loadAsync(item.url);
    loadedItems++;
    updateLoadingUI(true);
  }
}

const bgMusicUrl = "bg-music.mp3";

const progressBar = document.querySelector(".progress-bar-in");
function updateLoadingUI(canFinish) {
  const progress = loadedItems / totalItems;
  progressBar.style.transform = `scaleX(${progress})`;
  if (canFinish && progress + 0.0001 >= 1) {
    document.querySelector(".progress-bar-out").style.display = "none";
    document.querySelector(".loading h2").textContent = "Loading Completed !!";
    // console.log();
    const goBtn = document.getElementById("go");
    goBtn.style.display = "block";
    goBtn.addEventListener("click", () => {
      document.querySelector(".loading").style.visibility = "hidden";
      var audio = new Audio(bgMusicUrl);
      audio.play();
    });
  }
}

(function preloadAudio() {
  var audio = new Audio();
  audio.addEventListener("canplaythrough", loadedAudio, false);
  audio.src = bgMusicUrl;
})();

function loadedAudio() {
  loadedItems++;
  updateLoadingUI(false);
}
