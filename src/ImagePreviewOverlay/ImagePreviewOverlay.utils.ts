import type {ElementMouseEvent, ImageProp} from '../types';

export const defaultGetImages = (event: ElementMouseEvent) => {
  if (event.target instanceof HTMLImageElement && event.target.src) {
    return [
      {
        src: event.target.src,
        alt: event.target.alt,
      },
    ];
  }
};

export const getImageIndex = ({
  images,
  event,
  startPreviewFromTargetImage,
}: {
  images: ImageProp[];
  event: ElementMouseEvent;
  startPreviewFromTargetImage?: boolean;
}) => {
  if (!startPreviewFromTargetImage || !(event.target instanceof HTMLImageElement)) return 0;

  const index = images.findIndex(image => image.src === (event.target as HTMLImageElement).src);

  return index < 0 ? 0 : index;
};
