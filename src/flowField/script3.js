const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Canvas Settings
c.fillStyle = "white";
c.strokeStyle = "white";



class Particle{
    constructor(effect) {
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.speedMod = Math.floor(Math.random() * 5 + 1)
        this.history = [{x: this.x, y: this.y}];
        this.maxLength = Math.floor(Math.random()*300 + 3);
        this.angle = 0;
        this.timer = this.maxLength * 2;
    }
    update(){
        // avoid next?? text

        // if (this.x > canvas.width/2 - 100 &&
        //     this.x < canvas.width/2 + 100 &&
        //     this.y > 50 &&
        //     this.y < 100){
        // }

        this.timer--;
        if (this.timer >= 1){
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            let index = y * this.effect.colums + x;
            this.angle = this.effect.flowFields[index];

            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x += this.speedX * this.speedMod;
            this.y += this.speedY * this.speedMod;

            this.history.push({x: this.x, y: this.y});
            if (this.history.length > this.maxLength){
                this.history.shift();
            }
        }
        else if(this.history.length > 1){
            this.history.shift();
        }
        else {
            this.reset();
        }
    }
    draw(context){
        // context.fillRect(this.x, this.y, 1,1);
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.stroke();
    }
    reset(){
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.history = [{x: this.x, y: this.y}];
        this.timer = this.maxLength * 2;
    }
}

class Effect {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.particles = [];
        this.numberOfParticles = 200;
        this.cellSize = 10;
        this.rows;
        this.colums;
        this.flowFields = [];
        this.curve = 2;
        this.zoom = 0.05;
        this.init();
    }
    init(){
        // flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.colums = Math.floor(this.width / this.cellSize);
        this.flowFields = [];

        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.colums; y++) {
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowFields.push(angle);
            }
        }
        // particles
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    render(context){
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }
}
const effect = new Effect(canvas.width, canvas.height);

addEventListener("click", function (event){
    if (event.x > canvas.width/2 - 50 &&
            event.x < canvas.width/2 + 50 &&
            event.y > 50 &&
            event.y < 100){
        window.location = "https://wolke19.github.io/html5CanvasTests";
        }
})
function animate(){
    c.clearRect(0,0,canvas.width, canvas.height);
    c.font = "30px Arial";
    c.textAlign = "center";
    c.strokeText("back to 1", canvas.width / 2, 100, 200 );
    effect.render(c);
    requestAnimationFrame(animate);
}
animate();
