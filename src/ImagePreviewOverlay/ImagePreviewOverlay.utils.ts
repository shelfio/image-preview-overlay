import type {ElementMouseEvent} from '../types';

export const defaultgetImages = (event: ElementMouseEvent) => {
  if (event.target instanceof HTMLImageElement && event.target.src) {
    return [
      {
        src: event.target.src,
        alt: event.target.alt,
      },
    ];
  }
};
