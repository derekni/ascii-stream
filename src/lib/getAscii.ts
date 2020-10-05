const toGrayScale = (r: number, g: number, b: number) => 0.21 * r + 0.72 * g + 0.07 * b;

const convertToGrayScales = (context: any, width: number, height: number) => {
  const imageData = context.getImageData(0, 0, width, height);

  const grayScales = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];

    const grayScale = toGrayScale(r, g, b);
    imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

    grayScales.push(grayScale);
  }

  context.putImageData(imageData, 0, 0);

  return grayScales;
};

const grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
const reversedGrayRamp = ' .\'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
const rampLength = grayRamp.length;

// the grayScale value is an integer ranging from 0 (black) to 255 (white)
const getCharacterForGrayScale = (grayScale: number) =>
  reversedGrayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];

const getAsciiFromGrayscales = (grayScales: number[], width: number) => {
  const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
    let nextChars = getCharacterForGrayScale(grayScale);

    if ((index + 1) % width === 0) {
      nextChars += '\n';
    }

    return asciiImage + nextChars;
  }, '');

  return ascii;
};

const getAscii = (canvas: any) => {
  const { height, width } = canvas;
  const ctx = canvas.getContext('2d');

  const grayScales = convertToGrayScales(ctx, width, height);
  const ascii = getAsciiFromGrayscales(grayScales, canvas.width);
  return ascii;
};

export default getAscii;
