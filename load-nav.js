document.addEventListener('DOMContentLoaded', function() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const NAV_SCROLL_POS_KEY = 'navScrollPos'; // localStorage 키

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
        
        const navMenuElement = navPlaceholder.querySelector('.nav-menu');

        if (navMenuElement) {
          // 1. 저장된 스크롤 위치 적용
          const storedScrollPos = localStorage.getItem(NAV_SCROLL_POS_KEY);
          if (storedScrollPos !== null) {
            navMenuElement.scrollLeft = parseInt(storedScrollPos, 10);
          }

          // 2. 스크롤 시 위치 저장하는 이벤트 리스너 추가
          navMenuElement.addEventListener('scroll', () => {
            localStorage.setItem(NAV_SCROLL_POS_KEY, navMenuElement.scrollLeft);
          });
        }

        // After loading the nav, re-initialize the language switcher
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
