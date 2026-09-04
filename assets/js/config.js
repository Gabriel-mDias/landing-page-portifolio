/* Dados de contato e integrações da G&Ms.
   É o único arquivo que precisa mudar para trocar telefone, e-mail ou o
   formulário. Os mesmos valores já estão escritos no index.html como
   fallback, então a página continua correta mesmo sem JavaScript. */

window.GEMS_CONFIG = {
  /* Só dígitos, com código do país. Vira o link wa.me. */
  whatsapp: '5522999556956',
  whatsappLabel: '(22) 99955-6956',
  whatsappMessage: 'Olá, Gabriel. Vim pelo site da G&Ms e gostaria de conversar sobre um sistema sob medida.',

  email: 'gemstecnologia@gmail.com',

  /* Access key gratuita do https://web3forms.com — gerada com o e-mail acima.
     Enquanto estiver vazia, o formulário orienta o visitante a usar o
     WhatsApp ou o e-mail. */
  web3formsKey: ''
};
