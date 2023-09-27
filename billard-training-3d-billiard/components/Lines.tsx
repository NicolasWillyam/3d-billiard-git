import { useLayoutEffect, useRef } from "react";
import {
  Vector3,
  BufferGeometry,
  Line,
  LineBasicMaterial,
  NormalBufferAttributes,
} from "three";

export type LinesProps = {
  start: Vector3;
  end: Vector3;
  ref: React.MutableRefObject<BufferGeometry<NormalBufferAttributes>>;
};

function Lines(props: LinesProps) {
  const { start, end, ref } = props;
  console.log(ref);
  return (
    <line>
      <bufferGeometry attach="geometry" ref={ref} />
      <lineBasicMaterial attach="material" color="white" opacity={0} />
    </line>
  );
}
export default Lines;
