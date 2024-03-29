import ReactDOM from 'react-dom';
import {Hotkey} from '@shelf/hotkeys';
import {useState} from 'react';
import type {ElementMouseEvent, ImagePreviewOverlayProps, ImageProp} from '../types';
import {defaultGetImageIndex, defaultGetImages} from './ImagePreviewOverlay.utils';
import {ArrowIcon, CloseIcon, Image, Overlay, Trigger, Wrapper} from './ImagePreviewOverlay.styled';

export const ImagePreviewOverlay = ({
  children,
  getImages = defaultGetImages,
  getInitialPreviewImageIndex = defaultGetImageIndex,
  startPreviewFromTargetImage,
  triggerProps,
  portalWrapperProps,
  imageOverlayProps,
  imageProps,
}: ImagePreviewOverlayProps) => {
  const [images, setImages] = useState<ImageProp[] | null>(null);
  const [currentImage, setCurrentImage] = useState<number | null>(null);

  const setInitialPreview = (images: ImageProp[], index: number) => {
    setImages(images);
    setCurrentImage(index);
  };

  const handleClose = () => {
    setImages(null);
    setCurrentImage(null);
  };

  const handleMouseUp = (event: ElementMouseEvent) => {
    const images = getImages(event);

    if (!images?.length) return;

    const index = getInitialPreviewImageIndex({event, images, startPreviewFromTargetImage});
    setInitialPreview(images, index);
  };

  const handleMoveRight = () => {
    if (currentImage !== null && images) {
      setCurrentImage((currentImage + 1) % images.length);
    }
  };

  const handleMoveLeft = () => {
    if (currentImage !== null && images) {
      setCurrentImage((currentImage - 1 + images.length) % images.length);
    }
  };

  const renderIcons = () => {
    const isFewImages = !!(images && images.length > 1);

    return (
      <>
        <CloseIcon data-testid={'close-icon'} onClick={handleClose}>
          &#10005;
        </CloseIcon>
        {isFewImages && (
          <>
            <ArrowIcon data-testid={'left-icon'} $isLeft onClick={handleMoveLeft}>
              &#10094;
            </ArrowIcon>
            <ArrowIcon data-testid={'right-icon'} onClick={handleMoveRight}>
              &#10095;
            </ArrowIcon>
            <Hotkey binding={'ArrowRight'} onAction={handleMoveRight} />
            <Hotkey binding={'ArrowLeft'} onAction={handleMoveLeft} />
          </>
        )}
      </>
    );
  };

  const renderPreview = (image: {src: string; alt?: string}) =>
    ReactDOM.createPortal(
      <Wrapper {...portalWrapperProps}>
        <Overlay onClick={handleClose} {...imageOverlayProps}>
          <Hotkey binding={'Escape'} onAction={handleClose} />
          <Image data-testid={'fullview-image'} {...imageProps} src={image.src} alt={image.alt} />
        </Overlay>
        {renderIcons()}
      </Wrapper>,
      document.body
    );

  const imageToRender = typeof currentImage === 'number' ? images?.[currentImage] : null;

  return (
    <>
      <Trigger {...triggerProps} onMouseUp={handleMouseUp}>
        {children}
      </Trigger>
      {imageToRender && renderPreview(imageToRender)}
    </>
  );
};
