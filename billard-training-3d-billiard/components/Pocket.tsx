import React from "react";
import { TABLE_SIZE, SHELF_DEPTH } from "../constants";
import { CylinderGeometry, MeshBasicMaterial, Vector3 } from "three";

const Pocket = function () {
  const pocketGeometry = new CylinderGeometry(
    TABLE_SIZE.POCKET_SIZE * 1.1,
    TABLE_SIZE.POCKET_SIZE,
    2 / 2.5,
    64
  );
  const pocketMaterial = new MeshBasicMaterial({ color: 0x00000 });
  const pocket5X =
    TABLE_SIZE.PLAY_FIELD_W / 2 + TABLE_SIZE.CUSHIONS_W + SHELF_DEPTH;
  const pocket5Y =
    TABLE_SIZE.PLAY_FIELD_H / 2 + TABLE_SIZE.CUSHIONS_W + SHELF_DEPTH;
  const pocket10X = pocket5X + TABLE_SIZE.POCKET_SIZE / 2;
  const pocketZ = 1.6 * TABLE_SIZE.Z_PARAM;
  const pocketCoordinate = [
    new Vector3(-pocket5X, pocket5Y, -pocketZ),
    new Vector3(pocket5X, pocket5Y, -pocketZ),
    new Vector3(-pocket10X, 0, -pocketZ),
    new Vector3(pocket10X, 0, -pocketZ),
    new Vector3(-pocket5X, -pocket5Y, -pocketZ),
    new Vector3(pocket5X, -pocket5Y, -pocketZ),
  ];

  return pocketCoordinate.map((pos, idx) => (
    <mesh
      key={idx}
      args={[pocketGeometry, pocketMaterial]}
      position={pos}
      rotation={[1.5708, 0, 0]}
    />
  ));
};

export default React.memo(Pocket);
