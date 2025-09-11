const cube = document.getElementById('cube');
const cubeBg = document.querySelector('.cube-bg');

// Tilt cube on mouse move
let curX = 0, curY = 0;
let tarX = -20, tarY = 20; // target </angles>
document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const offSetX = (e.clientX / innerWidth - 0.5) * 2;
  const offSetY = (e.clientY / innerHeight - 0.5) * 2;

  tarX = -offSetY * 90;
  tarY = offSetX * 90;

});

function tick() {
  curX += (tarX - curX) * 0.05;
  curY += (tarY - curY) * 0.05;
  
  cube.style.transform = `rotateX(${curX}deg) rotateY(${curY}deg)`;
  requestAnimationFrame(tick);
}
tick()
// Blur cube and reveal tab section on scroll
const tabsSection = document.getElementById('tabs-section');
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const blur = Math.min(32, s / 3);
  cubeBg.style.filter = `blur(${blur}px)`;
  // Optionally, could add fade-in for tabs-section if desired
});

// On load, reset cube

// Tab switching logic
const tabSwitcher = document.getElementById('tab-switcher');
const tabBtns = tabSwitcher.querySelectorAll('.tab-btn');
const tabIndicator = tabSwitcher.querySelector('.tab-indicator');
const tabContents = {
  experience: document.getElementById('tab-experience'),
  projects: document.getElementById('tab-projects'),
};
function switchTab(name) {
  tabBtns.forEach((btn, idx) => {
    const isActive = btn.dataset.tab === name;
    btn.classList.toggle('active', isActive);
    if(isActive) {
      tabIndicator.style.left = `${idx * 50}%`;
    }
  });
  Object.entries(tabContents).forEach(([tab, el]) => {
    el.classList.toggle('visible', tab === name);
  });
}
tabSwitcher.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if(!btn) return;
  switchTab(btn.dataset.tab);
});
// Set indicator width on load
window.addEventListener('DOMContentLoaded', () => {
  tabIndicator.style.width = '50%';
  switchTab('experience');
});

(function () {
  const prompt = document.getElementById('scroll-prompt');
  const socials = document.querySelector(".socials");
  if (!prompt) return;

  // Where to scroll to (first try the section, else the whole .content wrapper)
  const target = document.querySelector('#tabs-section') || document.querySelector('.content');

  prompt.addEventListener('click', () => {
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Hide after the user has scrolled a bit; show when back at the top
  const toggle = () => {
    if (window.scrollY > window.innerHeight * 0.25) {
      prompt.classList.add('is-hidden');
      socials.classList.add("is-hidden")

    } else {
      prompt.classList.remove('is-hidden');
      socials.classList.remove('is-hidden');
    }
  };
  toggle();

  
  window.addEventListener('scroll', toggle, { passive: true });
})();
