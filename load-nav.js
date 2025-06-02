document.addEventListener('DOMContentLoaded', function() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    fetch('nav-menu.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
      })
      .then(data => {
        navPlaceholder.innerHTML = data;
        // After loading the nav, re-initialize the language switcher if it's part of the nav
        // or if its functionality depends on elements within the nav.
        // This is important because the language switcher script might run before the nav is loaded.
        if (typeof initializeLanguageSwitcher === 'function') {
          initializeLanguageSwitcher();
        }
      })
      .catch(error => {
        console.error('Error fetching navigation menu:', error);
        navPlaceholder.innerHTML = '<p>Error loading navigation menu.</p>';
      });
  }
});
