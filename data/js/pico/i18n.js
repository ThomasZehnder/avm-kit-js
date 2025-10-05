// Sprachliste
const languages = ['en', 'de', 'kr'];
let currentIndex = 0;

const button = document.getElementById('lang-button');
const dialog = document.getElementById('lang-dialog');
const dialogImg = dialog.querySelector('img');

// Globale Funktion zum Wechseln der Sprache
async function changeLanguage(lang) {
  try {
    const response = await fetch(`i18n/${lang}.json`);
    if (!response.ok) throw new Error('Language file not found');
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) el.textContent = translations[key];
      else {
        console.warn(`Translation for key "${key}" not found in ${lang}.json`);
        el.textContent = `!![${key}]??`;
      }
    });

    // Flagge im Overlay-Dialog anzeigen
    dialogImg.src = `images/flags/${lang}.svg`;
    dialog.style.opacity = 1;

    // Nach 1 Sekunde ausblenden
    setTimeout(() => {
      dialog.style.opacity = 0;
    }, 1000);

    // LocalStorage speichern
    localStorage.setItem('language', lang);
  } catch (err) {
    console.error('Error loading language:', err);
  }
}

// Button Klick -> nächste Sprache
button.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % languages.length;
  const lang = languages[currentIndex];
  changeLanguage(lang);
});

// Initiale Sprache aus LocalStorage oder Standard
const savedLang = localStorage.getItem('language') || 'en';
currentIndex = languages.indexOf(savedLang) >= 0 ? languages.indexOf(savedLang) : 0;
changeLanguage(savedLang);
