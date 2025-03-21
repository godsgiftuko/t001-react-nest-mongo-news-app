import React from "react";

enum SpinnerColor {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export default function Spinner({
  size = 8,
  color = SpinnerColor.DARK,
  padding = true,
}: {
  size?: number;
  color?: keyof typeof SpinnerColor;
  padding?: boolean;
}) {
  const _color = color === SpinnerColor.DARK ? 'gray' : 'white';
  return (
    <div className={`flex items-center justify-center ${padding ? 'py-8' : ''}`}>
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-${_color}-900`}
      ></div>
    </div>
  );
}
