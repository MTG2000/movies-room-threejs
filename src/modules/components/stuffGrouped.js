const { createTable } = require("./table");
import * as THREE from "three";
import { createTopTable } from "./topTable";
import { createCredits } from "./Credits";
import { createProjectionCanvas } from "./ProjectionCanvas";

export const createStuffGroup = async () => {
  const root = new THREE.Object3D();
  const table = await createTable();
  const tableHeight = 0.5;
  table.position.set(0, tableHeight, 0);

  const tableTop = await createTopTable();
  tableTop.position.setY(tableHeight);

  const projectionCanvas = createProjectionCanvas();
  root.add(table, tableTop, projectionCanvas);

  const text = await createCredits();
  root.add(text);

  return root;
};
