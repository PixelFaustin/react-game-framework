import Device from './Device';

export default class TextureManager {
  constructor() {
    this.textureMap = {};
  }

  downloadTextures = textureMap => {
    return new Promise.all(
      Object.keys(textureMap).map(name => {
        const url = textureMap[name];

        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => {
            resolve({ name, image });
          };
          image.onerror = () => {
            reject(`Could not load image at url ${url}`);
          };
          image.src = url;
        });
      })
    ).then(downloadedItems => {
      downloadedItems.forEach(({ name, image }) => {
        this.textureMap[name] = Device.createTexture2D(
          image.width,
          image.height
        ).copyFromImage(image);
      });
    });
  };
}
