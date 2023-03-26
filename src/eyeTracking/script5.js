const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.strokeStyle = "white";

const middle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}
const mouse = {
    x: null,
    y: null,
}


// EVENTS_______________________________________________________________________________________________________________
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    middle.x = canvas.width/2;
    middle.y = canvas.height/2;
});

addEventListener("click", function (event){
})
canvas.addEventListener("mousemove", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})





// EYES_________________________________________________________________________________________________________________
class Eye{
    constructor(x, y) {
        this.radius = 50;

        this.x = x;
        this.y = y;

        this.pupilRadius = 0;
        this.maxPupilRadius = this.radius/2;
        this.pupilX = this.x;
        this.pupilY = this.y;

        this.awareness = 500;

    }

    update(){
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.awareness){
            this.pupilRadius = this.maxPupilRadius - 0.9*(this.maxPupilRadius * (distance / this.awareness));
            this.pupilX = this.x + (this.radius - this.pupilRadius) * (dx / (canvas.width));
            this.pupilY = this.y + (this.radius - this.pupilRadius) * (dy /canvas.height);
            this.draw(1);
        }
        else{
            this.draw(0);
        }
    }

    draw(active){
        if (active){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.pupilX, this.pupilY, this.pupilRadius, 0, Math.PI * 2);
            ctx.fill();
        }
        else{
            ctx.beginPath();
            ctx.moveTo(this.x - this.radius, this.y);
            ctx.lineTo(this.x + this.radius, this.y);
            ctx.stroke();
        }

    }
}

const eyeArray = [];
for (let i = 0; i < 35; i++) {
    eyeArray.push(new Eye(Math.random()*canvas.width, Math.random()*canvas.height));
}

// FUNCTIONS____________________________________________________________________________________________________________

function handleEyes(){
    eyeArray.forEach(eye => {
        eye.update();
    })
}


// ANIMATION____________________________________________________________________________________________________________
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handleEyes();
    requestAnimationFrame(animate);
}

// RUN__________________________________________________________________________________________________________________
animate();