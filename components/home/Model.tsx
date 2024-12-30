"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
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
  const [mouseXPos] = useMousePos("ModelCanvas");
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [basePositionZ, setBasePositionZ] = useState(0);
  const baseRotationX = -1.58;
  const [dynamicRotationX, setDynamicRotationX] = useState(0);
  const [dynamicPositionZ, setDynamicPositionZ] = useState(0);

  const scrollVelocity = useRef(0);
  const isScrolling = useRef(false);

  const DECELERATION = 0.88;
  const MAX_SPEED = 3;

  // Set initial values dependent on `window`
  useEffect(() => {
    const initialZ = window.innerWidth <= 768 ? -1.3 : 0;
    setBasePositionZ(initialZ);

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
    if (canvasSize.width) {
      const rotationChangeX = (mouseXPos - canvasSize.width / 2) / 4000;
      setDynamicRotationX(rotationChangeX);
    }
  }, [mouseXPos, canvasSize.width]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      isScrolling.current = true;
      scrollVelocity.current = Math.min(
        Math.max(event.deltaY * 0.026, -MAX_SPEED),
        MAX_SPEED
      );
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const applyInertia = () => {
      if (!isScrolling.current && Math.abs(scrollVelocity.current) > 0.01) {
        setDynamicPositionZ((prev) =>
          Math.max(prev + scrollVelocity.current / 10, 0)
        );
        scrollVelocity.current *= DECELERATION;
      } else if (isScrolling.current) {
        isScrolling.current = false;
      }

      animationFrame = requestAnimationFrame(applyInertia);
    };

    applyInertia();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <Canvas
      style={{
        height: "200vh",
        width: "100vw",
      }}
      id="ModelCanvas"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 0, 2]} color="white" />
      <directionalLight position={[-2, 0, 2]} color="white" />
      <directionalLight position={[0, 3, 3]} color="white" />
      <Model
        scale={[0.5, 0.5, 0.5]}
        rotation={[0.35, baseRotationX - dynamicRotationX, 0]}
        position={[
          0 + (dynamicPositionZ + 1.6) / 20,
          0.9 - dynamicPositionZ / 2.25,
          basePositionZ + dynamicPositionZ,
        ]}
      />
    </Canvas>
  );
}

export default ModelView;
