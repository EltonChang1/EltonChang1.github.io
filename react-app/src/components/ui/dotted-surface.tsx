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

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const scene = new THREE.Scene();
    const fogColor = isDark ? 0x141414 : 0xf4f4f5;
    scene.fog = new THREE.Fog(fogColor, 2000, 10000);

    const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(fogColor, 0);

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
          colors.push(0.78, 0.78, 0.78);
        } else {
          colors.push(0.12, 0.12, 0.14);
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
      size: 8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;

    const resize = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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

    container.appendChild(renderer.domElement);
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
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
