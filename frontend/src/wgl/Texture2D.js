export default class Texture2D {
  constructor(gl, width, height, description) {
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    this.level = 0;
    this.internalFormat = gl[description.srcFormat || 'RGBA'];
    const border = 0;
    this.srcFormat = gl[description.srcFormat || 'RGBA'];
    this.srcType = gl[description.srcType || 'UNSIGNED_BYTE'];
    const pixel = new Uint8Array([255, 255, 255, 255]);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      width,
      height,
      border,
      srcFormat,
      srcType,
      pixel
    );

    this.description = Object.assign({ width, height }, description);
    this.gl = gl;
  }

  copyFromImage = image => {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      this.level,
      this.internalFormat,
      this.srcFormat,
      this.srcType,
      image
    );

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
    }

    return this;
  };
}
