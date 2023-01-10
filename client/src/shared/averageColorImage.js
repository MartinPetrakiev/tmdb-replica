export const averageColorImage = (event) => {
    const image = new Image();
    image.width = event.target.width
    image.height = event.target.height
    image.crossOrigin = 'Anonymous'
    image.src = event.target.src
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;

    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;
    let count = 0;

    for (let i = 0, len = data.length; i < len; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      a += data[i + 3];
      count++;
    }

    const avgR = Math.round(r / count);
    const avgG = Math.round(g / count);
    const avgB = Math.round(b / count);
    const avgA = Math.round(a / count);

    const avgColor = [avgR, avgG, avgB, (avgA / 255)];
    return avgColor;
  }