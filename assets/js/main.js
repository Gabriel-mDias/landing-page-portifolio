(function () {
  'use strict';

  var cfg = window.GEMS_CONFIG || {};
  var root = document.documentElement;

  /* ------------------------------------------------------------- tema -- */

  var themeBtn = document.getElementById('theme-toggle');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function paintToggle() {
    var dark = currentTheme() === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.querySelector('.iconbtn__label').textContent =
      dark ? 'Voltar ao tema claro' : 'Usar tema escuro';
  }

  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('gems-theme', next); } catch (e) {}
    paintToggle();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paintToggle);
  paintToggle();

  /* ------------------------------------- cabeçalho ganha peso ao rolar -- */

  var topbar = document.getElementById('topbar');

  function markStuck() {
    topbar.classList.toggle('is-stuck', window.scrollY > 12);
  }

  window.addEventListener('scroll', markStuck, { passive: true });
  markStuck();

  /* -------------------------------------------------- menu em telefones -- */

  var navBtn = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    nav.removeAttribute('data-open');
    navBtn.setAttribute('aria-expanded', 'false');
  }

  navBtn.addEventListener('click', function () {
    var open = nav.getAttribute('data-open') === 'true';
    if (open) { closeNav(); return; }
    nav.setAttribute('data-open', 'true');
    navBtn.setAttribute('aria-expanded', 'true');
  });

  nav.addEventListener('click', function (ev) {
    if (ev.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
      closeNav();
      navBtn.focus();
    }
  });

  /* --------------------------------------------------- vitrine do hero -- */

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function selectTab(tab, moveFocus) {
    tabs.forEach(function (other) {
      var on = other === tab;
      other.setAttribute('aria-selected', String(on));
      other.tabIndex = on ? 0 : -1;
      document.getElementById(other.getAttribute('aria-controls')).hidden = !on;
    });
    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (ev) {
      var to = null;
      if (ev.key === 'ArrowRight') to = tabs[(i + 1) % tabs.length];
      else if (ev.key === 'ArrowLeft') to = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (ev.key === 'Home') to = tabs[0];
      else if (ev.key === 'End') to = tabs[tabs.length - 1];
      if (!to) return;
      ev.preventDefault();
      selectTab(to, true);
    });
  });

  /* ------------------------------------ revelação dos blocos de demonstração --
     Restrita às telas da seção "Como fica na prática": ali o movimento é a
     própria explicação (a linha de transmissão sendo traçada, a barra de
     progresso enchendo), não enfeite. */

  var demos = document.querySelectorAll('.reveal');

  if (!window.IntersectionObserver ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    demos.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        watcher.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .2 });

    demos.forEach(function (el) { watcher.observe(el); });
  }

  /* ------------------------------------------- contatos vindos do config -- */

  if (cfg.whatsapp) {
    var wa = 'https://wa.me/' + cfg.whatsapp +
      '?text=' + encodeURIComponent(cfg.whatsappMessage || '');
    document.querySelectorAll('[data-contact="whatsapp"]').forEach(function (el) {
      el.href = wa;
    });
  }
  if (cfg.whatsappLabel) {
    document.querySelectorAll('[data-contact="whatsapp-label"]').forEach(function (el) {
      el.textContent = cfg.whatsappLabel;
    });
  }
  if (cfg.email) {
    document.querySelectorAll('[data-contact="email"]').forEach(function (el) {
      el.href = 'mailto:' + cfg.email + '?subject=' +
        encodeURIComponent('Contato pelo site da G&Ms');
    });
    document.querySelectorAll('[data-contact="email-label"]').forEach(function (el) {
      el.textContent = cfg.email;
    });
  }

  document.getElementById('year').textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------- formulário -- */

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var submit = document.getElementById('form-submit');

  function say(text, state) {
    status.textContent = text;
    if (state) status.setAttribute('data-state', state);
    else status.removeAttribute('data-state');
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    if (!form.checkValidity()) { form.reportValidity(); return; }

    if (!cfg.web3formsKey) {
      say('O envio pelo formulário ainda não está ativo. Me chame no WhatsApp ou em ' +
          (cfg.email || 'gemstecnologia@gmail.com') + ' que eu respondo hoje mesmo.', 'err');
      return;
    }

    var data = Object.fromEntries(new FormData(form).entries());
    data.access_key = cfg.web3formsKey;
    data.subject = 'Site da G&Ms — contato de ' + (data.nome || 'visitante');
    data.from_name = 'Site G&Ms';

    submit.disabled = true;
    say('Enviando…');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json(); })
      .then(function (out) {
        if (!out.success) throw new Error(out.message || 'falha no envio');
        form.reset();
        say('Recebi a sua mensagem. Respondo em até um dia útil.', 'ok');
      })
      .catch(function () {
        say('Não consegui enviar agora. Tente de novo ou me chame no WhatsApp.', 'err');
      })
      .then(function () { submit.disabled = false; });
  });
})();
