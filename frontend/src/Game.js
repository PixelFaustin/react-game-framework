import React, { Component } from 'react';

import Context from './wgl/Context';
import Device from './wgl/Device';
import ShaderManager from './wgl/ShaderManager';
import TextureManager from './wgl/TextureManager';

class Game {
  constructor() {}

  initialize = context => {
    return new Promise((resolve, reject) => {
      this.shaderManager = new ShaderManager(Device.gl);
      this.textureManager = new TextureManager();

      this.shaderManager
        .downloadShaders({
          'default-2d': {
            vertex: '/shaders/default-2d-vs.glsl',
            fragment: '/shaders/default-2d-fs.glsl'
          }
        })
        .then(() => {
          this.textureManager.downloadTextures({ earth: '/images/earth.jpeg' });
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject();
        });
    });
  };

  gameLoop = () => {
    this.update();
    this.render();
    this.paintHook = requestAnimationFrame(this.gameLoop);
  };

  start = () => {
    this.setup();
    this.gameLoop();
  };
}
