import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const ParticleCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const isPointerDown = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const colors = ['#38bdf8', '#7dd3fc', '#ffffff', '#0284c7', '#c084fc'];

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;

      // Spawn 1-2 particles on movement
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.85,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseDown = () => {
      isPointerDown.current = true;
      // Burst 8 particles
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: mousePos.current.targetX,
          y: mousePos.current.targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          alpha: 1,
          color: '#38bdf8',
        });
      }
    };

    const handleMouseUp = () => {
      isPointerDown.current = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    let animationId: number;

    const render = () => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.25;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.25;

      const { x, y } = mousePos.current;

      // Draw custom reticle cursor
      if (x > 0 && y > 0) {
        // Outer halo
        ctx.beginPath();
        ctx.arc(x, y, isPointerDown.current ? 18 : 12, 0, Math.PI * 2);
        ctx.strokeStyle = isPointerDown.current
          ? 'rgba(56, 189, 248, 0.8)'
          : 'rgba(125, 211, 252, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(x, y, isPointerDown.current ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update & render stardust particle trail
      particles = particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          alpha: p.alpha * 0.94,
          size: p.size * 0.97,
        }))
        .filter((p) => p.alpha > 0.05 && p.size > 0.3);

      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};
