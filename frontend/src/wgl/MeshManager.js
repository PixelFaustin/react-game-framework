import * as OBJ from 'webgl-obj-loader';

export default class MeshManager {
  constructor(gl) {
    this.meshes = {};
  }

  downloadMeshes = meshMap => {
    return new Promise((resove, reject) => {
      OBJ.downloadMeshes(meshMap, meshes => {
        const loadedMeshes = Object.keys(meshes).map(name => {
          OBJ.initMeshBuffers(this.gl, meshes[name]);
          return { name, mesh: meshes[name] };
        });

        this.meshes = Object.assign(this.meshes, ...loadedMeshes);

        resolve();
      });
    });
  };
}
