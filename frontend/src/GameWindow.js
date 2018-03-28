import React, { Component } from 'react';
import Device from './wgl/Device';
import Game from './Game';

export default class ProfilePictureStream extends Component {
  constructor(props) {
    super(props);

    this.game = new Game();
  }

  componentDidMount = () => {
    if (this.canvas) {
      this.context = Device.createContext(this.canvas);

      this.game.initialize(this.context).then(() => {
        this.game.start();
      });
    }
  };

  render() {
    return (
      <canvas
        id="game-canvas"
        ref={canvas => {
          this.canvas = canvas;
        }}
      />
    );
  }
}
