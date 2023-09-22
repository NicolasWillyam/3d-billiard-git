import { Point, angleToDegrees } from "geometric";
import { Vector3 } from "three";

// 1px = 10cm
let zoom = 2;
export const LIGHT_PARAM = {
  LIGHT_HEIGHT: 30 / zoom,
  LIGHT_ROW: 6 / zoom,
  LIGHT_COL: 6 / zoom,
  ROW_DISTANCE: 12 / zoom,
  COL_DISTANCE: 12 / zoom,
};

export const TABLE_SIZE = {
  PLAY_FIELD_H: 25.4 / zoom,
  PLAY_FIELD_W: 12.7 / zoom,
  POCKET_SIZE: 1.13 / zoom,
  TOP_RAILS_W: 1.27 / zoom,
  CUSHIONS_W: 0.51 / zoom,
  Z_PARAM: 0.4 / zoom,
};
export const BALL_DIAMETER = 0.57 / zoom;

export const FACING_ANGLE = (Math.PI / 180) * 40;
export const SHELF_DEPTH = 0.4 / zoom;

export const pocketSide = TABLE_SIZE.POCKET_SIZE / Math.sqrt(2);
export const topRailSideH =
  TABLE_SIZE.PLAY_FIELD_H / 2 -
  TABLE_SIZE.POCKET_SIZE / 2 +
  TABLE_SIZE.CUSHIONS_W -
  pocketSide;
export const topRailTopW =
  TABLE_SIZE.PLAY_FIELD_W + 2 * TABLE_SIZE.CUSHIONS_W - 2 * pocketSide;
export const centerOfTopRailSideY =
  topRailSideH / 2 + TABLE_SIZE.POCKET_SIZE / 2;
export const centerOfTopRailSideX =
  TABLE_SIZE.PLAY_FIELD_W / 2 +
  TABLE_SIZE.CUSHIONS_W +
  TABLE_SIZE.TOP_RAILS_W / 2;
export const centerOfTopRailTopY =
  TABLE_SIZE.PLAY_FIELD_H / 2 +
  TABLE_SIZE.CUSHIONS_W +
  TABLE_SIZE.TOP_RAILS_W / 2;
export const getRailSideGeometry = new Vector3(
  TABLE_SIZE.TOP_RAILS_W,
  topRailSideH,
  TABLE_SIZE.Z_PARAM
);
export const getRailsTopGeometry = new Vector3(
  topRailTopW,
  TABLE_SIZE.TOP_RAILS_W,
  TABLE_SIZE.Z_PARAM
);
export const railSideCoordinate = [
  new Vector3(
    -centerOfTopRailSideX,
    centerOfTopRailSideY,
    TABLE_SIZE.Z_PARAM / 2
  ),
  new Vector3(
    centerOfTopRailSideX,
    centerOfTopRailSideY,
    TABLE_SIZE.Z_PARAM / 2
  ),
  new Vector3(
    -centerOfTopRailSideX,
    -centerOfTopRailSideY,
    TABLE_SIZE.Z_PARAM / 2
  ),
  new Vector3(
    centerOfTopRailSideX,
    -centerOfTopRailSideY,
    TABLE_SIZE.Z_PARAM / 2
  ),
];
export const railTopCoordinate = [
  new Vector3(0, centerOfTopRailTopY, TABLE_SIZE.Z_PARAM / 2),
  new Vector3(0, -centerOfTopRailTopY, TABLE_SIZE.Z_PARAM / 2),
];
export const cushion1Coordinate = [
  new Vector3(
    -(TABLE_SIZE.PLAY_FIELD_W / 2 + TABLE_SIZE.CUSHIONS_W),
    TABLE_SIZE.POCKET_SIZE / 2,
    0
  ),
  new Vector3(
    TABLE_SIZE.PLAY_FIELD_W / 2 + TABLE_SIZE.CUSHIONS_W,
    TABLE_SIZE.POCKET_SIZE / 2,
    TABLE_SIZE.Z_PARAM
  ),
];
export const cushion2Coordinate = [
  new Vector3(
    -(TABLE_SIZE.PLAY_FIELD_W / 2 + TABLE_SIZE.CUSHIONS_W),
    -topRailSideH - TABLE_SIZE.POCKET_SIZE / 2,
    0
  ),
  new Vector3(
    TABLE_SIZE.PLAY_FIELD_W / 2 + TABLE_SIZE.CUSHIONS_W,
    -topRailSideH - TABLE_SIZE.POCKET_SIZE / 2,
    TABLE_SIZE.Z_PARAM
  ),
];
export const cushion3Coordinate: Vector3[] = [
  new Vector3(
    -topRailTopW / 2,
    TABLE_SIZE.PLAY_FIELD_H / 2 + TABLE_SIZE.CUSHIONS_W,
    0
  ),
  new Vector3(
    topRailTopW / 2,
    -(TABLE_SIZE.PLAY_FIELD_H / 2 + TABLE_SIZE.CUSHIONS_W),
    0
  ),
];

