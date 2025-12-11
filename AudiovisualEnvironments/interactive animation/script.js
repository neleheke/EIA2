const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const minRadius = 10;
const maxRadius = 100;
const maxVelo = 500; //pixel per second

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

canvas.addEventListener('pointerdown', onPointerDown);
canvas.addEventListener('pointermove', onPointerMove);
canvas.addEventListener('pointerup', onPointerUp);
canvas.addEventListener('pointercancel', onPointerUp);
canvas.addEventListener('pointerout', onPointerUp);

requestAnimationFrame(onAnimationFrame);

/*************************************************************
 * pointer events
 */
let balls = new Map();

function onPointerDown(e) {
  const id = e.pointerId;
  const t = 0.001 * performance.now();
  const x = e.clientX;
  const y = e.clientY;



  const ball = {
    id: id,
    x: x,
    y: y,
    t: t,
    v: 0,
    vX: 0,
    vY: 0,
    held: true,
  }

  balls.add(id, ball);
}

function onPointerMove(e) {
  const ball = ball.get(e.pointerId);

  if (ball) {
    const t = 0.001 * performance.now();
    const x = e.clientX;
    const y = e.clientY;
    const dX = x - pointer.x;
    const dY = y - pointer.y;
    const dT = t - pointer.t;
    const vX = dX / dT;
    const vY = dY / dT;
    const v = Math.sqrt(vX * vX + vY * vY);

    console.log("pointer move:", x, y)

    ball.t = t;
    ball.x = x;
    ball.y = y;
    ball.vX = vX;
    ball.vY = vY;
    ball.v = v;
  }
}

function onPointerUp(e) {
const ball = ball.get(e.pointerId)

  if (ball !== null) {
    pointer.down = false;

    console.log("pointer up")
  }
}

/*************************************************************
 * canvas
 */
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onAnimationFrame() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let [id, ball] of balls) {
    const x = ball.x;
    const y = ball.y;

    if (!balls.held) {
      const t = 0.001 * performance.now();
      const dT = t - pointer.t;
      let moveX = x + pointer.vX * dT;
      let moveY = y + pointer.vY * dT;
      let vX = ball.vX;
      let vY = pointer.vY;

      if (moveX > canvas.width) {
        moveX = 2 * canvas.width - moveX;
        vX = -vX;
      } else if (moveX < 0) {
        moveX = -moveX;
        vX = -vX;
      }


      if (moveY > canvas.height) {
        moveY = 2 * canvas.height - moveY;
        vY = -vY;        
      } else if (moveY < 0) {
        moveY = -moveY;
        vY = -vY;
      }

      vY = vY * 0.98;
      vX = vX * 0.98;


      pointer.x = moveX;
      pointer.y = moveY;
      pointer.vX = vX;
      pointer.vY = vY;
      pointer.t = t;

      
    }

    const vFaktor = pointer.v / maxVelo;
    const radius = minRadius + (maxRadius - minRadius) * vFaktor;

    context.globalAlpha = 0.666;
    context.fillStyle = "purple";
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  }

  requestAnimationFrame(onAnimationFrame);
}