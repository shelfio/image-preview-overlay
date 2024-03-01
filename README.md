## Install

```
$ yarn add @shelf/image-preview-overlay
```

## Usage

### ImagePreviewOverlay

`ImagePreviewOverlay` is a wrapper that renders full image preview on child image tag click.

```js
import {ImagePreviewOverlay} from '@shelf/react-outside-click';

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
