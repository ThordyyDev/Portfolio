import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxLife: number;
  age: number;
  type: 'cross' | 'dot' | 'ring';
  rotation: number;
  rotSpeed: number;
}

interface Point {
  x: number;
  y: number;
  time: number;
}

interface CursorTrailZoneProps {
  children: ReactNode;
  className?: string;
}

/**
 * High-end Monochrome Tech Cursor Trail for Works section.
 * Features:
 *  - Ethereal ambient spotlight that illuminates cards and borders
 *  - Smooth fluid monochrome ribbon/filament following the cursor path
 *  - Tech particle constellation (crisp micro crosshairs '+', diamond nodes, expanding pings)
 *  - Subtle coordinate reticle
 *  - Automatic idle sleep to ensure 0% CPU usage when stationary
 *  - Full pointer-events: none pass-through
 */
export function CursorTrailZone({ children, className = '' }: CursorTrailZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const pointsRef = useRef<Point[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });
  const isLoopRunningRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);

  // Resize canvas according to device pixel ratio
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  const spawnParticles = (x: number, y: number, vx: number, vy: number) => {
    const count = Math.random() < 0.6 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      const type: 'cross' | 'dot' | 'ring' =
        typeRand < 0.45 ? 'cross' : typeRand < 0.8 ? 'dot' : 'ring';

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.2;

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed + vx * 0.15,
        vy: Math.sin(angle) * speed + vy * 0.15,
        size: type === 'cross' ? 4 : type === 'ring' ? 3 : Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        maxLife: Math.random() * 25 + 25, // frames
        age: 0,
        type,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.08,
      });
    }

    // Keep particle limit sane
    if (particlesRef.current.length > 50) {
      particlesRef.current.splice(0, particlesRef.current.length - 50);
    }
  };

  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    const now = performance.now();

    // 1. Prune old ribbon points (> 350ms)
    pointsRef.current = pointsRef.current.filter((p) => now - p.time < 350);

    // 2. Draw smooth monochrome ribbon / filament
    const pts = pointsRef.current;
    if (pts.length > 2) {
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const age = now - p1.time;
        const progress = Math.max(0, 1 - age / 350);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);

        // Subtle glowing white filament
        ctx.strokeStyle = `rgba(255, 255, 255, ${(progress * 0.4).toFixed(3)})`;
        ctx.lineWidth = progress * 2.2 + 0.4;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    // 3. Update and draw particles
    const aliveParticles: Particle[] = [];
    for (const p of particlesRef.current) {
      p.age++;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.rotation += p.rotSpeed;

      const progress = 1 - p.age / p.maxLife;
      if (progress <= 0) continue;

      const currentOpacity = p.opacity * progress;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.type === 'cross') {
        // High-tech micro crosshair '+'
        ctx.strokeStyle = `rgba(255, 255, 255, ${(currentOpacity * 0.85).toFixed(3)})`;
        ctx.lineWidth = 1;
        const arm = p.size;
        ctx.beginPath();
        ctx.moveTo(-arm, 0);
        ctx.lineTo(arm, 0);
        ctx.moveTo(0, -arm);
        ctx.lineTo(0, arm);
        ctx.stroke();
      } else if (p.type === 'ring') {
        // Delicate expanding beacon ring
        const currentRadius = p.size + (1 - progress) * 12;
        ctx.strokeStyle = `rgba(212, 212, 216, ${(currentOpacity * 0.6).toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Crisp glowing dot
        ctx.fillStyle = `rgba(255, 255, 255, ${(currentOpacity * 0.95).toFixed(3)})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      aliveParticles.push(p);
    }
    particlesRef.current = aliveParticles;

    // 4. Draw subtle technical target reticle near cursor
    const mouse = mousePosRef.current;
    if (mouse.active && mouse.x > 0 && mouse.y > 0) {
      ctx.save();
      ctx.translate(mouse.x, mouse.y);

      // Outer micro-brackets
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;

      // Small central dot
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Precision crosshair tick marks
      ctx.beginPath();
      ctx.moveTo(-7, 0);
      ctx.lineTo(-3, 0);
      ctx.moveTo(3, 0);
      ctx.lineTo(7, 0);
      ctx.moveTo(0, -7);
      ctx.lineTo(0, -3);
      ctx.moveTo(0, 3);
      ctx.lineTo(0, 7);
      ctx.stroke();

      // Monospace coordinate tag
      ctx.font = '9px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = 'rgba(161, 161, 170, 0.6)';
      ctx.fillText(`[${Math.round(mouse.x)}, ${Math.round(mouse.y)}]`, 12, -8);

      ctx.restore();
    }

    // Determine if loop should continue or sleep
    const hasActiveContent =
      pointsRef.current.length > 0 ||
      particlesRef.current.length > 0 ||
      mouse.active;

    if (hasActiveContent) {
      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    } else {
      isLoopRunningRef.current = false;
    }
  };

  const startLoopIfNeeded = () => {
    if (!isLoopRunningRef.current) {
      isLoopRunningRef.current = true;
      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const prevX = mousePosRef.current.x;
    const prevY = mousePosRef.current.y;
    const vx = prevX > 0 ? x - prevX : 0;
    const vy = prevY > 0 ? y - prevY : 0;

    mousePosRef.current = { x, y, active: true };

    const now = performance.now();
    pointsRef.current.push({ x, y, time: now });

    // Spawn tech particles with throttle
    if (now - lastSpawnTimeRef.current > 24) {
      spawnParticles(x, y, vx, vy);
      lastSpawnTimeRef.current = now;
    }

    // Update ambient spotlight position via CSS variable or style transform
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '1';
      spotlightRef.current.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
    }

    startLoopIfNeeded();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y, active: true };
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '1';
      spotlightRef.current.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
    }
    startLoopIfNeeded();
  };

  const handleMouseLeave = () => {
    mousePosRef.current.active = false;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  // Setup ResizeObserver for responsive resize
  useEffect(() => {
    syncCanvasSize();
    const container = containerRef.current;
    if (!container) return;

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        syncCanvasSize();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', syncCanvasSize);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', syncCanvasSize);
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [syncCanvasSize]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Sleek Ambient Monochrome Spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full transition-opacity duration-500 ease-out z-[5]"
        style={{
          opacity: 0,
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.055) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(16px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* 2. High-Precision Tech Canvas Overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Child content (Works section) */}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
