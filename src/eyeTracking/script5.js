const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.strokeStyle = "white";

let gameFrame = 0;
let mouthCounter = 0;
let sneakPeekCounter = 0;

const mouse = {
    x: null,
    y: null,
    oldX: null,
    oldY: null,
}


// EVENTS_______________________________________________________________________________________________________________
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

addEventListener("click", function (event){
})
canvas.addEventListener("mousemove", function (event){
    mouse.oldX = mouse.x;
    mouse.oldY = mouse.y;
    mouse.x = event.x;
    mouse.y = event.y;
})

addEventListener("click", function (event){
    if (event.x > canvas.width/2 - 50 &&
        event.x < canvas.width/2 + 50 &&
        event.y > 50 &&
        event.y < 100){
        window.location = "https://wolke19.github.io/html5CanvasTests/src/unionFindAlgorithm";
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

        this.distance = 5;
        this.awareness = 350;
        this.state = 0;

        this.eyeSlitWidth = 1;
        this.event = null;
    }

    update(){
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);

        this.pupilRadius = this.maxPupilRadius - 0.9*(this.maxPupilRadius * (this.distance / this.awareness));
        this.pupilX = this.x + (this.radius - this.pupilRadius) * .6 * (dx / this.awareness);
        this.pupilY = this.y + (this.radius - this.pupilRadius) * .6 * (dy / this.awareness);

        if (!this.event){
            if (this.distance < this.awareness) this.state = 1;
            else this.state = 0;
        }
        this.draw();
        console.log(this.event);
    }
    draw(){
        switch (this.state){
            case 0: {
                ctx.beginPath();
                ctx.moveTo(this.x - this.radius, this.y);
                ctx.lineTo(this.x + this.radius, this.y);
                ctx.stroke()
                break;
            }
            case 1: {
                ctx.beginPath();
                ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(this.pupilX, this.pupilY, this.pupilRadius, 0, Math.PI * 2);
                ctx.fill();
                break;
            }
            // case 2: {
            //     ctx.beginPath();
            //     ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
            //     ctx.stroke();
            //     for (let i = 0; i < this.radius / 3; i++) {
            //         ctx.beginPath();
            //         ctx.arc(this.pupilX, this.pupilY, this.pupilRadius - i, 0, Math.PI * 2);
            //         ctx.stroke();
            //     }
            //
            //     break;
        }
    }
}

class Face{
    constructor(x,y,r) {
        this.mouthState = 0;
        this.radius = r;
        this.x = x;
        this.y = y;
        this.mouthWidth = 40;
        this.mouthX = this.x - this.mouthWidth / 2;
        this.mouthY = this.y + this.radius/2;
        this.mouthOpenPx = 1;
        this.eyeL = new Eye(this.x - this.radius / 2.3, this.y - this.radius / 3, this.radius/3);
        this.eyeR = new Eye(this.x + this.radius / 2.3, this.y - this.radius / 3, this.radius/3);
    }
    update(){
        switch (this.mouthState){
            case 0: {
                this.mouthWidth = 40;
                this.mouthX = this.x - this.mouthWidth / 2;
                this.mouthY = this.y + this.radius / 2;
                this.mouthOpenPx = 1;
                break;
            }
            case 1: {
                this.mouthWidth = 10;
                this.mouthX = this.x - this.radius / 2;
                this.mouthY = this.y + this.radius / 1.9;
                this.mouthOpenPx = 1;
                break;
            }
            case 2: {
                this.mouthWidth = 20;
                this.mouthX = this.x + this.radius / 4;
                this.mouthY = this.y + this.radius / 1.7;
                this.mouthOpenPx = 1;
                break;
            }
        }

        this.eyeL.update();
        this.eyeR.update();
    }

    draw(){
        // HEAD
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.stroke();

        // MOUTH
        ctx.fillRect(this.mouthX , this.mouthY, this.mouthWidth, this.mouthOpenPx);
    }
}

// FUNCTIONS____________________________________________________________________________________________________________

const face = new Face(canvas.width/2, canvas.height/2, 100);

function handleFace(){
    face.update();
    face.draw();
}

function handleQuirks() {
    // MOUTH
    mouthCounter++;
    if (mouthCounter >= 1000 && mouthCounter < 1400) face.mouthState = 1;
    else if (mouthCounter >= 1400 && mouthCounter < 1600) face.mouthState = 2;
    else if (mouthCounter >= 1600) mouthCounter = 0;
    else face.mouthState = 0;

    // if (mouse.x > face.eyeL.x &&
    //     mouse.x < face.eyeR.x &&
    //     mouse.y > face.y - 2 * face.eyeR.radius &&
    //     mouse.y < face.y
    // ){
    //     face.eyeR.event = true;
    //     face.eyeL.event = true;
    //     face.eyeL.state = 2;
    //     face.eyeR.state = 2;
    // }
    // else {
    //     face.eyeR.event = false;
    //     face.eyeL.event = false;
    // }
}


// ANIMATION____________________________________________________________________________________________________________
function animate(){
    gameFrame++;
    ctx.clearRect(0,0,canvas.width, canvas.height);

    handleFace();
    handleQuirks()
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.strokeText("next", canvas.width / 2, 100, 200 );
    requestAnimationFrame(animate);
}

// RUN__________________________________________________________________________________________________________________
animate();