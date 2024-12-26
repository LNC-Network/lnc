import { useEffect } from "react";

const useFluidBackground = () => {
    useEffect(() => {
        const loadCanvasAnimation = () => {
            const existingScript = document.querySelector(
                'script[src="lib/fluidBackground.js"]'
            );
            if (!existingScript) {
                const script = document.createElement("script");
                script.src = "lib/fluidBackground.js"; // Path to your animation script
                script.async = true; // Load the script asynchronously
                script.onload = () => {
                    console.log("Fluid background script loaded successfully.");
                };
                script.onerror = () => {
                    console.error("Failed to load the animation script");
                };
                document.body.appendChild(script); // Append the script to the body
            } else {
                console.log("Fluid background script is already loaded.");
            }
        };

        loadCanvasAnimation(); // Load the script on component mount

        return () => {
            // Cleanup function to remove the script if needed
            const existingScript = document.querySelector(
                'script[src="/lib/fluidBackground.js"]'
            );
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);
};

export default useFluidBackground;
