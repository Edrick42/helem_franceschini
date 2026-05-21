(function () {
  'use strict';

  var CLARITY_ID = 'wuj29hnv44';
  var STORAGE_KEY = 'hf_cookie_consent';
  var isPT = (document.documentElement.lang || 'pt').toLowerCase().indexOf('pt') === 0;

  var copy = isPT ? {
    message: 'Usamos cookies e ferramentas de análise (Microsoft Clarity) para entender como você navega no site e melhorar sua experiência. Nenhum dado é compartilhado para fins de marketing.',
    accept: 'Aceitar',
    reject: 'Recusar',
    policy: 'Política de Privacidade',
    policyHref: '/privacidade.html',
    aria: 'Aviso de uso de cookies'
  } : {
    message: 'We use cookies and analytics tools (Microsoft Clarity) to understand how you navigate the site and improve your experience. No data is shared for marketing purposes.',
    accept: 'Accept',
    reject: 'Decline',
    policy: 'Privacy Policy',
    policyHref: '/en/privacy.html',
    aria: 'Cookie notice'
  };

  function readConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function writeConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* storage blocked */ }
  }

  function loadClarity() {
    if (window.clarity) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', copy.aria);
    banner.setAttribute('aria-live', 'polite');

    var inner = document.createElement('div');
    inner.className = 'cookie-banner-inner';

    var text = document.createElement('p');
    text.className = 'cookie-banner-text';
    text.innerHTML = copy.message + ' <a href="' + copy.policyHref + '" class="cookie-banner-link">' + copy.policy + '</a>.';

    var actions = document.createElement('div');
    actions.className = 'cookie-banner-actions';

    var rejectBtn = document.createElement('button');
    rejectBtn.type = 'button';
    rejectBtn.className = 'cookie-banner-btn cookie-banner-btn-secondary';
    rejectBtn.textContent = copy.reject;
    rejectBtn.addEventListener('click', function () {
      writeConsent('rejected');
      hideBanner(banner);
    });

    var acceptBtn = document.createElement('button');
    acceptBtn.type = 'button';
    acceptBtn.className = 'cookie-banner-btn cookie-banner-btn-primary';
    acceptBtn.textContent = copy.accept;
    acceptBtn.addEventListener('click', function () {
      writeConsent('accepted');
      loadClarity();
      hideBanner(banner);
    });

    actions.appendChild(rejectBtn);
    actions.appendChild(acceptBtn);
    inner.appendChild(text);
    inner.appendChild(actions);
    banner.appendChild(inner);
    return banner;
  }

  function hideBanner(banner) {
    banner.classList.add('cookie-banner-hidden');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 300);
  }

  function init() {
    var consent = readConsent();
    if (consent === 'accepted') {
      loadClarity();
      return;
    }
    if (consent === 'rejected') {
      return;
    }
    var banner = buildBanner();
    document.body.appendChild(banner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
