import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isInitialLoad) {
            setIsLoading(true);
            timeout = setTimeout(() => {
                setIsLoading(false);
                setIsInitialLoad(false);
            }, 3000); // Adjust the delay as needed
        } else {
            setIsLoading(true);
            timeout = setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [pathname, isInitialLoad]);

    return isLoading;
}
