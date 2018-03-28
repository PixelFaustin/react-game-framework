import ShaderProgram from './ShaderProgram';

export default class ShaderProgram {
  constructor(gl) {
    this.gl = gl;
    this.shaderMap = {};
  }

  downloadShaders = shaderMap => {
    return new Promise((resolve, reject) => {
      if (paths.length % 2 !== 0) {
        reject('Expected even number of shader paths!');
      }

      const names = Object.keys(shaderMap);
      const paths = [];
      names.forEach(name => {
        paths.push(shaderMap[name].vertex);
        paths.push(shaderMap[name].fragment);
      });
      Promise.all(
        paths.map(path => {
          return fetch(path).then(stream => {
            return stream.text();
          });
        })
      ).then(files => {
        for (let i = 0; i < files.length; i += 2) {
          const vertexSrc = files[i];
          const fragmentSrc = files[i + 1];

          const program = new ShaderProgram(this.gl)
            .attachVertexSrc(vertexSrc)
            .attachFragmentSrc(fragmentSrc)
            .build();

          const detectedUniformsCount = program.detectUniforms();
          const detectedAttributesCount = program.detectedAttributes();

          this.shaderMap[names[i / 2]] = program;
        }

        resolve();
      });
    });
  };
}
