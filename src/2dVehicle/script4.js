// Canvas setup
const canvas = document.getElementById("c");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let score = 0;
let gameFrame = 0;
c.font = "50px Arial"

// Interaction
let accelerator = false;


window.addEventListener("resize", function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

addEventListener("keydown", function (event){
    accelerator = true;
    // console.log(accelerator);
})

addEventListener("keyup", function (event){
    accelerator = false;
    // console.log(accelerator);
})

// Player
class Player{
    constructor() {
        this.x = 100;
        this.y = 100;
        this.maxSpeed = 5;
        this.acceleration = 0.015;
        this.gravity = 0.001;
        this.slowDown = 0.99;
        this.speedX = 0;
        this.speedY = 0;
        this.angle = 0;
    }

    update(){

        if (accelerator){
            this.speedX += (this.acceleration)*(this.maxSpeed - this.speedX);
        }



        this.speedX = this.slowDown * this.speedX;
        this.speedY = this.gravity + this.speedY;
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){

        c.fillStyle = "red";
        c.fillRect(this.x, this.y, 20,20);

    }
}



// Track

// Background




// Animation Loop
const player = new Player();
function animate(){
    c.clearRect(0,0,canvas.width,canvas.height);
    player.update();
    player.draw();
    requestAnimationFrame(animate);
}

animate();



