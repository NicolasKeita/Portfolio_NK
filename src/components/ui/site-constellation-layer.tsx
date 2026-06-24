const nodes = [
  { x: 9, y: 6, r: 1.1 },
  { x: 23, y: 11, r: 0.8 },
  { x: 39, y: 7, r: 1.4 },
  { x: 74, y: 9, r: 1.0 },
  { x: 88, y: 16, r: 0.9 },
  { x: 14, y: 26, r: 1.0 },
  { x: 31, y: 31, r: 0.75 },
  { x: 54, y: 24, r: 1.25 },
  { x: 79, y: 32, r: 0.95 },
  { x: 92, y: 39, r: 1.25 },
  { x: 8, y: 48, r: 0.8 },
  { x: 26, y: 54, r: 1.15 },
  { x: 46, y: 47, r: 0.9 },
  { x: 67, y: 56, r: 1.35 },
  { x: 84, y: 51, r: 0.85 },
  { x: 17, y: 70, r: 1.35 },
  { x: 36, y: 75, r: 0.85 },
  { x: 57, y: 69, r: 1.05 },
  { x: 73, y: 78, r: 0.9 },
  { x: 91, y: 72, r: 1.2 },
  { x: 11, y: 91, r: 0.95 },
  { x: 28, y: 86, r: 1.15 },
  { x: 51, y: 92, r: 0.8 },
  { x: 69, y: 88, r: 1.25 },
  { x: 89, y: 94, r: 0.9 },
];

const links = [
  [0, 1], [1, 2], [3, 4],
  [5, 6], [6, 7], [7, 8], [8, 9],
  [10, 11], [11, 12], [12, 13], [13, 14],
  [15, 16], [16, 17], [17, 18], [18, 19],
  [20, 21], [21, 22], [22, 23], [23, 24],
  [2, 7], [7, 12], [12, 17], [17, 22],
  [4, 9], [9, 14], [14, 19], [19, 24],
] as const;

const clouds = [
  'left-[1%] top-[8%] h-[34rem] w-[34rem] bg-cyan-400/10',
  'right-[-6%] top-[27%] h-[42rem] w-[42rem] bg-indigo-500/10',
  'left-[8%] top-[54%] h-[38rem] w-[38rem] bg-sky-500/9',
  'right-[7%] top-[78%] h-[34rem] w-[34rem] bg-violet-500/8',
];

export function SiteConstellationLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {clouds.map((className) => (
        <div
          key={className}
          className={`absolute rounded-full blur-3xl ${className}`}
        />
      ))}

      <svg
        className="absolute inset-x-0 top-0 h-full min-h-[3200px] w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="siteConstellationLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {links.map(([a, b], index) => (
          <line
            key={`${a}-${b}-${index}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#siteConstellationLine)"
            strokeWidth={index % 4 === 0 ? 0.13 : 0.08}
          />
        ))}

        {nodes.map((node, index) => (
          <circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={index % 3 === 0 ? '#67e8f9' : index % 3 === 1 ? '#93c5fd' : '#c4b5fd'}
            opacity={index % 5 === 0 ? 0.42 : 0.24}
          />
        ))}
      </svg>
    </div>
  );
}
