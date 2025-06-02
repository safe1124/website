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

          // 3. 네비게이션 링크 호버 효과 추가
          const navLinks = navMenuElement.querySelectorAll('a');
          navLinks.forEach(link => {
            // 마우스를 가져다 댔을 때
            link.addEventListener('mouseenter', function(e) {
              // 모든 링크에서 active 클래스 제거
              navLinks.forEach(l => l.classList.remove('active'));
              // 호버된 링크에 active 클래스 추가
              this.classList.add('active');
            });
            
            // 마우스가 벗어났을 때
            link.addEventListener('mouseleave', function(e) {
              // active 클래스 제거
              this.classList.remove('active');
            });
          });
        }

        // 네비게이션 메뉴 로드 후 언어 설정 재적용
        if (typeof setLang === 'function' && typeof getLang === 'function') {
          setLang(getLang());
        } else {
          console.warn('setLang or getLang function not found. Language for nav menu might not be updated.');
        }
      })
      .catch(error => {
        console.error('Error fetching navigation menu:', error);
        navPlaceholder.innerHTML = '<p>Error loading navigation menu.</p>';
      });
  }
});
