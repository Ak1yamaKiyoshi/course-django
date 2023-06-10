const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")


let sphere = {
    x:50,
    y:50,
    radius:20,
    speedMultiplier: 2,
    speedUpMultiplier: 3,
    speedDownMultiplier: 0.5,
}


function drawSphere() {
    ctx.beginPath();
    ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI*2)
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSphere();
    diagonalSpeed = 0.707 * sphere.speedMultiplier

    let hspeed = (keys[68]|0) - (keys[65]|0);   // -1 0 1
    let vspeed = (keys[83]|0) - (keys[87]|0);   // -1 0 1

    let speedUp = 1;
    if (keys[16] ) speedUp = sphere.speedUpMultiplier;
    if (keys[32] ) speedUp = sphere.speedDownMultiplier;

    // diagonal motion 
    if (vspeed != 0 && hspeed != 0) {  
        hspeed *= diagonalSpeed * speedUp;
        vspeed *= diagonalSpeed * speedUp;
    } else { // normal motion 
        hspeed *= sphere.speedMultiplier * speedUp;
        vspeed *= sphere.speedMultiplier * speedUp;
    }

    // if not eascaping borders add speed
    if (sphere.x + hspeed > 0 + sphere.radius && sphere.x + hspeed < canvas.width - sphere.radius)
        sphere.x += hspeed 
    if (sphere.y + vspeed > 0 + sphere.radius && sphere.y + vspeed < canvas.height - sphere.radius)
        sphere.y += vspeed

    // next frame 
    requestAnimationFrame(update);
}

let keys = {};
document.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
    console.log(e.keyCode)
});
document.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
});

update();
