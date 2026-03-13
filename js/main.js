/* ═══════════════════════════════════════════════
   KANNA PERSONAL WEBSITE — main.js
   ═══════════════════════════════════════════════ */

/* ── Contact form feedback ──
   Formspree handles the actual submission.
   This just gives the user a nice confirmation message. */
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'SENDING...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        btn.textContent = 'SENT ✓';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      btn.textContent = 'ERROR — TRY AGAIN';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = originalText; }, 3000);
    }
  });
})();


/* ── Highlight active nav link based on current page ── */
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href === path) link.classList.add('active');
  });
})();


/* ── Lightbox for art images ──
   Click a .lightbox-trigger to view the full image in an overlay.
   Click the overlay or the × to close. */
(function () {
  const overlay = document.getElementById('lightbox');
  if (!overlay) return;

  const img = document.getElementById('lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-src');
      if (!src) return;
      img.src = src;
      img.alt = trigger.querySelector('img')?.alt || '';
      overlay.classList.add('active');
    });
  });

  function close() {
    overlay.classList.remove('active');
    img.src = '';
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();
