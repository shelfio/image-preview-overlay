import * as Exports from './index.js';

describe('basic components index', () => {
  it('should export basic-components', function () {
    const exports = Object.keys(Exports);

    expect(exports).toHaveLength(1);
    expect(exports).toEqual(['ImagePreviewOverlay']);
  });
});
