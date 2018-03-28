import Device from './Device';

export default class Mesh {
  constructor() {
    this.vertexAttributes = { position: null };
    this.indexBuffer = null;
    this.primitiveType = null;
    this.frontFaceWindingOrder = null;
    this.dimension = 0; //delete if useless
  }

  copyFromImported = (imported, primitiveType, frontFaceWindingOrder) => {
    this.dimension = importedMesh.vertexBuffer.itemSize;
    this.vertexAttributes.position = importedMesh.vertexBuffer;
    this.vertexAttributes.normal = importedMesh.normalBuffer;
    this.vertexAttributes.uv = importedMesh.textureBuffer;
    this.indexBuffer = importedMesh.indexBuffer;

    this.primitiveType = primitiveType;
    this.frontFaceWindingOrder = frontFaceWindingOrder; //default is gl.CCW

    return this;
  };

  copyFromRaw = (dimension, vertices, indices) => {
    if (vertices.length * indices.length <= 0) {
      throw new Error('Vertices or indices cannot be left null');
    }

    this.dimension = dimension;
    this.vertexAttributes.position = Device.createVertexBuffer(
      'STATIC_DRAW',
      vertices.length
    ).bufferFromMemory(vertices);

    this.indexBuffer = Device.createIndexBuffer(
      'STATIC_DRAW',
      indices.length
    ).bufferFromMemory(indices);

    return this;
  };
}

var DefaultQuad = undefined;

const getDefaultQuad = () => {
  DefaultQuad =
    DefaultQuad ||
    new Mesh().copyFromRaw(
      2,
      [1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, 1],
      [0, 1, 2, 3, 4, 5]
    );

  return DefaultQuad;
};
export { getDefaultQuad };
