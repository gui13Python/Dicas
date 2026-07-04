/* =========================================================
   DICAS PRÁTICAS — main.js
   - Menu mobile
   - Botão "voltar ao topo"
   - Lazy-load dos slots de anúncio (Adcash) via IntersectionObserver
     -> só carrega o script do anúncio quando o bloco entra na tela,
        o que melhora Core Web Vitals (e páginas mais rápidas =
        melhor SEO e menos abandono de visitantes).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Botão voltar ao topo ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 480);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Lazy-load dos anúncios Adcash ---------- */
  const adSlots = document.querySelectorAll('[data-ad-slot]');

  if ('IntersectionObserver' in window && adSlots.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadAd(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });

    adSlots.forEach(slot => observer.observe(slot));
  } else {
    // Navegadores sem suporte: carrega tudo direto
    adSlots.forEach(loadAd);
  }

  function loadAd(slot) {
    const zoneId = slot.getAttribute('data-ad-slot');
    if (!zoneId || slot.dataset.loaded === 'true') return;
    slot.dataset.loaded = 'true';

    // Substitua este bloco pelo script de tag que o Adcash fornece
    // no painel para cada "zone id" (Anti-Adblock ou banner padrão).
    // Documentação: https://adcash.zendesk.com
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://your-cdn.adcash-provided-domain.example/tag/${zoneId}.js`;
    slot.innerHTML = '';
    slot.appendChild(script);
  }
});
