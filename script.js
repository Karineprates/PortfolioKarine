// Scroll suave ao clicar nos links do nav
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

// Função genérica para abrir links em nova janela
function abreJanela(url) {
  const largura = screen.width;
  const altura = screen.height;

  window.open(
    url,
    '_blank',
    `width=${largura},height=${altura},left=0,top=0`
  );
}

// Funções específicas (se quiser manter nomes separados)
function abreJanelaOne() {
  abreJanela('https://github.com/Karineprates/blog-gatos');
}
function abreJanelaTwo() {
  abreJanela('https://github.com/Karineprates/DesafioGitFavorites');
}
function abreJanelaThree() {
  abreJanela('https://github.com/Karineprates/Front-end-rocketnotes');
}
function abreJanelaFour() {
  abreJanela('https://github.com/Karineprates/To-do-list');
}

const form = document.getElementById('forms');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'   // ✅ não use Content-Type aqui
      }
    });

    if (response.ok) {
      alert('✅ Mensagem enviada com sucesso!');
      form.reset();
    } else {
      const data = await response.json();
      console.error('Erro do Formspree:', data);
      alert('❌ Erro: ' + (data.error || 'Verifique os campos.'));
    }
  } catch (err) {
    console.error('Erro de rede:', err);
    alert('❌ Erro de rede ou CORS.');
  }
});



