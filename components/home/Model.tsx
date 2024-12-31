import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import useCanvasResize from "@/hooks/useCanvasResize";
import useRotation from "@/hooks/useRotation";
import useScroll from "@/hooks/useScroll";
// import useWindowInnerWidth from "@/hooks/useWindowInnerWidth";
import { useEffect, useMemo, useState } from "react";

interface ModelProps {
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
}

function Model({ scale, rotation, position }: ModelProps) {
  const gltf = useGLTF("/models/LNC.glb");
  return (
    <primitive
      object={gltf.scene}
      scale={scale}
      rotation={rotation}
      position={position}
    />
  );
}

function ModelView() {
  const deceleration = 0.88;
  const maxSpeed = 3;
  const RotationFactor = 3000;
  const Lerp_speed = 0.05;

  const canvasSize = useCanvasResize();
  const dynamicRotationX = useRotation(canvasSize.width, RotationFactor);
  const dynamicPositionZ = useScroll(deceleration, maxSpeed, Lerp_speed);
  const windowInnerWidth =
    typeof window !== "undefined" ? window.innerWidth : 1024;

  const baseRotationX = -1.58;
  const baseRotationY = 0.35;
  const baseRotationZ = 0;

  const basePositionX = 0;
  const basePositionY = windowInnerWidth <= 768 ? 1.5 : 0.9;
  const basePositionZ = windowInnerWidth <= 768 ? -1.3 : 0;

  const [rotation, setRotation] = useState<[number, number, number]>([
    baseRotationY,
    baseRotationX,
    baseRotationZ,
  ]);
  const [position, setPosition] = useState<[number, number, number]>([
    basePositionX,
    basePositionY,
    basePositionZ,
  ]);

  const scale = useMemo<[number, number, number]>(() => [0.5, 0.5, 0.5], []);

  useEffect(() => {
    setRotation([
      baseRotationY,
      baseRotationX + dynamicRotationX,
      baseRotationZ,
    ]);
    setPosition([
      basePositionX + (dynamicPositionZ + 2) / 20,
      basePositionY - dynamicPositionZ / 2.5,
      basePositionZ + dynamicPositionZ,
    ]);
  }, [
    dynamicRotationX,
    dynamicPositionZ,
    baseRotationX,
    basePositionZ,
    basePositionY,
  ]);

  return (
    <Canvas
      style={{
        height: "200vh",
        width: "100vw",
      }}
      id="ModelCanvas"
    >
      <ambientLight intensity={0} />
      <directionalLight position={[1, 0, 1]} color="white" />
      <directionalLight position={[-1, 0, 1]} color="white" />
      <Model scale={scale} rotation={rotation} position={position} />
    </Canvas>
  );
}

export default ModelView;
