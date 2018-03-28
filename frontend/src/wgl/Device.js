import Context from './Context';

import VertexBuffer from './VertexBuffer';
import IndexBuffer from './IndexBuffer';
import Texture2D from './Texture2D';

const Device = {
  createContext: (canvas, webglOptions) => {
    if (canvas) {
      this.gl = canvas.getContext('webgl', webglOptions);

      if (!this.gl) {
        throw new Error(
          'Could not initialize webgl context! Your browser or hardware does not support WebGL'
        );
      }

      this.context = new Context();
      this.context.initialize(this.gl, this.canvas);
      return this.context;
    }
  },
  createVertexBuffer: (hint, size) => {
    return new VertexBuffer(this.gl, hint, size);
  },
  createIndexBuffer: (hint, size) => {
    return new IndexBuffer(this.gl, hint, size);
  },
  createTexture2D: (width, height, description) => {
    return new Texture2D(this.gl, width, height, description);
  }
};

export { Device };
