const canvas = document.querySelector("canvas");
const $ = canvas.getContext("2d");
const H = canvas.height;
const W = canvas.width;
const ball = {
    x: H / 2,
    y: W / 2,
    raduis: 10,
    speed: 20,
    color: "red",
    dx: 5,
    dy: 5,
}
const user = {
    x: 0,
    y: H / 2 - 100 / 2,
    h: 100,
    w: 10,
    color: "white",
    score: 0
}
const comp = {
    x: W - 10,
    y: H / 2 - 100 / 2,
    h: 100,
    w: 10,
    score: 0,
    color: "WHITE"
}
const net = {
        x: W / 2 - 2 / 2,
        y: 0,
        h: 2,
        w: 10,
        color: "WHITE",
    }
    //function draw rectangle//
function drawRect(x, y, w, h, color) {
    $.fillStyle = color;
    $.fillRect(x, y, w, h);
}
//function draw cercle//
function drawCercl(x, y, raduis, color) {
    $.fillStyle = color;
    $.beginPath();
    $.arc(x, y, raduis, 0, Math.PI * 2, false);
    $.closePath();
    $.fill();
}
//function drawText//
function drawText(x, y, color, text) {
    $.fillStyle = color;
    $.font = "'ril Fatface', cursive";
    $.fillText(text, x, y)
}
//function draw Net()//
function drawNet() {
    for (let i = 0; i < H; i += 15) {
        drawRect(net.x, net.y + i, net.h, net.w, net.color);
    }
}

function render() {
    //user paddel//
    drawRect(0, 0, W, H, "BLACK");
    drawRect(user.x, user.y, user.w, user.h, user.color);
    //com Paddel//
    drawRect(comp.x, comp.y, comp.w, comp.h, comp.color);
    //draw BALL//
    drawCercl(ball.x, ball.y, ball.raduis, ball.color);
    //draw net//
    drawNet();
    //draw User Score //
    drawText(H / 8, W / 5, user.color, ` Scour: ${user.score}`);
    //draw Comp score//
    drawText((2 * H) / 4, W / 5, "WHITE", ` Scour: ${comp.score}`);
}

function collision(b, p) {
    b.top = b.y - b.raduis;
    b.bottom = b.y + b.raduis;
    b.left = b.x - b.raduis;
    b.right = b.x + b.raduis;
    p.top = p.y;
    p.bottom = p.y + p.h;
    p.left = p.x;
    p.right = p.x + p.w;
    return (b.top < p.bottom && b.bottom > p.top && b.left < p.right && b.right > p.left)
}

function restBall() {
    ball.x = W / 2;
    ball.y = H / 2;
    ball.speed = 5;
    ball.dx *= -1;
}

function update() {
    //move conp paddel//

    //Move ball//
    ball.x += ball.dx;
    ball.y += ball.dy;
    let level = 0.01;
    if (user.score % 3 == 0) {
        if (level < 1) {

            level += 0.99;
        } else {
            level = 1;
        }
    }
    comp.y += (ball.y - (comp.y + comp.h / 2)) * level;

    if (ball.y + ball.raduis > H || ball.y - ball.raduis < 0) {
        ball.dy *= -1;
    }
    //x collision//
    let player = (ball.x < W / 2) ? user : comp;
    if (collision(ball, player)) {
        let pointColsion = ball.y - player.y - player.h / 2;
        pointColsion /= player.h / 2;
        let anglRed = (Math.PI / 4) * pointColsion;
        let direction = (ball.x < W / 2) ? 1 : -1;
        ball.dx = direction * ball.speed * Math.cos(anglRed);
        ball.dy = ball.speed * Math.sin(anglRed);
    }
    if (ball.x - ball.raduis < 0) {
        comp.score++;
        ball.speed += 0.3;
        restBall();
    } else if (ball.x + ball.raduis > W) {
        user.score++;
        ball.speed += 3;
        restBall();
    }



}

function game() {
    update();
    render();
}
game();
const framePerScond = 50;
setInterval(game, 1000 / framePerScond);
canvas.addEventListener("mousemove", movePaddel);

function movePaddel(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.h / 2;
}