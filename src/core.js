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
        if (typeof a === 'undefined' || a >= checkTransparencyConfig.pixelConsideredTransparentThreshold ) {
            if (!(r > 250 && g > 250 && b > 250) || includeWhite) {
                pixelArray.push([r, g, b]);
            }
        } else if ( checkTransparency && a < checkTransparencyConfig.pixelConsideredTransparentThreshold ) {
            transparentPixels++;
        }
    }
    
    const hasTransparency = checkTransparency && ((transparentPixels / (pixelCount/quality)) > checkTransparencyConfig.imageConsideredTransparentThreshold);

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
                pixelConsideredTransparentThreshold : 125,
                imageConsideredTransparentThreshold : 0
            }
        } else {
            const {pixelConsideredTransparentThreshold, imageConsideredTransparentThreshold} = checkTransparencyConfig;

            if (typeof pixelConsideredTransparentThreshold == 'undefined' || Number.isNaN(pixelConsideredTransparentThreshold)) {
                checkTransparencyConfig.pixelConsideredTransparentThreshold = 125;
            }

            if (pixelConsideredTransparentThreshold < 0 || pixelConsideredTransparentThreshold > 255) {
                throw new Error('pixelConsideredTransparentThreshold should be between 0 and 255. Default is 125, meaning if a pixel\'s alpha (0-255) is less than this 125, the pixel is counted towards the overall transparency check.');
            }

            if (typeof imageConsideredTransparentThreshold == 'undefined' || Number.isNaN(imageConsideredTransparentThreshold)) {
                checkTransparencyConfig.imageConsideredTransparentThreshold = 0;
            }

            if (imageConsideredTransparentThreshold < 0 || imageConsideredTransparentThreshold > 1) {
                throw new Error('pixelConsideredTransparentThreshold should be between 0 and 1. Default is 0. If set to 0, any transparent pixel detected will mean the image is considered to be transparent. Any number greater than 0 serves as a treshold. For example, when set to 0.1 (a target of 10%); if 10% of all the pixels trigger the pixelConsideredTransparentThreshold check, the image is considered transparent.');
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

export default {
    createPixelArray,
    validateOptions
};