export const targetPointCoordinate: { [key: string]: number } = {
  sideX: TABLE_SIZE.PLAY_FIELD_W / 2,
  sideY:
    TABLE_SIZE.PLAY_FIELD_H / 2 +
    TABLE_SIZE.CUSHIONS_W -
    TABLE_SIZE.POCKET_SIZE / Math.sqrt(2) -
    TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE),
  topX:
    TABLE_SIZE.PLAY_FIELD_W / 2 -
    TABLE_SIZE.POCKET_SIZE / Math.sqrt(2) -
    TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE),
  topY: TABLE_SIZE.PLAY_FIELD_H / 2,
};

export const targetLimitPoint: { [key: string]: [string, Point, Point] } = {
  topRight: [
    "topRight",
    [targetPointCoordinate.sideX, targetPointCoordinate.sideY],
    [targetPointCoordinate.topX, targetPointCoordinate.topY],
  ],
  topLeft: [
    "topLeft",
    [-targetPointCoordinate.sideX, targetPointCoordinate.sideY],
    [-targetPointCoordinate.topX, targetPointCoordinate.topY],
  ],
  bottomLeft: [
    "bottomLeft",
    [-targetPointCoordinate.sideX, -targetPointCoordinate.sideY], //[-2.54, -4.721270002014462], [-1.9772700020144618, -5.08]
    [-targetPointCoordinate.topX, -targetPointCoordinate.topY],
  ],
  bottomRight: [
    "bottomRight",
    [targetPointCoordinate.sideX, -targetPointCoordinate.sideY],
    [targetPointCoordinate.topX, -targetPointCoordinate.topY],
  ],
  sideLeft: [
    "sideLeft",
    [-TABLE_SIZE.PLAY_FIELD_W / 2, TABLE_SIZE.POCKET_SIZE / 2 + 0.1],
    [-TABLE_SIZE.PLAY_FIELD_W / 2, -(TABLE_SIZE.POCKET_SIZE / 2 + 0.1)],
  ],
  sideRight: [
    "sideRight",
    [TABLE_SIZE.PLAY_FIELD_W / 2, TABLE_SIZE.POCKET_SIZE / 2 + 0.1],
    [TABLE_SIZE.PLAY_FIELD_W / 2, -(TABLE_SIZE.POCKET_SIZE / 2 + 0.1)],
  ],
};

export const cross = {
  X: TABLE_SIZE.PLAY_FIELD_W / 2 - BALL_DIAMETER / 2,
  Y: TABLE_SIZE.PLAY_FIELD_H / 2 - BALL_DIAMETER / 2,
};
export const outside = {
  X:
    TABLE_SIZE.PLAY_FIELD_W / 2 +
    TABLE_SIZE.CUSHIONS_W +
    TABLE_SIZE.TOP_RAILS_W,
  Y:
    TABLE_SIZE.PLAY_FIELD_H / 2 +
    TABLE_SIZE.CUSHIONS_W +
    TABLE_SIZE.TOP_RAILS_W,
};
export const targetCoordinate: { [key: string]: [string, Point] } = {
  topRight: ["topRight", [cross.X, cross.Y]],
  topLeft: ["topLeft", [-cross.X, cross.Y]],
  bottomLeft: ["bottomLeft", [cross.X, -cross.Y]],
  bottomRight: ["bottomRight", [cross.X, -cross.Y]],
  sideRight: ["sideRight", [targetPointCoordinate.sideX, 0]],
  sideLeft: ["sideLeft", [-targetPointCoordinate.sideX, 0]],
};
// export const targetCoordinate = {
//   topRight: [...targetMidPoint.topRight, BALL_SIZE / 2],
//   topLeft: [...targetMidPoint.topLeft, BALL_SIZE / 2],
//   bottomLeft: [...targetMidPoint.bottomLeft, BALL_SIZE / 2],
//   bottomRight: [...targetMidPoint.bottomRight, BALL_SIZE / 2],
//   sideRight: [targetPointCoordinate.sideX, 0, BALL_SIZE / 2],
//   sideLeft: [-targetPointCoordinate.sideX, 0, BALL_SIZE / 2],
// };

export const sidePocketPossibleAngle =
  90 -
  angleToDegrees(Math.asin(BALL_DIAMETER / (TABLE_SIZE.POCKET_SIZE + 0.2)));
