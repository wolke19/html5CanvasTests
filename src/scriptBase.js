const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];


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
canvas.addEventListener("click", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})

canvas.addEventListener("mousemove", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})

// ctx.fillStyle = "white";
// ctx.fillRect(10,20,150,150);

class Particle {
    constructor() {
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 -1;
        this.speedY = Math.random() * 2 -1;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x,this.y,50,0,Math.PI*2);
        ctx.fill();
    }
}

function init(){
    for (let i = 0; i < 100; i++){
        particlesArray.push(new Particle());
    }
}
init();

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
animate();




