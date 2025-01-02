import { useEffect, useState } from "react";
import useMousePos from "@/hooks/useMousePos";

function useMouseRotation(canvasWidth: number, factor: number) {
    const [mouseXPos] = useMousePos("ModelCanvas");
    const [dynamicRotationX, setDynamicRotationX] = useState(0);

    useEffect(() => {
        if (canvasWidth) {
            const rotationChangeX = (mouseXPos - canvasWidth / 2) / factor;
            setDynamicRotationX(rotationChangeX);
        }
    }, [mouseXPos, canvasWidth]);

    return dynamicRotationX;
}

export default useMouseRotation;
