import {fireEvent, render, screen} from '@testing-library/react';
import type {ImagePreviewOverlayProps} from '../types';
import {ImagePreviewOverlay} from './ImagePreviewOverlay';

const TestChildComponent = () => (
  <>
    <img src="test-src" alt="test alt" />
    <div>
      <span>
        <p>
          Test text
          <img src="nested-src" alt="nested alt" />
          <img src="nested-src-2" alt="nested alt 2" />
          <img src="nested-src-3" alt="nested alt 3" />
        </p>
      </span>
    </div>
  </>
);

const renderImagePreviewOverlay = (props?: Partial<ImagePreviewOverlayProps>) =>
  render(
    <ImagePreviewOverlay {...props}>
      <TestChildComponent />
    </ImagePreviewOverlay>
  );

describe('<ImagePreviewOverlay />', () => {
  it('should render children', () => {
    renderImagePreviewOverlay();

    expect(screen.getByText('Test text')).toBeVisible();
  });

  it('should open images on click and close on click / escape', () => {
    renderImagePreviewOverlay();

    expect(screen.queryByTestId('fullview-image')).not.toBeInTheDocument();

    const openImage = () => {
      fireEvent.mouseUp(screen.getByAltText('nested alt'));

      expect(screen.getAllByAltText('nested alt')).toHaveLength(2);
      expect(screen.getByTestId('fullview-image')).toBeVisible();
    };

    openImage();
    //close on click
    fireEvent.click(screen.getByTestId('fullview-image'));

    expect(screen.queryByTestId('fullview-image')).not.toBeInTheDocument();

    openImage();
    //close on escape
    fireEvent.keyDown(window, {key: 'Escape'});

    expect(screen.queryByTestId('fullview-image')).not.toBeInTheDocument();
  });

  it('should use getImages if passed', () => {
    renderImagePreviewOverlay({
      getImages: () => [
        {
          src: 'custom-src',
          alt: 'custom alt',
        },
      ],
    });

    fireEvent.mouseUp(screen.getByAltText('test alt'));

    expect(screen.getByAltText('custom alt')).toBeVisible();
    expect(screen.getAllByAltText('test alt')).toHaveLength(1);
  });

  it('should render close icon and no arrow icons if one image', () => {
    renderImagePreviewOverlay();

    fireEvent.mouseUp(screen.getByAltText('nested alt'));

    expect(screen.getByTestId('fullview-image')).toBeVisible();
    expect(screen.getByTestId('close-icon')).toBeVisible();
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });

  it('should render arrow icons and change images using arrows if more than 1 image', () => {
    renderImagePreviewOverlay({
      getImages: () => [
        {
          src: 'custom-src-3',
          alt: 'custom alt 3',
        },
        {
          src: 'custom-src-2',
          alt: 'custom alt 2',
        },
        {
          src: 'custom-src-1',
          alt: 'custom alt 1',
        },
      ],
    });

    fireEvent.mouseUp(screen.getByAltText('test alt'));

    expect(screen.getByAltText('custom alt 3')).toBeVisible();

    const leftIcon = screen.getByTestId('left-icon');
    const rightIcon = screen.getByTestId('right-icon');

    expect(leftIcon).toBeVisible();
    expect(rightIcon).toBeVisible();

    const move = ({isRight, expectAlt}: {isRight?: boolean; expectAlt: string}) => {
      fireEvent.click(isRight ? rightIcon : leftIcon);

      expect(screen.getByAltText(expectAlt)).toBeVisible();
    };

    // shows images in loop
    move({isRight: true, expectAlt: 'custom alt 2'});
    move({isRight: true, expectAlt: 'custom alt 1'});
    move({isRight: true, expectAlt: 'custom alt 3'});
    move({expectAlt: 'custom alt 1'});
    move({expectAlt: 'custom alt 2'});
    move({expectAlt: 'custom alt 3'});

    fireEvent.keyDown(window, {key: 'ArrowRight'});

    expect(screen.getByAltText('custom alt 2')).toBeVisible();

    fireEvent.keyDown(window, {key: 'ArrowLeft'});

    expect(screen.getByAltText('custom alt 3')).toBeVisible();
  });

  it('should start preview from target image', () => {
    renderImagePreviewOverlay({
      getImages: () => [
        {
          src: 'http://localhost/nested-src',
          alt: 'nested alt',
        },
        {
          src: 'http://localhost/nested-src-2',
          alt: 'nested alt 2',
        },
        {
          src: 'http://localhost/nested-src-3',
          alt: 'nested alt 3',
        },
      ],
      startPreviewFromTargetImage: true,
    });

    fireEvent.mouseUp(screen.getByAltText('nested alt 3'));

    expect(screen.getByTestId('fullview-image')).toBeVisible();
    expect(screen.getAllByAltText('nested alt 3')).toHaveLength(2);
  });
});
