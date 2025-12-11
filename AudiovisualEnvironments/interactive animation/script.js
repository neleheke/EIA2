const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const circleRadius = 40;

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

canvas.addEventListener('pointerdown', onPointerDown);
canvas.addEventListener('pointermove', onPointerMove);
canvas.addEventListener('pointerup', onPointerUp);
canvas.addEventListener('pointercancel', onPointerUp);
// canvas.addEventListener('pointerout', onPointerUp);

requestAnimationFrame(onAnimationFrame);

/*************************************************************
 * pointer events
 */
let pointer = null;

function onPointerDown(e) {
  if (pointer === null) {
    const id = e.pointerId;
    const x = e.clientX / canvas.width;
    const y = e.clientY / canvas.height;

    pointer = {
      id: id,
      x: x,
      y: y,
    }
  }
}

function onPointerMove(e) {
  if (pointer !== null && pointer.id === e.pointerId) {
    pointer.x = e.clientX / canvas.width;
    pointer.y = e.clientY / canvas.height;
  }
}

function onPointerUp(e) {
  if (pointer !== null && e.pointerId === pointer.id) {
    pointer = null;
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

  if (pointer !== null) {
    const x = canvas.width * pointer.x
    const y = canvas.height * pointer.y

    context.globalAlpha = 0.666;
    context.fillStyle = '#f00';
    context.beginPath();
    context.arc(x, y, circleRadius, 0, 2 * Math.PI);
    context.fill();
  }

  requestAnimationFrame(onAnimationFrame);
}