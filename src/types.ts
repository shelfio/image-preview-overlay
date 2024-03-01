import type {MouseEvent} from 'react';

export type ImageProp = {src: string; alt?: string};

export type ElementMouseEvent = MouseEvent<HTMLElement>;

export type ImagePreviewOverlayProps = {
  children: React.ReactNode;
  getImages?: (event: ElementMouseEvent) => ImageProp[] | undefined;
  triggerProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'onMouseUp'>;
  portalWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  imageOverlayProps?: React.HTMLAttributes<HTMLDivElement>;
  imageProps?: Omit<React.HTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
};
