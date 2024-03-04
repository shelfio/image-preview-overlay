## Installation
Note: uses styled-components

Install the library using npm:

```shell
$ npm install styled-components
$ npm install @shelf/image-preview-overlay
```

Install the library using yarn:

```shell
$ yarn add styled-components
$ yarn add @shelf/image-preview-overlay
```

#### Props

**getImages**
Type: `function (optional)`

A function that can be used to modify preview images list
```js
(event: ElementMouseEvent) => {src: string; alt?: string}[] | undefined;
```

**startPreviewFromTargetImage**
Type: `boolean (optional)`

Default false. Always opens first image from the list.

If set to true - will try to open the target image (if it is present in the list returned by getImages)

**triggerProps**, **portalWrapperProps**, **imageOverlayProps**

Type: `HTMLAttributes<HTMLDivElement> (optional)`

HTML attributes passed to corresponding elements

**imageProps**

Type: `HTMLAttributes<HTMLImageElement> (optional)`

HTML attributes passed to fullview image element

## Usage

### ImagePreviewOverlay

`ImagePreviewOverlay` is a wrapper that renders full image preview on child image tag click

```js
import {ImagePreviewOverlay} from '@shelf/image-preview-overlay';

// Simple usage
const Component = () => (
  <ImagePreviewOverlay>
    <span>
      Shelf.io
      <p>
        <img src={'shelf.io'} />
      </p>
    </span>
  </ImagePreviewOverlay>
);

// Custom getImages prop and multiple images
const Component = () => {
  const getImages = _event => [
    {
      src: 'source-1',
      alt: 'source 1 alt',
    },
    {
      src: 'source-2',
    },
  ];

  return (
    <ImagePreviewOverlay getImages={getImages}>
      <img src={'image-snippet-src'} />
    </ImagePreviewOverlay>
  );
};
```

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
