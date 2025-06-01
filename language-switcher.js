/**
 * 다국어 지원 스크립트
 * 한국어/일본어 언어 전환 기능을 모든 페이지에서 공통으로 사용합니다.
 */

// 현재 언어 상태 가져오기
function getLang() {
  const lang = localStorage.getItem('siteLang');
  return lang === 'ko' ? 'ko' : 'ja';  // 저장된 값이 'ko'가 아니면 무조건 'ja'
}

// 요소의 텍스트를 현재 언어로 변경
function updateElementText(el, lang) {
  if (el.hasAttribute('data-ja') && el.hasAttribute('data-ko')) {
    const text = el.getAttribute(lang === 'ko' ? 'data-ko' : 'data-ja');
    if (el.tagName.toLowerCase() === 'title') {
      el.textContent = text;
    } else {
      // 아이콘이 있는 경우 보존
      const icon = el.querySelector('i');
      el.textContent = '';
      if (icon) el.appendChild(icon.cloneNode(true));
      el.appendChild(document.createTextNode(text));
    }
  }
}

// 언어 설정 변경 및 페이지 요소에 적용
function setLang(lang) {
  // 입력값 검증
  if (lang !== 'ko' && lang !== 'ja') lang = 'ja';
  
  // 언어 설정 저장
  localStorage.setItem('siteLang', lang);
  document.documentElement.lang = lang;
  
  // UI 업데이트
  const toggle = document.getElementById('language-toggle');
  if (toggle) toggle.checked = (lang === 'ko');
  
  const label = document.getElementById('current-lang');
  if (label) label.textContent = (lang === 'ko' ? '한국어' : '日本語');
  
  // 모든 다국어 요소 처리
  document.querySelectorAll('[data-ja][data-ko]').forEach(el => {
    updateElementText(el, lang);
  });
}

// 초기화 함수
function initLanguage() {
  const toggle = document.getElementById('language-toggle');
  if (toggle) {
    const currentLang = getLang();
    toggle.checked = (currentLang === 'ko');
    
    // 토글 변경 이벤트
    toggle.addEventListener('change', function(e) {
      const newLang = e.target.checked ? 'ko' : 'ja';
      setLang(newLang);
      location.reload(); // 페이지 새로고침
    });
  }
  
  // 현재 언어로 페이지 초기화
  setLang(getLang());
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', initLanguage);
