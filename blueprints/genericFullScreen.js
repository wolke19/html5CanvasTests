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


// INIT_________________________________________________________________________________________________________________
function init(){
//     TODO: init
}


// ANIMATION____________________________________________________________________________________________________________
function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // TODO : call update / draw functions
    requestAnimationFrame(animate);
}

// RUN__________________________________________________________________________________________________________________
init();
animate();