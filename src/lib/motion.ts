export const motionTokens = {
  duration: {
    instant: 0.1,    // 100ms - Micro feedback, click, tap
    fast: 0.2,       // 200ms - Hover states, dropdowns, tooltips
    normal: 0.35,    // 350ms - Card elevations, sheet slide-in
    deliberate: 0.5, // 500ms - Section transitions, entrance reveals
  },
  ease: {
    // Industrial precision curve: fast acceleration, crisp stop
    industrial: [0.16, 1, 0.3, 1] as const,
    // Mechanical Snap for switches and buttons
    snap: [0.4, 0, 0.2, 1] as const,
    // Smooth ease for carousels
    smooth: [0.25, 0.1, 0.25, 1] as const,
  },
  spring: {
    tight: { stiffness: 400, damping: 30 },
    gentle: { stiffness: 200, damping: 25 },
    drawer: { stiffness: 350, damping: 32 },
  },
};
