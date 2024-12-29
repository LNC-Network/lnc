import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState, useMemo } from "react";
import useMousePos from "@/hooks/useMousePos";

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
  const [mouseXPos, mouseYPos] = useMousePos("ModelCanvas");
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const baseRotationX = -1.6;
  const [dynamicRotationX, setDynamicRotationX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (canvasSize.width && canvasSize.height) {
      const rotationChangeX = (mouseXPos - canvasSize.width / 2) / 2000;
      setDynamicRotationX(rotationChangeX);
    }
  }, [mouseXPos, canvasSize]);

  const modelScale = useMemo(() => [1, 1, 1] as [number, number, number], []);

  return (
    <Canvas style={{ height: "100vh", width: "100vw" }} id="ModelCanvas">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 0, 2]} color="white" />
      <directionalLight position={[-2, 0, 2]} color="white" />
      <directionalLight position={[0, 4, 2]} color="B762DE" />
      <Model
        scale={modelScale}
        rotation={[0, baseRotationX - dynamicRotationX, 0]}
        position={[0, -1.3, 0]}
      />
    </Canvas>
  );
}

export default ModelView;
