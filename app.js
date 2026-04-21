/* ============================================================
   app.js — Shared utilities for Nigeria 2027 Platform
   ============================================================ */

/* ── Active nav link ── */
(function highlightActiveNav() {
  const links = document.querySelectorAll('.nav-link, .bottom-nav-item');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && href.includes(current)) {
      link.classList.add('active');
    }
  });
})();

/* ── Mobile nav overlay ── */
const mobileOverlay = document.getElementById('mobileNavOverlay');
const mobilePanel   = document.getElementById('mobileNavPanel');

function openMobileNav() {
  if (!mobileOverlay || !mobilePanel) return;
  mobileOverlay.classList.add('open');
  mobilePanel.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  if (!mobileOverlay || !mobilePanel) return;
  mobileOverlay.classList.remove('open');
  mobilePanel.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('mobileNavToggle')?.addEventListener('click', openMobileNav);
mobileOverlay?.addEventListener('click', function(e) {
  if (e.target === mobileOverlay) closeMobileNav();
});

/* ── Countdown Engine ── */
function computeCountdown(targetDate) {
  const now = new Date();
  const ms  = targetDate - now;
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(ms / 864e5),
    hours:   Math.floor((ms % 864e5) / 36e5),
    minutes: Math.floor((ms % 36e5) / 6e4),
    seconds: Math.floor((ms % 6e4) / 1e3),
  };
}

function pad(n, digits = 2) {
  return String(n).padStart(digits, '0');
}

function renderCountdown(ids, targetDate) {
  const el = {
    days:    document.getElementById(ids.days),
    hours:   document.getElementById(ids.hours),
    minutes: document.getElementById(ids.minutes),
    seconds: document.getElementById(ids.seconds),
  };
  function tick() {
    const c = computeCountdown(targetDate);
    if (el.days)    el.days.textContent    = pad(c.days, 3);
    if (el.hours)   el.hours.textContent   = pad(c.hours);
    if (el.minutes) el.minutes.textContent = pad(c.minutes);
    if (el.seconds) el.seconds.textContent = pad(c.seconds);
  }
  tick();
  setInterval(tick, 1000);
}

/* Initialise if countdown elements present */
if (document.getElementById('cd1-days')) {
  renderCountdown(
    { days: 'cd1-days', hours: 'cd1-hours', minutes: 'cd1-minutes', seconds: 'cd1-seconds' },
    NG2027.ELECTIONS.presidential
  );
}
if (document.getElementById('cd2-days')) {
  renderCountdown(
    { days: 'cd2-days', hours: 'cd2-hours', minutes: 'cd2-minutes', seconds: 'cd2-seconds' },
    NG2027.ELECTIONS.governorship
  );
}

/* ── Shared sidebar HTML generator ── */
function buildSidebarNav(activePage) {
  const links = [
    { href: 'index.html',          icon: '⏱', label: 'Home & Countdown' },
    { href: 'geopolitical.html',   icon: '🗺', label: 'State Data Hub'   },
    { href: 'accountability.html', icon: '📉', label: 'Decade of Impact' },
    { href: 'parties.html',        icon: '🏛', label: 'Party Directory'  },
    { href: 'hub.html',            icon: '🗣', label: "Voters' Hub"      },
  ];
  return links.map(l =>
    `<a href="${l.href}" class="nav-link${activePage === l.href ? ' active' : ''}">
       <span class="nav-icon">${l.icon}</span>${l.label}
     </a>`
  ).join('');
}

/* ── Format helpers ── */
function fmtNaira(bn, digits = 1) {
  if (bn >= 1000) return '₦' + (bn / 1000).toFixed(digits) + 'tn';
  return '₦' + bn.toLocaleString('en-NG', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'bn';
}
function fmtPct(n) { return n.toFixed(1) + '%'; }
function fmtNum(n) { return n.toLocaleString(); }
