// Tilt cube on mouse move
const cube = document.getElementById('cube');

let curX = -20, curY = 20;
let tarX = -20, tarY = 20;

document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const offSetX = (e.clientX / innerWidth - 0.5) * 3;
  const offSetY = (e.clientY / innerHeight - 0.5) * 3;

  tarX = -offSetY * 35 - 10;
  tarY = offSetX * 35 + 10;
});

// Spin the cube when scrolling on mobile
window.addEventListener('scroll', () => {
  if (window.innerWidth <= 800) {
    // Scroll distance affects the Y rotation (spinning horizontally)
    tarY = 20 + window.scrollY * 0.2;
    // Optionally add a slight X tilt depending on scroll
    tarX = -20 - window.scrollY * 0.025;
  }
});

function tick() {
  curX += (tarX - curX) * 0.05;
  curY += (tarY - curY) * 0.05;
  cube.style.transform = `rotateX(${curX}deg) rotateY(${curY}deg)`;
  requestAnimationFrame(tick);
}
tick();
