function getElementVisiblePercentage(targetSelector: any, callback: (arg0: number) => void) {
    const target = document.querySelector(targetSelector);

    if (!target) {
        console.error(`Element ${targetSelector} not found.`);
        return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            const visiblePercentage = Math.round(entry.intersectionRatio * 100);
            callback(visiblePercentage);
        },
        {
            threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Track visibility in 1% increments
        }
    );

    observer.observe(target);
}
export default getElementVisiblePercentage;
// Example usage
// getElementVisiblePercentage('#scroll-target', (visiblePercentage) => {
//     console.log(`Visible Percentage: ${visiblePercentage}%`);
// });
