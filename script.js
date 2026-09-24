(() => {
  const saved = localStorage.getItem('mizan-site-language');
  const preferred = saved || (navigator.language.startsWith('ar') ? 'ar' : 'en');

  function applyLanguage(language) {
    const lang = language === 'en' ? 'en' : 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-lang]').forEach((element) => {
      element.hidden = element.dataset.lang !== lang;
    });
    document.querySelectorAll('[data-language-toggle]').forEach((button) => {
      button.textContent = lang === 'ar' ? 'English' : 'العربية';
      button.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });
    localStorage.setItem('mizan-site-language', lang);
  }

  document.querySelectorAll('[data-language-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar');
    });
  });
  applyLanguage(preferred);
})();
