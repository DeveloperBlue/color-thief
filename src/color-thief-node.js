const getPixels = require('get-pixels');
const quantize = require('@lokesh.dhakar/quantize');

function createPixelArray(imgData, pixelCount, options) {

    const { quality, includeWhite, checkTransparency, checkTransparencyConfig } = options;

    const pixels = imgData;
    const pixelArray = [];

    let transparentPixels = 0;

    for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];

        // If pixel is mostly opaque and not white
        if (typeof a === 'undefined' || a >= 125 ) {
            if (!(r > 250 && g > 250 && b > 250) || includeWhite) {
                pixelArray.push([r, g, b]);
            }
        } else if ( checkTransparency && a < checkTransparencyConfig.pixelConsideredTransparentThreshold ) {
            transparentPixels++;
        }
    }

    const hasTransparency = checkTransparency && ((transparentPixels / pixelCount.length) > checkTransparencyConfig.imageConsideredTransparentThreshold);

    return {pixelArray, hasTransparency}

}

function validateOptions(options) {
    let { colorCount, quality, includeWhite, checkTransparency, checkTransparencyConfig } = options;

    if (typeof colorCount === 'undefined' || !Number.isInteger(colorCount)) {
        colorCount = 10;
    } else if (colorCount === 1 ) {
        throw new Error('colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()');
    } else {
        colorCount = Math.max(colorCount, 2);
        colorCount = Math.min(colorCount, 20);
    }

    if (typeof quality === 'undefined' || !Number.isInteger(quality) || quality < 1) {
        quality = 10;
    }

    if (typeof includeWhite == 'undefined' || typeof includeWhite !== 'boolean' ){
        includeWhite = false;
    }

    if (typeof checkTransparency == 'undefined' || typeof checkTransparency !== 'boolean' ){
        checkTransparency = false;
    } else {
        if (typeof checkTransparencyConfig == 'undefined' || typeof checkTransparencyConfig !== 'object') {
            checkTransparencyConfig = {
                pixelConsideredTransparentThreshold : 10,
                imageConsideredTransparentThreshold : 0.1
            }
        } else {
            const {pixelConsideredTransparentThreshold, imageConsideredTransparentThreshold} = checkTransparencyConfig;

            if (typeof pixelConsideredTransparentThreshold == 'undefined' || Number.isNaN(pixelConsideredTransparentThreshold)) {
                checkTransparencyConfig.pixelConsideredTransparentThreshold = 10;
            }

            if (pixelConsideredTransparentThreshold < 0 || pixelConsideredTransparentThreshold > 255) {
                throw new Error('pixelConsideredTransparentThreshold should be between 0 and 255. Default is 10, meaning if a pixel\'s alpha (0-255) is less than this 10, the pixel is counted towards the overall transparency check.');
            }

            if (typeof imageConsideredTransparentThreshold == 'undefined' || Number.isNaN(imageConsideredTransparentThreshold)) {
                checkTransparencyConfig.imageConsideredTransparentThreshold = 0.1;
            }

            if (imageConsideredTransparentThreshold < 0 || imageConsideredTransparentThreshold > 1) {
                throw new Error('pixelConsideredTransparentThreshold should be between 0 and 1. Default is 0.1, meaning if 10% of the pixels trigger the pixelConsideredTransparentThreshold check, the image is considered transparent.');
            }

        }
    }

    return {
        colorCount,
        quality,
        includeWhite,
        checkTransparency,
        checkTransparencyConfig
    }
}

function loadImg(img) {
    return new Promise((resolve, reject) => {
        getPixels(img, function(err, data) {
            if(err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    });
}

function getColor(img, quality, includeWhite = false) {
    return new Promise((resolve, reject) => {
        getPalette(img, 5, quality, includeWhite)
            .then(palette => {
                resolve(palette[0]);
            })
            .catch(err => {
                reject(err);
            })
    });

}

function getPalette(img, colorCount = 10, quality = 10, includeWhite = false, checkTransparency = false, checkTransparencyConfig = {pixelConsideredTransparentThreshold : 10, imageConsideredTransparentThreshold : 0.1}) {
    const options = validateOptions({
        colorCount,
        quality,
        includeWhite,
        checkTransparency,
        checkTransparencyConfig
    });

    return new Promise((resolve, reject) => {
        loadImg(img)
            .then(imgData => {
                const pixelCount = imgData.shape[0] * imgData.shape[1];
                const {pixelArray, hasTransparency} = createPixelArray(imgData.data, pixelCount, options);

                const cmap = quantize(pixelArray, options.colorCount);
                const palette = cmap? cmap.palette() : null;

                if (checkTransparency) {
                    resolve({palette, hasTransparency})
                } else {
                    resolve(palette);
                }
            })
            .catch(err => {
                reject(err);
            })
    });
}

module.exports = {
    getColor,
    getPalette
};

