import {defaultGetImages, getImageIndex} from './ImagePreviewOverlay.utils';

const testImage = new Image();
testImage.src = 'http://localhost/test2.png';
testImage.alt = 'alt2';

const images = [
  {src: 'http://localhost/test.png', alt: 'alt'},
  {src: 'http://localhost/test2.png', alt: 'alt2'},
];

const divElement = document.createElement('div');
divElement.src = 'http://localhost/test2.png';

describe('#defaultGetImages', () => {
  it('should return image for HTMLImageElement', () => {
    expect(defaultGetImages({target: testImage})).toEqual([
      {src: 'http://localhost/test2.png', alt: 'alt2'},
    ]);
  });

  it('should return undefined for other elements', () => {
    expect(defaultGetImages({target: divElement})).toEqual(undefined);
  });
});

describe('#getImageIndex', () => {
  it('should return 0 if startPreviewFromTargetImage is falsy', () => {
    expect(getImageIndex({images, event: {target: testImage}})).toEqual(0);
  });

  it('should return index if startPreviewFromTargetImage is falsy', () => {
    expect(
      getImageIndex({images, event: {target: testImage}, startPreviewFromTargetImage: true})
    ).toEqual(1);
  });

  it('should return 0 if target is not HTMLImageElement', () => {
    expect(
      getImageIndex({images, event: {target: divElement}, startPreviewFromTargetImage: true})
    ).toEqual(0);
  });

  it('should return 0 if index not found', () => {
    const testImage = new Image();
    testImage.src = 'http://localhost/does-not-exist.png';

    expect(
      getImageIndex({images, event: {target: testImage}, startPreviewFromTargetImage: true})
    ).toEqual(0);
  });
});
