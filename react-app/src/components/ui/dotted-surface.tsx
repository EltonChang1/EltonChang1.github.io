import * as React from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

function useIsDark() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;

    const read = () => {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setDark(root.classList.contains("dark") || prefersDark);
    };

    read();

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", read);
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mq.removeEventListener("change", read);
      observer.disconnect();
    };
  }, []);

  return dark;
}

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const isDark = useIsDark();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef(0);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wider, denser field so the viewport is always filled; wave motion stays subtle.
    const SEPARATION = 95;
    const AMOUNTX = 56;
    const AMOUNTY = 72;

    const scene = new THREE.Scene();
    // No fog — it was washing particles into the background color.

    const camera = new THREE.PerspectiveCamera(55, 1, 1, 12000);
    camera.position.set(0, 420, 980);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, y, z);
        if (isDark) {
          // Soft light dots on dark hero
          colors.push(0.9, 0.9, 0.92);
        } else {
          // Faint charcoal dots on light hero (readable with site neutrals)
          colors.push(0.18, 0.18, 0.2);
        }
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3),
    );

    // Screen-space point size (pixels) so dots stay visible on mobile / narrow viewports.
    const material = new THREE.PointsMaterial({
      size: isDark ? 2.1 : 2.35,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.38 : 0.42,
      depthWrite: false,
      sizeAttenuation: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;

    const resize = () => {
      const w = Math.max(container.clientWidth, 1);
      // First paint can report 0 height; fall back to viewport height once.
      const rawH = container.clientHeight;
      const h = rawH >= 2 ? rawH : Math.max(window.innerHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
    };

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const positionAttribute = geometry.attributes.position;
      const pos = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          pos[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.1;
    };

    renderer.domElement.className =
      "pointer-events-none absolute inset-0 h-full w-full";
    container.appendChild(renderer.domElement);
    requestAnimationFrame(() => resize());

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    window.addEventListener("resize", resize);
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 min-h-full w-full overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}
