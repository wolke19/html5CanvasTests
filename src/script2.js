const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;


window.addEventListener("resize", function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw Rect
    // ctx.fillStyle = "white";
    // ctx.fillRect(10,20,150,150);

    // Draw Circle
    ctx.fillStyle = "red";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(100,100,50,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();
    console.log(ctx);
});

const mouse = {
    x: null,
    y: null,
}
// canvas.addEventListener("click", function (event){
//     mouse.x = event.x;
//     mouse.y = event.y;
// })

canvas.addEventListener("mousemove", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})



// ctx.fillStyle = "white";
// ctx.fillRect(10,20,150,150);

class Particle {
    constructor() {
        this.x = canvas.width/2 + (mouse.x - canvas.width/2)/2;
        this.y = canvas.height/2 + (mouse.y - canvas.height/2) / 2;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random()*0.0000001 -10;
        this.speedY = Math.random() * 2 -1;
        this.color = "hsl(" + hue + ", 100%, 50%)";
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}


function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size / 20;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i,1);
            i--;
        }
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particlesArray.push(new Particle())
    handleParticles();
    hue += Math.random();
    requestAnimationFrame(animate);
}
animate();




