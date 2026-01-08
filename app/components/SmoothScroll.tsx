"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      {children as React.ComponentProps<typeof ReactLenis>["children"]}
    </ReactLenis>
  );
}
