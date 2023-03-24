const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
}


addEventListener("mousemove", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})
class Particle{
    constructor() {
        this.x = Math.random()* canvas.width;
        this.y = Math.random()* canvas.height;
        this.speedX = 0;
        this.speedY = 0;
        this.distanceFromCenter = Math.sqrt((canvas.width/2-this.x)*(canvas.width/2-this.x) +(canvas.height/2-this.y)*(canvas.height/2-this.y));
        this.color = this.color = "hsl(" + this.distanceFromCenter / 2 + ", 100%, 50%)";
    }

    update(){
        this.speedX /= 1.005;
        this.speedY /= 1.005;

        if (this.x < 0 || this.x > canvas.width){
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height){
            this.speedY *= -1;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        this.speedX += dx / (12* distance);
        this.speedY += dy / (12* distance);

        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,1,0,Math.PI*2);
        ctx.fill();
    }
}

function init(){
    for (let i = 0; i < 5000; i++){
        particlesArray.push(new Particle);
    }
}

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}
init();
animate();




