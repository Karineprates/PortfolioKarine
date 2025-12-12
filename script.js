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

const carousels = document.querySelectorAll('.projects-carousel, .languages-carousel');

carousels.forEach((carousel) => {
  const viewport = carousel.querySelector('.carousel-viewport');
  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.carousel-button--prev');
  const nextBtn = carousel.querySelector('.carousel-button--next');
  const cards = Array.from(track?.querySelectorAll('.project-card, .language-card') || []);

  if (!viewport || !track || !prevBtn || !nextBtn || cards.length === 0) {
    return;
  }

  const gapValue = parseFloat(getComputedStyle(track).gap) || 0;
  const step = () => {
    const card = cards[0];
    return card ? card.getBoundingClientRect().width + gapValue : viewport.clientWidth;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - viewport.clientWidth;
    prevBtn.disabled = viewport.scrollLeft <= 0;
    nextBtn.disabled = viewport.scrollLeft >= maxScroll - 1;
  };

  prevBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: -step(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: step(), behavior: 'smooth' });
  });

  viewport.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateButtons);
  });

  window.addEventListener('resize', () => {
    window.requestAnimationFrame(updateButtons);
  });

  track.addEventListener('click', (event) => {
    const card = event.target.closest('.project-card');
    if (card?.dataset.url) {
      abreJanela(card.dataset.url);
    }
  });

  updateButtons();
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

// Funções específicas para os projetos
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
function abreJanelaFive() {
  abreJanela('https://github.com/Karineprates/FinanceAI');
}
function abreJanelaSix() {
  abreJanela('https://github.com/Karineprates/weather_pipeline');
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
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      alert('Mensagem enviada com sucesso!');
      form.reset();
    } else {
      const data = await response.json();
      console.error('Erro do Formspree:', data);
      alert('Erro: ' + (data.error || 'Verifique os campos.'));
    }
  } catch (err) {
    console.error('Erro de rede:', err);
    alert('Erro de rede ou CORS.');
  }
});
