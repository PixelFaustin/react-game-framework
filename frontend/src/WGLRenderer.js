import ShaderProgram from './ShaderProgram';
import Texture from './Texture';
import PositionUVQuad from './PositionUVQuad';
import GlobalShaderManager from './ShaderManager';

export default class WGLRenderer {
  constructor() {
    this.gl = undefined;
    this.canvas = undefined;
  }

  initialize = (gl, canvas) => {
    this.gl = gl;
    this.canvas = canvas;

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

    this.defaultQuad = new PositionUVQuad(this.gl).build();
  };

  resize = () => {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth = this.canvas.clientWidth;
    var displayHeight = this.canvas.clientHeight;

    if (
      this.canvas.width != displayWidth ||
      this.canvas.height != displayHeight
    ) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }
  };

  drawTexture = (
    x,
    y,
    width,
    height,
    texture,
    program = GlobalShaderManager.shaderMap['default-2d']
  ) => {
    this.drawTextureEx(x, y, width, height, texture, {}, program);
  };

  drawTextureEx = (
    x,
    y,
    width,
    height,
    texture,
    extra,
    program = GlobalShaderManager.shaderMap['default-2d']
  ) => {
    width = width || texture.width;
    height = height || texture.height;

    program.bind();

    this.defaultQuad.bind(program);

    const angle = extra.angle || 0;

    texture.bind();
    program.setUniform('u_resolution', [this.canvas.width, this.canvas.height]);
    program.setUniform('u_size', [width, height]);
    program.setUniform('u_position', [x, y]);
    program.setUniform('u_texture0', 0);
    program.setUniform('u_time', performance.now() / 1000);
    program.setUniform('u_panningSpeed', [0, 0]);
    program.setUniform('u_angle', angle);

    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.defaultQuad.indexCount,
      this.gl.UNSIGNED_SHORT,
      0
    );
  };

  setupFrame = () => {
    this.resize();
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };
}
