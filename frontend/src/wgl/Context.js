import ClearState from './ClearState';
import DrawState from './DrawState';
import RenderState from './RenderState';

export default class Context {
  constructor() {
    this.viewport = { x: 0, y: 0, w: 0, h: 0 };
    this.framebuffer = undefined;
    this.textureUnits = [{ texture: null, sampler: null }];
    this.texturesDirty = false;
  }

  initialize = (gl, canvas) => {
    this.gl = gl;
    this.canvas = canvas;
  };

  resize = () => {
    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    if (
      this.canvas.width != displayWidth ||
      this.canvas.height != displayHeight
    ) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }
  };

  draw = (primitiveType, offset, count, drawState, sceneState) => {
    const { renderState, shaderProgram, vertexArray } = drawState;
    const { position, normal, uv, index } = vertexArray;

    this.shaderProgram.bind();
    this.shaderProgram.setAutomatics(this, drawState, sceneState);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, position);

    if (normal) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normal);
    }
    if (uv) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, uv);
    }

    if (this.texturesDirty) {
      this.textureUnits.forEach(textureUnit => {
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_S,
          textureUnit.sampler.wrapS
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_WRAP_T,
          textureUnit.sampler.wrapT
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MIN_FILTER,
          textureUnit.sampler.minificationFilter
        );
        this.gl.texParameteri(
          this.gl.TEXTURE_2D,
          this.gl.TEXTURE_MAG_FILTER,
          textureUnit.sampler.magnificationFilter
        );
        this.gl.bindTexture(this.gl.TEXTURE_2D, textureUnit.texture);
      });

      this.texturesDirty = false;
    }

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, index);
    this.gl.drawElements(primitiveType, count, this.gl.UNSIGNED_SHORT, offset);
  };

  clear = clearState => {
    this.gl.clearColor(
      clearState.color.r,
      clearState.color.g,
      clearState.color.b,
      clearState.color.a
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };
}
