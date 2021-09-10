import { LoadingManager, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader";

const manager = new LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log(
    "Started loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};

manager.onLoad = function () {
  console.log("Loading complete!");
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log(
    "Loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};

manager.onError = function (url) {
  console.log("There was an error loading " + url);
};

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

export async function startLoading() {
  let totalItems = modelsToLoad.length + texturesToLoad.length;

  let loadedItems = 0;
  for (const item of modelsToLoad) {
    item.reqs.models[item.key] = await modelLoader.loadAsync(item.url);
    loadedItems++;
    updateLoadingUI(loadedItems / totalItems);
  }

  for (const item of texturesToLoad) {
    item.reqs.textures[item.key] = await texturesLoader.loadAsync(item.url);
    loadedItems++;
    updateLoadingUI(loadedItems / totalItems);
  }
}

const progressBar = document.querySelector(".progress-bar-in");
function updateLoadingUI(progress) {
  progressBar.style.transform = `scaleX(${progress})`;
  if (progress + 0.0001 >= 1)
    document.querySelector(".loading").style.visibility = "hidden";
}

export const loadingManager = manager;
