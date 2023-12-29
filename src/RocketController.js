import { Loader, Sprite } from "pixi.js";

export default class RocketController
{
    constructor(stage)
    {
        this.listRocket = []
        this.speed = 15
    }

    spawnRocket(stage, position)
    {
        const rocket = new Sprite(Loader.shared.resources["assets/rocket.png"].texture)

        rocket.anchor.set(0.5, 0.5)
        rocket.scale.set(0.4, 0.4)
        rocket.position = position

        this.listRocket.push(rocket)

        stage.addChild(rocket)
    }

    update()
    {
        this.listRocket.forEach(e => {
            e.position.x += this.speed

            if(e.position.x > window.innerWidth)
            {
                e.destroy()
                this.listRocket.splice(this.listRocket.indexOf(e), 1)
            }
        })
    }
} 