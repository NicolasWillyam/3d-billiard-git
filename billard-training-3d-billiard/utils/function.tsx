import { BALL_DIAMETER, cross, outside } from "../constants";
import { Vector3 } from "three";
import {
  pointTranslate,
  lineRotate,
  lineAngle,
  pointRotate,
  pointOnLine,
  lineInterpolate,
  angleToRadians,
  lineLength,
  angleToDegrees,
  Point,
  Line,
} from "geometric";

// get random Object Ball
export const randomOB = new Vector3(
  Math.random() * 2 * cross.X - cross.X,
  Math.random() * 2 * cross.Y - cross.Y,
  BALL_DIAMETER / 2
);

// give line, return point of line and out cover line
export function getCrossPoint(
  line: Line,
  checkPoint: Point,
  aimPoint: Point
): [Line, Point] {
  const angle = lineAngle(line);
  const aConst = Math.tan(angleToRadians(angle));
  const bConst = line[0][1] - aConst * line[0][0];

  const lineCutCross: { [key: string]: Point } =
    aConst === 0
      ? {
          LeftSide: [-cross.X, bConst],
          RightSide: [cross.X, bConst],
        }
      : {
          LeftSide: [-cross.X, aConst * -cross.X + bConst],
          RightSide: [cross.X, aConst * cross.X + bConst],
          Top: [(cross.Y - bConst) / aConst, cross.Y],
          Bottom: [(-cross.Y - bConst) / aConst, -cross.Y],
        };
  const lineCutOutside: { [key: string]: Point } =
    aConst === 0
      ? {
          LeftSide: [-outside.X, bConst],
          RightSide: [outside.X, bConst],
        }
      : {
          LeftSide: [-outside.X, aConst * -outside.X + bConst],
          RightSide: [outside.X, aConst * outside.X + bConst],
          Top: [(outside.Y - bConst) / aConst, outside.Y],
          Bottom: [(-outside.Y - bConst) / aConst, -outside.Y],
        };

  let crossPoints: {
    key: string;
    value: Point;
  }[] = [];
  for (let [key, value] of Object.entries(lineCutCross)) {
    if (
      value[0] >= -cross.X &&
      value[0] <= cross.X &&
      value[1] >= -cross.Y &&
      value[1] <= cross.Y
    ) {
      crossPoints.push({ key, value });
    }
  }

  let lineToCross: Line = [aimPoint, crossPoints[0].value];
  if (pointOnLine(checkPoint, lineToCross, 0.00000001)) {
    return [
      [aimPoint, crossPoints[0].value],
      lineCutOutside[crossPoints[0].key],
    ];
  } else if (
    pointOnLine(checkPoint, [aimPoint, crossPoints[1].value], 0.0000001)
  ) {
    return [
      [aimPoint, crossPoints[1].value],
      lineCutOutside[crossPoints[1].key],
    ];
  } else
    return [
      [
        [0, 0],
        [0, 0],
      ],
      [0, 0],
    ];
}

// give line, return position of camera in line

export const getEyePosition = (
  line: Line,
  outsidePoint: Point,
  eyeDistance: number
): Point => {
  const minEyePosition: Point = outsidePoint
    ? pointTranslate(
        outsidePoint,
        lineAngle(line) - 180,
        10
        // 5 / Math.cos(Math.abs(angleToRadians(angle)))
      )
    : [0, 0];
  return pointTranslate(minEyePosition, lineAngle(line), eyeDistance * 12);
};

export const ChangeEyePosition = (
  line: Line,
  outsidePoint: Point,
  eyeDistance: number
) => {
  const minEyePosition: Point = outsidePoint
    ? pointTranslate(
        outsidePoint,
        lineAngle(line) - 180,
        10
        // 5 / Math.cos(Math.abs(angleToRadians(angle)))
      )
    : [0, 0];
  const eyePosition = pointTranslate(
    minEyePosition,
    lineAngle(line),
    eyeDistance * 12
  );
  return eyePosition;
};

// give 2 line, return angle of two line

// export const getTwoLineAngle = (line1, line2) => {
//   const aConst1 = Math.tan(angleToRadians(lineAngle(line1)));
//   const aConst2 = Math.tan(angleToRadians(lineAngle(line2)));

//   return angleToDegrees(
//     Math.atan(Math.abs((aConst1 - aConst2) / (1 + aConst1 * aConst2)))
//   );
// };

// give target, cut angle, return cue ball, object ball, aim line,

