const cube = document.getElementById('cube');
const cubeBg = document.querySelector('.cube-bg');

// Tilt cube on mouse move
let curX = 0, curY = 0;
document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth - 0.5) * 2;
  const y = (e.clientY / innerHeight - 0.5) * 2;
  curX = curX * 0.7 + x * 0.3;
  curY = curY * 0.7 + y * 0.3;
  const rotX = -curY * 60;
  const rotY = curX * 60;
  cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
});

// Blur cube and reveal tab section on scroll
const tabsSection = document.getElementById('tabs-section');
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const blur = Math.min(32, s / 3);
  cubeBg.style.filter = `blur(${blur}px)`;
  // Optionally, could add fade-in for tabs-section if desired
});

// On load, reset cube
window.addEventListener('DOMContentLoaded', () => {
  cube.style.transform = `rotateX(-20deg) rotateY(20deg)`;
});

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
    } else {
      prompt.classList.remove('is-hidden');
    }
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
})();
