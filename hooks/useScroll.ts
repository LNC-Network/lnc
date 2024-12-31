import { useState, useEffect, useRef } from "react";

function useScroll(DECELERATION: number, MAX_SPEED: number) {
    const [dynamicPositionZ, setDynamicPositionZ] = useState(0);
    const scrollVelocity = useRef(0);
    const isScrolling = useRef(false);

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            isScrolling.current = true;
            scrollVelocity.current = Math.min(
                Math.max(event.deltaY * 0.026, -MAX_SPEED),
                MAX_SPEED
            );

            // Update position immediately
            setDynamicPositionZ((prev) =>
                Math.max(prev + scrollVelocity.current / 10, 0)
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

    return dynamicPositionZ;
}

export default useScroll;
