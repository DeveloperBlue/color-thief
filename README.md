
# Color Thief

Grab the color palette from an image using just Javascript.Works in the browser and in Node.

## Fork Contents

This is a fork of [@lokesh/color-theif](https://github.com/lokesh/color-thief).

This fork adds the following features:
- Option to include white in the possible color palette
- Option to check if an image contains transparency (with fine-tunable thresholds)

> NOTE:
The demo and tests are not altered to reflect these changes.

### Usage with includeWhite and hasTransparency

```js
// Modified Function Parameters

// To include white when creating the color palette, simply set pass true to the includeWhite parameter.
getColor(img, quality, includeWhite = false)

// To check if an image has transparency, pass true to the hasTransparency parameter.
getPalette(img, colorCount = 10, quality = 10, includeWhite = false, checkTransparency = false, checkTransparencyConfig = {pixelConsideredTransparentThreshold : 10, imageConsideredTransparentThreshold : 0.1}) {
```


**⚠️ Note that getPalette() will then return an OBJECT when checkTransparency is true**⚠️.

```js
// original
const palette = getPalette(img, colorCount, quality, includeWhite, checkTransparency = false)
// with checkTransparency
const {palette, hasTransparency} = getPalette(img, colorCount, quality, includeWhite, checkTransparency = true)
```

To fine-tune how ``getPalette()`` determines if an image has transparency, you can also pass an additional checkTransparencyConfig object, where:

``pixelConsideredTransparentThreshold`` should be between 0 and 255. Default is 10, meaning if a pixel's alpha (0-255) is less than this 10, the pixel is counted towards the overall transparency check.

``pixelConsideredTransparentThreshold`` should be between 0 and 1. Default is 0.1, meaning if 10% of the pixels trigger the pixelConsideredTransparentThreshold check, the image is considered transparent.

---

### View the [demo page](https://lokeshdhakar.com/projects/color-thief/) for examples, API docs, and more.

---

## Contributing

### Project structure

+ `build/` - Simple script that copies and renames files into the /dist folder.
+ `cypress/` - Browsers tests.
+ `dist/` - Generated distribution files created by [microbundle](https://github.com/developit/microbundle) package and a couple of files copied via build script.
+ `examples/` - CSS, JS, and Images for the index.html example page.
+ `src/color-thief-node.js` - Source for the Node (commonjs) compatible version of the script.
+ `src/color-thief.js` - Source for the browser (ES6, AMD, Global var) compatible version of the script.
+ `src/core.js` - Functions shared between the node and browser versions of the script.
+ `test/` - Node integration tests. Uses Chai.
+ `index.html` - Example page.

### Running tests

There are two sets of tests:

1. Browser tests run with [Cypress](https://www.cypress.io)
2. Node tests run with [Karma](https://karma-runner.github.io/latest/index.html) and utilizing [Mocha](https://mochajs.org/)

To run both the browser and Node tests:

- `npm run dev` to start local server.
- `npm run test`

To run just the browser tests with the Cypress UI:

- `npm run dev` to start local server
- `npm run test:browser`

To run just the Node tests:

- `npm run test:node`


### Adding tests

- Update `cypress/test-pages/index.html` as needed or create a new test page if you need new examples.
- Add new tests in `cypress/integration/apis_spec.js`

### Making a new release

- Merge `dev` into `master`
- Pull down `master`
- Update version number in `src/color-thief.js` and `package.json`
- Run `npm run build`
- Commit and push built files back up to `master`
- Create a new Github release along with tag. Naming convention for both ```v2.8.1```
- `npm publish`
