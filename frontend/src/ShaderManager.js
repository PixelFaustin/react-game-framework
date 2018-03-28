import ShaderProgram from './ShaderProgram';

class ShaderManager {
  constructor() {
    this.pathPrefix = '/shaders';
    this.shaderMap = {};
  }

  loadProgram = (gl, name, vertexPath, fragmentPath, uniforms, attributes) => {
    return new Promise((resolve, reject) => {
      const fullVertexPath = `${this.pathPrefix}/${vertexPath}`;
      const fullFragmentPath = `${this.pathPrefix}/${fragmentPath}`;

      Promise.all([
        fetch(fullVertexPath).then(stream => {
          return stream.text();
        }),
        fetch(fullFragmentPath).then(stream => {
          return stream.text();
        })
      ]).then(files => {
        const [vertexSrc, fragmentSrc] = files;

        const program = new ShaderProgram(gl)
          .attachVertexSrc(vertexSrc)
          .attachFragmentSrc(fragmentSrc)
          .build();

        program.loadUniforms(uniforms);
        program.loadAttributes(attributes);

        this.shaderMap[name] = program;
        resolve();
      });
    });
  };
}

const GlobalShaderManager = new ShaderManager();

export default GlobalShaderManager;
