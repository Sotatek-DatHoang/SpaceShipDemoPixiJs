import { Loader, Sprite } from "pixi.js";

export default class CloudManager {
  constructor(stage) {
    this.stage = stage;
    this.clouds = Array(8)
      .fill()
      .map(() => {
        const cloud = new Sprite();

        this.reset(cloud);
        stage.addChild(cloud);
        return cloud;
      });
  }

  reset(element) {
    const { innerWidth, innerHeight } = window;
    const texture = Math.random() > 0.5 ? "cloud_1" : "cloud_2";

    element.texture =
      Loader.shared.resources["assets/" + texture + ".png"].texture;
    element.anchor.set(0.5, 0.5);
    element.position.set(
      innerWidth + (innerWidth * Math.random()), innerHeight * Math.random()
    );
    const scale = Math.random() * 1 + 0.1;
    element.scale.set(scale, scale);
  }

  update() {
    this.clouds.forEach((element) => {
      element.position.x -= 4;
      if (element.position.x < -element.width) {
        this.reset(element);
      }
    });
  }
}
