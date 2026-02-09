import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface AbstractCourseThumbnailProps {
  title: string;
  className?: string;
}

// Simple hash from string to generate deterministic values
function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

const palettes = [
  ["#E85D3A", "#F4845F", "#F7B267"], // warm orange
  ["#2563EB", "#60A5FA", "#93C5FD"], // blue
  ["#16A34A", "#4ADE80", "#BBF7D0"], // green
  ["#7C3AED", "#A78BFA", "#C4B5FD"], // purple
  ["#0891B2", "#22D3EE", "#67E8F9"], // cyan
  ["#DC2626", "#F87171", "#FCA5A5"], // red
  ["#D97706", "#FBBF24", "#FDE68A"], // amber
  ["#0D9488", "#2DD4BF", "#99F6E4"], // teal
];

type ShapeType = "bars" | "diagonal" | "grid" | "chevron" | "rays";

function generateShapes(hash: number, type: ShapeType) {
  const shapes: React.ReactNode[] = [];
  const opacity = 0.15 + (hash % 20) / 100;

  switch (type) {
    case "bars": {
      const count = 4 + (hash % 4);
      for (let i = 0; i < count; i++) {
        const w = 15 + (hash * (i + 1)) % 40;
        const y = (i * (100 / count));
        shapes.push(
          <rect
            key={i}
            x={10 + (hash * i) % 30}
            y={y}
            width={w}
            height={100 / count - 4}
            rx={2}
            fill="white"
            opacity={opacity + i * 0.04}
          />
        );
      }
      break;
    }
    case "diagonal": {
      const count = 3 + (hash % 3);
      for (let i = 0; i < count; i++) {
        const x1 = 20 + i * 20;
        shapes.push(
          <rect
            key={i}
            x={x1}
            y={-20}
            width={12 + (hash * i) % 15}
            height={140}
            rx={4}
            fill="white"
            opacity={opacity + i * 0.05}
            transform={`rotate(${25 + (hash % 20)} 50 50)`}
          />
        );
      }
      break;
    }
    case "grid": {
      const cols = 3 + (hash % 3);
      const rows = 3 + (hash % 3);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const size = 100 / Math.max(cols, rows) - 4;
          shapes.push(
            <rect
              key={`${r}-${c}`}
              x={c * (100 / cols) + 2}
              y={r * (100 / rows) + 2}
              width={size}
              height={size}
              rx={2}
              fill="white"
              opacity={opacity + ((r + c) % 3) * 0.06}
            />
          );
        }
      }
      break;
    }
    case "chevron": {
      const count = 3 + (hash % 3);
      for (let i = 0; i < count; i++) {
        const y = 15 + i * 25;
        const indent = 10 + i * 5;
        shapes.push(
          <polygon
            key={i}
            points={`${indent},${y} 50,${y - 12} ${100 - indent},${y} 50,${y + 12}`}
            fill="white"
            opacity={opacity + i * 0.06}
          />
        );
      }
      break;
    }
    case "rays": {
      const count = 5 + (hash % 4);
      for (let i = 0; i < count; i++) {
        const angle = (i * 360) / count;
        shapes.push(
          <rect
            key={i}
            x={46}
            y={0}
            width={8}
            height={50}
            rx={4}
            fill="white"
            opacity={opacity + (i % 3) * 0.05}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      }
      break;
    }
  }

  return shapes;
}

export function AbstractCourseThumbnail({ title, className }: AbstractCourseThumbnailProps) {
  const { palette, shapes, gradientAngle } = useMemo(() => {
    const hash = hashStr(title);
    const paletteIdx = hash % palettes.length;
    const palette = palettes[paletteIdx];
    const shapeTypes: ShapeType[] = ["bars", "diagonal", "grid", "chevron", "rays"];
    const shapeType = shapeTypes[(hash >> 4) % shapeTypes.length];
    const shapes = generateShapes(hash, shapeType);
    const gradientAngle = (hash % 360);

    return { palette, shapes, gradientAngle };
  }, [title]);

  const gradId = `grad-${hashStr(title)}`;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={gradId} gradientTransform={`rotate(${gradientAngle})`}>
            <stop offset="0%" stopColor={palette[0]} />
            <stop offset="50%" stopColor={palette[1]} />
            <stop offset="100%" stopColor={palette[2]} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${gradId})`} />
        {shapes}
      </svg>
    </div>
  );
}
