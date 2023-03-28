const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let radius = 55;
const junctionArray = [];
let animationState = 0;
const joinpartners = {
    p: null,
    q: null,
}
ctx.textAlign = "center";

const textfieldW = 200;
const textfieldH = 100;
const textfieldX = canvas.width / 2 - textfieldW / 2;
const textfieldY = canvas.height - textfieldH * 1.5;

const mouse = {
    x: null,
    y: null,
}

// EVENTS_______________________________________________________________________________________________________________
addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
addEventListener("click", function (event){

    if (event.x > canvas.width * 0.15 - 100 &&
        event.x < canvas.width * 0.15 + 100 &&
        event.y > canvas.height - 150 &&
        event.y < canvas.height - 100) {
        window.location = "https://wolke19.github.io/html5CanvasTests";
    }




    switch (animationState){
        case 0: {
            if (event.x > newUnionBox.x &&
                event.x < newUnionBox.x + newUnionBox.width &&
                event.y > newUnionBox.y &&
                event.y < newUnionBox.y + newUnionBox.height){
                animationState = 1;
            }
            else {
                animationState = 0;
            }
            break;
        }
        case 1: {
            for (let i = 0; i < junctionArray.length; i++) {
                if (event.x > junctionArray[i].x - radius &&
                    event.x < junctionArray[i].x + radius &&
                    event.y > junctionArray[i].y - radius &&
                    event.y < junctionArray[i].y + radius){
                    if (joinpartners.p === null) {
                        joinpartners.p = junctionArray[i].number;
                        inputAlert.draw("second join partner?");
                    }
                    else if (joinpartners.q === null) {
                        joinpartners.q = junctionArray[i].number;
                    }
                }
            }
            break;
        }
        case 2: {
            if (event.x > canvas.width/2 - 170 &&
                event.y > canvas.height/2 + 80 &&
                event.x < canvas.width/2 - 20 &&
                event.y < canvas.height/2 + 150) {
                union(joinpartners.p, joinpartners.q);
            }
            joinpartners.p = null;
            joinpartners.q = null;
            animationState = 0;
            break;
        }
    }
})

addEventListener("mousemove", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("keypress", function (event){
    switch (animationState) {
        case 0:{
            if (event.key === "Enter"){
                animationState = 1;
            }
            break;
        }
        case 1:{
            if (joinpartners.p === null) {
                joinpartners.p = event.key;
                inputAlert.draw("second join partner?");
            }
            else if (joinpartners.q === null) {
                joinpartners.q = event.key;
            }
            else break;
        }
        case 2:{
            if (event.key === "Enter"){
                union(joinpartners.p, joinpartners.q);
                joinpartners.p = null;
                joinpartners.q = null;
                animationState = 0;
            }
            break;
        }
    }
})


// CLASSES______________________________________________________________________________________________________________
class Junction {
    constructor(number) {
        this.number = number;
        this.parent = number;
        this.size = 1;

        this.x = 150 + (Math.random() * (canvas.width - 300));
        this.y = 150 + (Math.random() * (canvas.height - 400));
        this.radius = radius;
        this.speedX = .1;
        this.speedY = .1;
    }
    update() {
        let closePushParameter = 10;
        let pullEdgesParameter = 100;
        let pushAllParameter = 600;

        this.speedX /= 1.006;
        this.speedY /= 1.006;

        for (let i = 0; i < junctionArray.length; i++) {
            if (i === this.number) continue;
            const dx = junctionArray[i].x - this.x;
            const dy = junctionArray[i].y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.radius * 1.5){
                this.speedX -= dx / (closePushParameter * distance);
                this.speedY -= dy / (closePushParameter * distance);
            }
            else if (connected(this.number, i) && distance >= this.radius * 5) {
                this.speedX += dx / (pullEdgesParameter * distance);
                this.speedY += dy / (pullEdgesParameter * distance);
            }
            else if (distance < this.radius * 8){
                this.speedX -= dx / (pushAllParameter * distance);
                this.speedY -= dy / (pushAllParameter * distance);
            }
        }

        // Rebound from walls
        if (this.x < 100 || this.x > canvas.width - 100) this.speedX *= -1;
        if (this.y < 100 || this.y > canvas.height - (canvas.height - textfieldY + 100)) this.speedY *= -1;

        this.x += this.speedX;
        this.y += this.speedY;
    }
    drawEdges(){
        ctx.moveTo(this.x, this.y);
        if (this.parent !== this.number){
            ctx.lineTo(junctionArray[this.parent].x, junctionArray[this.parent].y);
            ctx.stroke();
        }
    }
    draw(){
        let color = "hsl(" + 150 + (find(this.number) * 1000 ) + ", 100%, 50%)";


        let grad = ctx.createRadialGradient(this.x,this.y,this.radius-10, this.x, this.y, this.radius);
        grad.addColorStop(0,color);
        grad.addColorStop(1,"darkslategrey");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();

        let gradSmall = ctx.createRadialGradient(this.x - this.radius/3,this.y -this.radius/3,0,
            this.x - this.radius/3,this.y -this.radius/3,this.radius/3);
        gradSmall.addColorStop(1, color);
        gradSmall.addColorStop(0, "hsl(" + 150 + (find(this.number) * 1000 ) + ", 100%, 60%)");
        ctx.fillStyle = gradSmall;
        ctx.beginPath();
        ctx.arc(this.x - this.radius/3,this.y -this.radius/3,this.radius/3,0,Math.PI*2);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Parent: " + this.parent + " | Size: " + this.size + " | Group: " + find(this.number),
            this.x, this.y - this.radius - 5, this.radius * 2.5);
        // ctx.fillText("group: " + find(this.number), this.x, this.y + this.radius + 12, this.radius);
        ctx.font = "50px Arial";
        ctx.fillText(this.number, this.x, this.y + 17, this.radius);



    }
}
class Textbox {
    constructor(x, y, w, h, textCol, font, fCol, bCol) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.fillColor = fCol;
        this.borderColor = bCol;
        this.textCol = textCol;
        this.font = font;
    }
    draw(text){
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.borderColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        if (text != null){
            this.text = text;
            ctx.font = this.font;
            ctx.fillStyle = this.textCol;
            ctx.fillText(this.text, this.x + this.width/2, this.y + this.height / 2, this.width);
        }
    }
}

