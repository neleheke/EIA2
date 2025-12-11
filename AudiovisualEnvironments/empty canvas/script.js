/* Quelle: Norbert Schnell */

/* const titleContainer = document.getElementById('title-container'); ------wird nicht verwendet*/
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

/*************************************************************
 * canvas
 */
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    context.lineWidth = 3;


    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
        context.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;

        context.beginPath(x, y);
        context.moveTo(x, y);
        context.arc(x, y, 50, 5 * Math.PI, 2 * Math.PI);
        context.lineTo(x, y);

        context.fill();
        context.stroke();
    }
}