import { useState, useEffect, useRef } from "react";

function useScroll(DECELERATION: number, MAX_SPEED: number, LERP_SPEED: number) {
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
            // Check if page is at the top
            if (window.scrollY === 0) {
                setDynamicPositionZ((prev) =>
                    prev > 0 ? prev - (prev * LERP_SPEED) : 0
                );
            } else if (!isScrolling.current && Math.abs(scrollVelocity.current) > 0.01) {
                // Apply inertia logic
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
    }, [LERP_SPEED]);

    return dynamicPositionZ;
}

export default useScroll;
