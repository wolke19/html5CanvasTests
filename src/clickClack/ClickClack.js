let w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),

    opts = {
        color: "white",
        ballPosY: h * 0.75,

        cx: w / 2,
        cy: h / 2,
    },

    tick = 0,
    balls = [],
    clack = new Audio("clack.wav");

ctx.fillStyle = "antiquewhite";

function animate(){
    ++tick;

    ctx.globalCompositeOperation = "source-over";
    // ctx.shadowBlur = 0;
    // ctx.fillStyle = "antiquewhite";
    // ctx.fillRect(0,0, w, h);
    ctx.clearRect(0,0,c.width, c.height);
    ctx.font = "30px Arial";
    ctx.strokeText("NEXT", c.width / 2, 100, 200 );
    handlePendel();
    requestAnimationFrame( animate );
}

class Ball{
    constructor(x, i) {
        this.ankerX = x;
        this.x = x;
        this.y = opts.ballPosY;
        this.velocity = 0.05;
        this.color = opts.color;
        this.radius = 0.025 * w;
        this.index = i;
        this.radians = 0;
    }


    updateBall(){
        // FRAGEN: Wieso kann ich nicht 0 mit += hinzufügen?
        this.radians += 1E-4 + this.velocity * Math.abs(Math.sin(this.radians));

        this.x = this.ankerX + (opts.ballPosY - h/3) * Math.cos(this.radians);
        this.y = h/3 + (opts.ballPosY - h/3) * Math.abs(Math.sin(this.radians));

        if (this.index === 0 && this.x > this.ankerX){
            this.x = this.ankerX;
            this.y = opts.ballPosY;
            // clack.play();
            // clack.loop = false;

        }
        if (this.index === 4 && this.x < this.ankerX){
            this.x = this.ankerX;
            this.y = opts.ballPosY;
        }

    }
    drawBall(){
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        let grd = ctx.createLinearGradient(this.ankerX, h/3,this.ankerX,this.y);
        grd.addColorStop(1.00, "grey");
        grd.addColorStop(0.00, "antiquewhite");
        ctx.strokeStyle = grd;
        ctx.moveTo(this.ankerX, h/3);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.strokeStyle = "black";
    }
}

function handlePendel(){
    balls[0].updateBall();
    balls[4].updateBall();

    for (let i = 0; i < balls.length; i++) {
        balls[i].drawBall();
    }


}

function init() {
    for (let i = 0; i < 5; i++) {
        balls.push(new Ball(((0.4 * w) + (0.05 * w * i)),i));
    }
}

addEventListener("click", function (event){
    if (event.x > c.width/2 - 50 &&
        event.x < c.width/2 + 50 &&
        event.y > 50 &&
        event.y < 100){
        window.location = "https://wolke19.github.io/html5CanvasTests";
    }
})

init();
animate();





