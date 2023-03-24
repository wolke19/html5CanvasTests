const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const mouse = {
    x: null,
    y: null,
}


addEventListener("mousemove", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})
class Particle{
    constructor() {
        this.x = Math.random()* canvas.width;
        this.y = Math.random()* canvas.height;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
    }

    update(){
        this.speedX /= 1.01;
        this.speedY /= 1.01;

        if (this.x < 0 || this.x > canvas.width){
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height){
            this.speedY *= -1;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        this.speedX += dx / (5* distance);
        this.speedY += dy / (5* distance);

        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(this.x,this.y,1,0,Math.PI*2);
        ctx.fill();
    }
}

function init(){
    for (let i = 0; i < 10000; i++){
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




