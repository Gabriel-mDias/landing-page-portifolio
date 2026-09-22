/**
 * Módulo de Formulário de Contato e Injeção de Dados
 * Gerencia a integração com a Web3Forms e preenche dinamicamente os canais de contato.
 */

export function initContactForm(cfg = {}) {
  // Injeção de Contatos Dinâmicos vindos da configuração
  if (cfg.whatsapp) {
    document.querySelectorAll('[data-contact="whatsapp"]').forEach((el) => {
      const message = el.dataset.contactMessage || cfg.whatsappMessage || '';
      el.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message)}`;
    });
  }

  if (cfg.whatsappLabel) {
    document.querySelectorAll('[data-contact="whatsapp-label"]').forEach((el) => {
      el.textContent = cfg.whatsappLabel;
    });
  }

  if (cfg.email) {
    const mailUrl = `mailto:${cfg.email}?subject=${encodeURIComponent('Contato pelo site da G&Ms')}`;
    document.querySelectorAll('[data-contact="email"]').forEach((el) => {
      el.href = mailUrl;
    });
    document.querySelectorAll('[data-contact="email-label"]').forEach((el) => {
      el.textContent = cfg.email;
    });
  }

  const floatingWhatsapp = document.querySelector('.floating-whatsapp');
  const floatingObstructions = document.querySelectorAll('.contact, .foot');
  if (floatingWhatsapp && floatingObstructions.length && 'IntersectionObserver' in window) {
    const visibleObstructions = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visibleObstructions.add(entry.target) : visibleObstructions.delete(entry.target));
      floatingWhatsapp.classList.toggle('is-hidden', visibleObstructions.size > 0);
    });
    floatingObstructions.forEach((element) => observer.observe(element));
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Tratamento do Formulário
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit');

  if (!form || !statusEl || !submitBtn) return;

  function setStatus(text, state = null) {
    statusEl.textContent = text;
    if (state) {
      statusEl.setAttribute('data-state', state);
    } else {
      statusEl.removeAttribute('data-state');
    }
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!cfg.web3formsKey) {
      setStatus(
        `O envio direto pelo formulário requer configuração de chave. Por favor, me chame no WhatsApp ou em ${cfg.email || 'gemstecnologia@gmail.com'}.`,
        'err'
      );
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Se o campo honeypot estiver preenchido, é bot
    if (data.botcheck) {
      return;
    }

    data.access_key = cfg.web3formsKey;
    data.subject = `Site G&Ms — Contato de ${data.nome || 'Visitante'}`;
    data.from_name = 'Site G&Ms Soluções Tecnológicas';

    submitBtn.disabled = true;
    setStatus('Enviando mensagem…');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Falha no envio');
      }

      form.reset();
      setStatus('Recebemos sua mensagem! Responderemos em até 1 dia útil.', 'ok');
    } catch (err) {
      setStatus('Não foi possível enviar agora. Por favor, tente novamente ou nos chame no WhatsApp.', 'err');
    } finally {
      submitBtn.disabled = false;
    }
  });
}
