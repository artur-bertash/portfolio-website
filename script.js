const cube = document.getElementById('cube');
const cubeBg = document.querySelector('.cube-bg');
const tabs = document.getElementById('tabs');
const timelineSection = document.getElementById('timeline-section');

// Track mouse and tilt cube
let curX = 0, curY = 0;
document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth - 0.5) * 2;
  const y = (e.clientY / innerHeight - 0.5) * 2;
  // Smooth transition
  curX = curX * 0.85 + x * 0.15;
  curY = curY * 0.85 + y * 0.15;
  const rotX = -curY * 35;
  const rotY = curX * 35;
  cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
});

// Blur the cube as you scroll, reveal timeline and tabs
const revealTimeline = window.innerHeight * 0.30;
const revealTabs = window.innerHeight * 0.80;
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  // Blur increases from 0px to 32px
  const blur = Math.min(32, s / 3);
  cubeBg.style.filter = `blur(${blur}px)`;
  // Tabs fade in after scrolling enough
  if (s > revealTabs) {
    tabs.classList.add('visible');
  } else {
    tabs.classList.remove('visible');
  }
});

// On load, reset cube (in case first mousemove hasn't fired)
window.addEventListener('DOMContentLoaded', () => {
  cube.style.transform = `rotateX(-20deg) rotateY(20deg)`;
});