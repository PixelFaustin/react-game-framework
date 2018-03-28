import { math } from './math';
import * as glm from 'gl-matrix';

export default class Camera {
  constructor(pos = glm.vec3.fromValues(0, 0, 0), speed = 5.0) {
    this.worldUp = glm.vec3.fromValues(0, 1, 0);

    this.movementSpeed = speed;

    this.dirty = false;
    this.eye = glm.vec3.clone(pos);
    this.forward = glm.vec3.fromValues(0, 0, -1);
    this.target = this.forward;
    this.up = glm.vec3.clone(WorldUp);
    this.right = glm.vec3.cross(glm.vec3.create(), forward, up);
    this.yaw = -90.0;
    this.pitch = 0.0;
    this.viewMatrix = glm.mat4.create();

    this.updateViewMatrix();
  }

  updateViewMatrix = () => {
    let result = glm.mat4.create();

    forward = math.toDirectionVector(yaw, pitch);
    glm.vec3.cross(right, forward, WorldUp);
    glm.vec3.cross(up, right, forward);

    glm.vec3.normalize(right, right);
    glm.vec3.normalize(up, up);

    let center = glm.vec3.create();
    glm.vec3.add(center, position, forward);

    glm.mat4.lookAt(result, position, center, up);

    viewMatrix = result;
  };

  moveBack = dt => {
    let direction = glm.vec3.create();
    glm.vec3.scale(direction, forward, movementSpeed * dt);

    glm.vec3.sub(position, position, direction);

    dirty = true;
  };

  moveForward = dt => {
    let direction = glm.vec3.create();
    glm.vec3.scale(direction, forward, movementSpeed * dt);

    glm.vec3.add(position, position, direction);

    dirty = true;
  };
  moveLeft = dt => {
    let direction = glm.vec3.create();
    glm.vec3.scale(direction, right, movementSpeed * dt);

    glm.vec3.sub(position, position, direction);

    dirty = true;
  };

  moveRight = dt => {
    let direction = glm.vec3.create();
    glm.vec3.scale(direction, right, movementSpeed * dt);

    glm.vec3.add(position, position, direction);

    dirty = true;
  };

  rotateYaw = (dt, degrees) => {
    yaw += degrees * dt;

    updateViewMatrix();
  };

  rotatePitch = (dt, degrees) => {
    pitch += degrees * dt;

    pitch = Math.min(pitch, 89.0);
    pitch = Math.max(pitch, -89.0);

    updateViewMatrix();
  };

  update = () => {
    if (dirty) {
      updateViewMatrix();

      dirty = false;
    }
  };
}
