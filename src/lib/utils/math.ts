export const radialPointY = (
  yOrigin: number,
  phi: number,
  radius: number,
  radialOffset: number,
  scale: number
) => {
  return yOrigin + Math.sin(phi - radialOffset) * radius * scale;
};

export const radialPointX = (
  xOrigin: number,
  phi: number,
  radius: number,
  radialOffset: number,
  scale: number
) => {
  return xOrigin + Math.cos(phi - radialOffset) * radius * scale;
};
