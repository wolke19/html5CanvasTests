const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

addEventListener("click", function (event){
    if (event.x > canvas.width/2 - 50 &&
        event.x < canvas.width/2 + 50 &&
        event.y > 50 &&
        event.y < 100){
        // TODO window.location = "https://wolke19.github.io/html5CanvasTests";
    }
})


// INIT_________________________________________________________________________________________________________________
function init(){
//     TODO: init
}


// ANIMATION____________________________________________________________________________________________________________
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // TODO : call update / draw functions
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.strokeText("next", canvas.width / 2, 100, 200 );
    requestAnimationFrame(animate);
}

// RUN__________________________________________________________________________________________________________________
init();
animate();