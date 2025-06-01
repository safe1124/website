/**
 * 다국어 지원 스크립트
 * 한국어/일본어 언어 전환 기능을 모든 페이지에서 공통으로 사용합니다.
 */

// 현재 언어 상태 가져오기
function getLang() {
  // localStorage에 저장된 값이 있으면 사용, 없으면 'ja' 기본값
  return localStorage.getItem('siteLang') === 'ko' ? 'ko' : 'ja';
}

// 언어 설정 변경 및 페이지 요소에 적용
function setLang(lang) {
  localStorage.setItem('siteLang', lang);
  document.documentElement.lang = lang;
  
  // 토글 버튼 상태 업데이트
  const toggle = document.getElementById('language-toggle');
  if (toggle) toggle.checked = (lang === 'ko');
  
  // 언어 라벨 업데이트
  const label = document.getElementById('current-lang');
  if (label) label.textContent = (lang === 'ko' ? '한국어' : '日本語');
  
  // 모든 다국어 요소 처리
  document.querySelectorAll('[data-ja][data-ko]').forEach(el => {
    el.textContent = el.getAttribute(lang === 'ko' ? 'data-ko' : 'data-ja');
  });
  
  // title 요소 처리
  var titleEl = document.querySelector('title[data-ja][data-ko]');
  if (titleEl) titleEl.textContent = titleEl.getAttribute(lang === 'ko' ? 'data-ko' : 'data-ja');
  
  // 소셜 미디어 버튼 텍스트 처리
  document.querySelectorAll('.social-button').forEach(el => {
    if (el.hasAttribute('data-ja') && el.hasAttribute('data-ko')) {
      // 아이콘은 유지하고 텍스트만 변경
      const icon = el.querySelector('i');
      el.textContent = '';
      if (icon) el.appendChild(icon.cloneNode(true));
      el.appendChild(document.createTextNode(' ' + el.getAttribute(lang === 'ko' ? 'data-ko' : 'data-ja')));
    }
  });
  
  // 언어 변경 후 페이지 새로고침
  location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
  // 토글 버튼 이벤트 설정
  const toggle = document.getElementById('language-toggle');
  if (toggle) {
    toggle.checked = (getLang() === 'ko');
    toggle.addEventListener('change', function() {
      setLang(toggle.checked ? 'ko' : 'ja');
    });
  }
  
  // 페이지 로드 시 언어 설정 즉시 적용
  setLang(getLang());
  
  // 링크 클릭 시 언어 설정 유지
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
      localStorage.setItem('siteLang', getLang());
    });
  });
});
