import { type ReactNode } from 'react';
import { Cloud, type ICloud } from 'react-icon-cloud';

const cloudOptions: ICloud['options'] = {
  clickToFront: true,
  depth: 0.8,
  imageScale: null,
  initial: [0.1, -0.1],
  outlineMethod: 'none',
  reverse: true,
  wheelZoom: false,
  noSelect: true,
  textColour: '#ffffff',
  textHeight: 14,
  tooltip: 'native',
  tooltipDelay: 0,
  weightMode: 'size',
  weightSize: 1.5,
  weightSizeMax: 2,
};

interface IconCloudProps {
  children?: ReactNode[];
}

/**
 * IconCloud — A 3D interactive tag cloud / sphere using react-icon-cloud (TagCanvas).
 * Elements orbit in 3D space inside an HTML5 <canvas>.
 */
export function IconCloud({ children }: IconCloudProps) {
  return (
    <Cloud
      options={cloudOptions}
      containerProps={{
        className:
          'flex items-center justify-center w-full h-full select-none',
      }}
      canvasProps={{
        className: 'rounded-2xl',
        style: { maxWidth: '100%', height: 'auto' },
      }}
    >
      {children}
    </Cloud>
  );
}