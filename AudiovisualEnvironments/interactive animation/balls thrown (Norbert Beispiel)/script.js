const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const pointers = new Map(); // map of pointers (each holding a ball)
const balls = new Set(); // set of balls drawn and animated
const ballRadius = 20;

// adapt canvas to window size
window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

// register pointer events (mouse clicks and multi-touch)
canvas.addEventListener('pointerdown', onPointerDown);
canvas.addEventListener('pointermove', onPointerMove);
canvas.addEventListener('pointerup', onPointerUp);
canvas.addEventListener('pointercancel', onPointerUp);
canvas.addEventListener('pointerout', onPointerUp);

// start animation frame
requestAnimationFrame(onAnimationFrame);

/*************************************************************
 * pointer events
 */
function onPointerDown(e) {
  const pointerId = e.pointerId;
  const t = 0.001 * performance.now(); // get current time in seconds
  const x = e.clientX;
  const y = e.clientY;
  const hue = Math.floor(Math.random() * 360); // generate random color

  // create new ball
  const ball = {
    t: t, // time
    x: x, // x coordinate
    y: y, // y coordinate
    vX: 0, // x velocity
    vY: 0, // y velocity
    hue: hue, // color
  };

  // keep pointer and for interaction and animation
  pointers.set(pointerId, ball); // register ball with pointer
  balls.add(ball); // register ball for graphics
}

function onPointerMove(e) {
  const ball = pointers.get(e.pointerId); // get ball by pointer id

  if (ball) {
    const t = 0.001 * performance.now(); // current time in seconds
    const x = e.clientX; // new x coordinate
    const y = e.clientY; // new y coordinate
    const dX = x - ball.x; // x motion
    const dY = y - ball.y; // y motion
    const dT = t - ball.t; // time since last position
    const vX = dX / dT; // x velocity
    const vY = dY / dT; // y velocity

    // move ball and keep velocity (and time)
    ball.t = t;
    ball.x = x;
    ball.y = y;
    ball.vX = vX;
    ball.vY = vY;
  }
}

function onPointerUp(e) {
  const ball = pointers.get(e.pointerId);

  if (ball) {
    // detach ball from pointer
    ball.pointerId = null;
    pointers.delete(e.pointerId);
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

  // iterate over all balls existing
  for (let ball of balls) {
    let x = ball.x;
    let y = ball.y;
    let vX = ball.vX;
    let vY = ball.vY;
    let alpha = 1; // opacity

    // animate balls that are not moved by a pointer
    if (ball.pointerId === null) {
      const t = 0.001 * performance.now(); // current time in seconds
      const dT = t - ball.t; // delta time since last position (frame)

      // animate ball position
      x += vX * dT;
      y += vY * dT;

      // bounce at cx limits (left and right of canvas)
      if (x < 0) {
        x = -x;
        vX = -vX;
      } else if (x > canvas.width) {
        x = 2 * canvas.width - x;
        vX = -vX;
      }

      // bounce at y limits (top and bottom of canvas)
      if (y < 0) {
        y = -y;
        vY = -vY;
      } else if (y > canvas.height) {
        y = 2 * canvas.height - y;
        vY = -vY;
      }

      // apply friction to velocity
      vX *= 0.995;
      vY *= 0.995;

      // calculate total velocity and apply to opacity
      const v = Math.sqrt(vX * vX + vY * vY);
      alpha = Math.min(1, 0.01 * v);

      // move ball or delete it if too slow
      if (v > 0.1) {
        ball.t = t;
        ball.x = x;
        ball.y = y;
        ball.vX = vX;
        ball.vY = vY;
      } else {
        balls.delete(ball);
      }
    }

    // draw ball
    const hue = ball.hue;
    context.globalAlpha = alpha;
    context.fillStyle = `hsl(${hue}, 100%, 33%)`;
    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    context.beginPath();
    context.arc(x, y, ballRadius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  }

  requestAnimationFrame(onAnimationFrame); // draw and animate again in next graphics frame
}

