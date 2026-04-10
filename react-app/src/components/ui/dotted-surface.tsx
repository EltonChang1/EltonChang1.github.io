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

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const SEPARATION = 88;
    const AMOUNTX = 58;
    const AMOUNTY = 76;

    const scene = new THREE.Scene();
    // No fog — it was washing particles into the background color.

    const camera = new THREE.PerspectiveCamera(55, 1, 1, 12000);
    camera.position.set(0, 420, 980);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      return;
    }
    const gl = renderer.getContext();
    if (!gl) {
      renderer.dispose();
      return;
    }

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
          colors.push(0.97, 0.97, 1);
        } else {
          colors.push(0.08, 0.08, 0.1);
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

    const material = new THREE.PointsMaterial({
      size: isDark ? 3.1 : 3.45,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.62 : 0.72,
      depthWrite: false,
      sizeAttenuation: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

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

    const tick = (timeMs: number) => {
      const t = timeMs * 0.001;

      const positionAttribute = geometry.attributes.position;
      const pos = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          const nx = ix * 0.31;
          const ny = iy * 0.27;
          const nxy = (ix + iy) * 0.19;

          const waveY =
            Math.sin(nx + t * 2.15) * 72 +
            Math.sin(ny + t * 2.65) * 68 +
            Math.sin(nxy + t * 1.55) * 52 +
            Math.cos(nx * 1.4 - ny * 1.1 + t * 3.1) * 38;

          const baseX = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const baseZ = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          const waveZ =
            Math.sin(ny + t * 2.0) * 22 +
            Math.sin(nx * 0.9 + t * 2.8) * 18;

          pos[index] = baseX;
          pos[index + 1] = waveY;
          pos[index + 2] = baseZ + waveZ;
          i++;
        }
      }
      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
    };

    renderer.domElement.className =
      "pointer-events-none absolute inset-0 z-[1] block h-full w-full";
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);
    requestAnimationFrame(() => resize());

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    window.addEventListener("resize", resize);

    renderer.setAnimationLoop(tick);

    return () => {
      renderer.setAnimationLoop(null);
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
