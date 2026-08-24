// State Management
let currentLang = localStorage.getItem('ufkana_lang') || 'tr';
let currentTab = 'privacy';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Check URL parameters for direct linking
  const urlParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace('#', '');
  
  if (urlParams.get('lang') === 'en' || urlParams.get('lang') === 'tr') {
    currentLang = urlParams.get('lang');
  }
  
  if (hash === 'terms' || urlParams.get('tab') === 'terms') {
    currentTab = 'terms';
  } else if (hash === 'privacy' || urlParams.get('tab') === 'privacy') {
    currentTab = 'privacy';
  }

  setLanguage(currentLang);
  setTab(currentTab);

  // Setup Event Listeners
  document.getElementById('btn-tr').addEventListener('click', () => setLanguage('tr'));
  document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));

  document.getElementById('tab-btn-privacy').addEventListener('click', () => setTab('privacy'));
  document.getElementById('tab-btn-terms').addEventListener('click', () => setTab('terms'));
});

// Set Language Function
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ufkana_lang', lang);

  // Update Language Button States
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Toggle Visibility of Language-Specific Elements
  document.querySelectorAll('[data-lang-tr]').forEach(el => {
    if (lang === 'tr') {
      el.style.display = el.dataset.display || '';
    } else {
      el.style.display = 'none';
    }
  });

  document.querySelectorAll('[data-lang-en]').forEach(el => {
    if (lang === 'en') {
      el.style.display = el.dataset.display || '';
    } else {
      el.style.display = 'none';
    }
  });

  // Update Document Title & Meta Lang
  document.documentElement.lang = lang;
  if (lang === 'tr') {
    document.title = 'Ufkana — Akıllı Araç Asistanınız';
  } else {
    document.title = 'Ufkana — Your Smart Vehicle Assistant';
  }
}

// Set Tab Function
function setTab(tab) {
  currentTab = tab;
  
  // Update Tab Buttons
  document.getElementById('tab-btn-privacy').classList.toggle('active', tab === 'privacy');
  document.getElementById('tab-btn-terms').classList.toggle('active', tab === 'terms');

  // Update Tab Content Panels
  document.getElementById('content-privacy').classList.toggle('active', tab === 'privacy');
  document.getElementById('content-terms').classList.toggle('active', tab === 'terms');

  // Update URL Hash without reload
  history.replaceState(null, null, `#${tab}`);
}
