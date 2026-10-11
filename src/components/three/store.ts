/**
 * Mutable state shared between the DOM scroll story and the WebGL scene.
 * Deliberately not React state: it changes every frame and must not re-render.
 */
export const storyState = {
  /** 0..7 continuous stage (see formations.ts) */
  stage: 0,
  /** pointer in normalized device coords (-1..1) */
  pointerX: 0,
  pointerY: 0,
  /** where the network sits in the viewport (world units) */
  offsetX: 2.1,
  offsetY: 0,
  scale: 1,
  reduced: false,
  /** DOM labels positioned over the module hubs (written by the scene each frame) */
  labelEls: [] as (HTMLElement | null)[],
};
