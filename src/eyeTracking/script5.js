const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.strokeStyle = "white";

let gameFrame = 0;
let mouthCounter = 0;
const eyeArray = [];

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
});

addEventListener("click", function (event){
})
canvas.addEventListener("mousemove", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})

addEventListener("click", function (event){
    if (event.x > canvas.width/2 - 50 &&
        event.x < canvas.width/2 + 50 &&
        event.y > 50 &&
        event.y < 100){
        window.location = "https://wolke19.github.io/html5CanvasTests";
    }
})



// EYES_________________________________________________________________________________________________________________
class Eye{
    constructor(x, y, r) {
        this.radius = r;

        this.x = x;
        this.y = y;

        this.pupilRadius = 0;
        this.maxPupilRadius = this.radius/1.4;
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

class Face{
    constructor(x,y, r) {
        this.radius = r;
        this.x = x;
        this.y = y;
        this.eyeL = new Eye(this.x - this.radius / 2, this.y - this.radius / 3, this.radius/3);
        this.eyeR = new Eye(this.x + this.radius / 2, this.y - this.radius / 3, this.radius/3);
    }
    update(){

    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.stroke();
        if (mouthCounter > 500){
            ctx.fillRect(this.x + this.radius / 5, this.y + this.radius/2, 30,1)
        }
        else {
            ctx.fillRect(this.x - this.radius / 4, this.y + this.radius/2, 30,1)
        }

        handleEyes()
    }
}




// FUNCTIONS____________________________________________________________________________________________________________

const face = new Face(canvas.width/2, canvas.height/2, 100);

function handleEyes(){
    face.eyeL.update();
    face.eyeR.update();
    // eyeArray.forEach(eye => {
    //     eye.update();
    //     eye.draw();
    // })
}

function handleFace(){
    face.update();
    face.draw();
}


// ANIMATION____________________________________________________________________________________________________________
function animate(){
    gameFrame++;
    mouthCounter++;
    if (mouthCounter > 3000)mouthCounter= 0;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    handleFace();
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.strokeText("next", canvas.width / 2, 100, 200 );
    requestAnimationFrame(animate);
}

// RUN__________________________________________________________________________________________________________________
animate();