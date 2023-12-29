import { Loader, Sprite } from "pixi.js";
import RocketController from "./RocketController";

export default class Player extends Sprite{
    constructor(stage)
    {
        super(Loader.shared.resources["assets/spaceship.png"].texture);
        this.anchor.set(0.5, 0.5)
        this.scale.set(0.3, 0.3)
        this.position.set(window.innerWidth*0.1, window.innerHeight*0.4)
        this.stage = stage
        stage.addChild(this)

        this.velocity = {x:0, y:0}
        this.speed = 6
        this.canFire = true
        this.loadingBulletDelay = 500

        this.rocketController = new RocketController()

        this.keysState = {32:false, 37: false, 38: false, 39: false, 40: false}

        window.addEventListener('keydown',  this.onKeyDown.bind(this))
        window.addEventListener('keyup', this.onKeyUp.bind(this))
    
    }

    onKeyDown(key)
    {
        const velocities = {37:-1, 38:-1, 39:1, 40: 1}

        console.log("Key pressed: " + key.keyCode)  

        this.keysState[key.keyCode] = true

        if(key.keyCode == 37 || key.keyCode == 39)
        {
            this.velocity.x = velocities[key.keyCode]
        }
        else if(key.keyCode == 38 || key.keyCode == 40)
        {
            this.velocity.y = velocities[key.keyCode]
        }
        else if(key.keyCode == 32)
        {
            this.firing()
        }
    }

    onKeyUp(key)
    {
        this.keysState[key.keyCode] = false

        if(key.keyCode == 37 || key.keyCode == 39)
        {
            this.velocity.x = 0
        }
        else if(key.keyCode == 38 || key.keyCode == 40)
        {
            this.velocity.y = 0
        }
    }

    update() 
    {
        this.rocketController.update()

        let newPosX = this.position.x + this.velocity.x * this.speed
        let newPosY = this.position.y + this.velocity.y * this.speed

        //console.log("new pos Y:" + newPosY)

        if(newPosX > 0 && newPosX < window.innerWidth)
        {
            this.position.x = newPosX
        }
        
        if(newPosY > 0 && newPosY < window.innerHeight)
        {
            this.position.y = newPosY
        }
    }

    firing()
    {
        if(this.canFire)
        {
            this.rocketController.spawnRocket(this.stage, this.position)
            this.loadingBullet()
        }
    }

    loadingBullet()
    {
        this.canFire = false
        setTimeout(() => this.canFire = true, this.loadingBulletDelay)
    }

}