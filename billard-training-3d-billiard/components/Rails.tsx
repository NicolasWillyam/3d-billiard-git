import React from "react";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import {
  TABLE_SIZE,
  FACING_ANGLE,
  topRailSideH,
  topRailTopW,
  getRailSideGeometry,
  getRailsTopGeometry,
  railSideCoordinate,
  railTopCoordinate,
  cushion1Coordinate,
  cushion2Coordinate,
  cushion3Coordinate,
} from "../constants";
import {
  BoxGeometry,
  MeshStandardMaterial,
  Shape,
  ExtrudeGeometry,
  Texture,
} from "three";

const Rails = function () {
  // TOP_RAILS:
  const woodTexture: Texture = useLoader(
    TextureLoader,
    "../assets/textures/hardwood_floor.jpg"
  );
  const railMaterial = new MeshStandardMaterial({ map: woodTexture });
  const railSideGeometry = new BoxGeometry(...getRailSideGeometry);
  const railTopGeometry = new BoxGeometry(...getRailsTopGeometry);

  // CUSHIONS:
  const clothTexture: Texture = useLoader(
    TextureLoader,
    "../assets/textures/cloth.jpg"
  );
  const clothMaterial = new MeshStandardMaterial({ map: clothTexture });

  const shape1 = new Shape();
  shape1.moveTo(0, 0);
  shape1.lineTo(0, topRailSideH);
  shape1.lineTo(
    TABLE_SIZE.CUSHIONS_W,
    topRailSideH - TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE)
  );
  shape1.lineTo(TABLE_SIZE.CUSHIONS_W, 0.1);
  shape1.lineTo(0, 0);

  const shape2 = new Shape();
  shape2.moveTo(0, 0);
  shape2.lineTo(0, topRailSideH);
  shape2.lineTo(TABLE_SIZE.CUSHIONS_W, topRailSideH - 0.1);
  shape2.lineTo(
    TABLE_SIZE.CUSHIONS_W,
    TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE)
  );
  shape2.lineTo(0, 0);

  const shape3 = new Shape();
  shape3.moveTo(0, 0);
  shape3.lineTo(0, topRailTopW);
  shape3.lineTo(
    TABLE_SIZE.CUSHIONS_W,
    topRailTopW - TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE)
  );
  shape3.lineTo(
    TABLE_SIZE.CUSHIONS_W,
    TABLE_SIZE.CUSHIONS_W / Math.tan(FACING_ANGLE)
  );
  shape3.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: TABLE_SIZE.Z_PARAM,
    bevelEnabled: false,
  };
  const cushion1Geometry = new ExtrudeGeometry(shape1, extrudeSettings);
  const cushion2Geometry = new ExtrudeGeometry(shape2, extrudeSettings);
  const cushion3Geometry = new ExtrudeGeometry(shape3, extrudeSettings);

  return (
    <>
      {railSideCoordinate.map((pos, idx) => (
        <mesh
          key={idx}
          args={[railSideGeometry, railMaterial]}
          position={pos}
        />
      ))}
      {railTopCoordinate.map((pos, idx) => (
        <mesh key={idx} args={[railTopGeometry, railMaterial]} position={pos} />
      ))}
      {cushion1Coordinate.map((pos, idx) => (
        <mesh
          key={idx}
          args={[cushion1Geometry, clothMaterial]}
          position={pos}
          rotation={idx === 1 ? [0, Math.PI, 0] : [0, 0, 0]}
        />
      ))}
      {cushion2Coordinate.map((pos, idx) => (
        <mesh
          key={idx}
          args={[cushion2Geometry, clothMaterial]}
          position={pos}
          rotation={idx === 1 ? [0, Math.PI, 0] : [0, 0, 0]}
        />
      ))}
      {cushion3Coordinate.map((pos, idx) => (
        <mesh
          key={idx}
          args={[cushion3Geometry, clothMaterial]}
          position={pos}
          rotation={idx === 0 ? [0, 0, -Math.PI / 2] : [0, 0, Math.PI / 2]}
        />
      ))}
    </>
  );
};

export default React.memo(Rails);