export const getOBAndCB = (
  target: [string, Point],
  distance: number,
  cutAngle: number,
  eyeDistance: number
): [
  eyePositionB: Point,
  objBall: Point,
  aimPoint: number[],
  getAimingLine:
    | {
        aimingLine: Line;
        cueBall2D: Point;
        eyePosition: Point;
        twoBallAngle: number;
      }
    | undefined,
  getAimingLine:
    | {
        aimingLine: Line;
        cueBall2D: Point;
        eyePosition: Point;
        twoBallAngle: number;
      }
    | undefined
] => {
  // target = bottomLeft -> angleRotate = 0 -> 90
  // target = bottomRight -> angleRotate = 90 -> 180
  // target = topRight -> angleRotate = 180 -> 270
  // target = topLeft -> angleRotate = 270 -> 360
  // target = sideLeft -> angleRotate = -sidePocketPossibleAngle -> sidePocketPossibleAngle
  // target = sideRight -> angleRotate = 180-sidePocketPossibleAngle -> sidePocketPossibleAngle-180

  const angle =
    target[0] === "bottomLeft"
      ? 45
      : // ? Math.random() * 90
      target[0] === "bottomRight"
      ? 135
      : // ? Math.random() * 90 + 90
      target[0] === "topRight"
      ? 225
      : // ? Math.random() * 90 + 180
      target[0] === "topLeft"
      ? // ? Math.random() * 90 + 270
        300
      : target[0] === "sideLeft"
      ? 0
      : 180;
  // ? Math.random() * 2 * sidePocketPossibleAngle - sidePocketPossibleAngle
  // : Math.random() * (180 - sidePocketPossibleAngle) +
  // 2 * sidePocketPossibleAngle;

  const objBall = pointTranslate(target[1], angle, distance);
  const target2 = [target[1][0] + 1, target[1][1] + 1];

  const impactLineAngle = lineAngle([objBall, target[1]]);

  const aimPoint = pointTranslate(
    objBall,
    impactLineAngle - 180,
    BALL_DIAMETER
  );
  const lineOfCenter: Line = [objBall, target[1]];

  const getAimingLine = (
    angle: number
  ): {
    aimingLine: Line;
    cueBall2D: Point;
    eyePosition: Point;
    twoBallAngle: number;
  } => {
    const aimingLine2D: Line = lineRotate(lineOfCenter, angle, aimPoint);
    const aimingLineCheckPoint: Point = pointRotate(objBall, angle, aimPoint);
    const aimingLine: Line = getCrossPoint(
      aimingLine2D,
      aimingLineCheckPoint,
      aimPoint
    )[0];

    let cueBall2D;
    if (aimingLine) cueBall2D = lineInterpolate(aimingLine)(0.3);
    // 0.3 is distance of cueBall and target
    else
      return {
        aimingLine: [
          [0, 0],
          [0, 0],
        ],
        cueBall2D: [0, 0],
        eyePosition: [0, 0],
        twoBallAngle: 0,
      };

    // get camera position from cue ball to object ball
    const lineFromCBToOB: Line = [cueBall2D, objBall];
    const angle2 = lineAngle(lineFromCBToOB);
    const aimPoint2 = pointTranslate(objBall, angle2, BALL_DIAMETER);

    const renderLine = getCrossPoint(lineFromCBToOB, objBall, aimPoint2);
    const eyePosition = getEyePosition(
      lineFromCBToOB,
      renderLine[1],
      eyeDistance
    );

    const lengthOfCBToOB = lineLength([cueBall2D, objBall]);
    const twoBallAngle =
      (Math.asin(BALL_DIAMETER / lengthOfCBToOB) * 180) / Math.PI;

    // const minEyeRotatePosition = pointRotate(
    //   eyePosition,
    //   twoBallAngle,
    //   cueBall2D
    // );

    // const maxEyeRotatePosition = pointRotate(
    //   eyePosition,
    //   -twoBallAngle,
    //   cueBall2D
    // );

    return {
      aimingLine,
      cueBall2D,
      eyePosition,
      twoBallAngle,
    };
  };

  // get camera position from object ball to target
  const angleB = lineAngle(lineOfCenter);
  const aimPointB = pointTranslate(objBall, angleB, BALL_DIAMETER);
  const renderLineB = getCrossPoint(lineOfCenter, objBall, aimPointB);
  const eyePositionB = getEyePosition(
    lineOfCenter,
    renderLineB[1],
    eyeDistance
  );

  return [
    eyePositionB,
    objBall,
    [...aimPoint, BALL_DIAMETER / 2],
    getAimingLine(180 - cutAngle),
    getAimingLine(cutAngle - 180),
  ];
};

// give cue ball,object ball and target, return camera position that pick object ball to target

export const getLimitPosition = (
  limitTarget: Point,
  objBall: Point,
  cueBall: Point,
  eyeDistance: number
) => {
  const aimPoint1 = pointTranslate(
    objBall,
    lineAngle([limitTarget, objBall]),
    BALL_DIAMETER
  );
  const limitLine = getCrossPoint([cueBall, aimPoint1], cueBall, aimPoint1);
  const eyeLimitPosition = getEyePosition(
    [cueBall, aimPoint1],
    limitLine[1],
    eyeDistance
  );
  return [eyeLimitPosition, aimPoint1];
};
