import { useEffect, useRef } from 'react';

const COLORS = ['#ff77c1', '#5cc8ff', '#ffe27a', '#7cffcb', '#ff6b6b', '#a78bfa', '#fb7185', '#22d3ee'];
const TOTAL = 180;

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Piece = { x: number; y: number; vx: number; vy: number; w: number; h: number; color: string; rot: number; rotV: number; opacity: number };
    const pieces: Piece[] = Array.from({ length: TOTAL }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: 2 + Math.random() * 3,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.2,
      opacity: 1,
    }));

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.rot += p.rotV;
        p.vx *= 0.995;
        if (p.y > canvas.height * 0.7) p.opacity -= 0.015;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 31,
        pointerEvents: 'none',
      }}
    />
  );
}