// STANDALONE FUNCTIONS_________________________________________________________________________________________________________________
function find(p){
    let pTemp = p;
    while (pTemp !== junctionArray[pTemp].parent){
        pTemp = junctionArray[pTemp].parent;
    }
    return junctionArray[pTemp].number;
}
function connected(p, q){
    return (find(p) === find(q));
}
function union(p,q){
    let pRoot = find(junctionArray[p].number);
    let qRoot = find(junctionArray[q].number);

    if (pRoot === qRoot) return;
    else if (junctionArray[pRoot].size < junctionArray[qRoot].size){
        junctionArray[pRoot].parent = qRoot;
        junctionArray[qRoot].size += junctionArray[pRoot].size;
    }
    else{
        junctionArray[qRoot].parent = pRoot;
        junctionArray[pRoot].size += junctionArray[qRoot].size;
    }
}
function init() {
    for (let i = 0; i < 10; i++) {
        junctionArray.push(new Junction(i))
    }
}

let bigBox = new Textbox(textfieldX,textfieldY,textfieldW,textfieldH,null, null,"white","black");
let newUnionBox = new Textbox(textfieldX,textfieldY,textfieldW,textfieldH/2,
    "black","15px Arial", "grey","black");
let inputAlert = new Textbox(canvas.width/2 - 200, 0, 400, 90,
    "black", "35px Arial", "white", "black");
let textField = new Textbox(textfieldX, textfieldY + textfieldH/2, textfieldW,textfieldH/2,
    "black", "15px Arial","white","black");
let yesField = new Textbox(canvas.width/2 - 170, canvas.height/2 + 80, 150, 70,
    "black", "35px Arial", "white", "green");
let noField = new Textbox(canvas.width/2 + 20, canvas.height/2 + 80, 150, 70,
    "black", "35px Arial", "white", "red");
// let infoBox = new Textbox(0, canvas.height - 20, canvas.width, 20, "black",
//     "15px Arial", "white", "black");

// ANIMATION____________________________________________________________________________________________________________
function animate(){

    switch (animationState) {
        case 0: {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.font = "30px Arial";
            ctx.strokeStyle = "black";
            ctx.strokeText("NEXT", canvas.width * 0.15, canvas.height -100 , 200 );
            for (let i = 0; i < junctionArray.length; i++) {
                junctionArray[i].drawEdges();
            }
            for (let i = 0; i < junctionArray.length; i++) {
                junctionArray[i].update();
                junctionArray[i].draw();
            }
            bigBox.draw();
            newUnionBox.draw("NEW UNION (ENTER)");
            break;
        }
        case 1:{
            inputAlert.draw("first join partner?");
            newUnionBox.draw("NEW UNION");
            textField.draw("P: " + joinpartners.p + "  |  Q: " + joinpartners.q );
            if (joinpartners.p != null && joinpartners.q === null) inputAlert.draw("second join partner?");
            else if (joinpartners.p != null && joinpartners.q != null) {
                inputAlert.draw("Done! Compute?");
                animationState = 2;
            }
            break;
        }
        case 2:{
            yesField.draw("YES!");
            noField.draw("CANCEL")
            break;
        }
    }


    requestAnimationFrame(animate);
}

// RUN__________________________________________________________________________________________________________________
init();
animate();
