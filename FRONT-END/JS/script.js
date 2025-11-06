/* ======= home.js (corrigido) ======= */

document.addEventListener('DOMContentLoaded', () => {
  /* ======= MODO ESCURO ======= */
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      darkToggle.textContent =
        document.body.classList.contains('dark') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    });
  }

  /* ======= CARROSSEL (deslizamento real) ======= */
  const carouselEl = document.querySelector('.carousel');
  const track = document.querySelector('.carousel-container');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (carouselEl && track) {
    let slideIndex = 0;
    const slides = Array.from(track.children);

    function updateCarousel() {
      const w = carouselEl.clientWidth;
      track.style.transform = `translateX(${-slideIndex * w}px)`;
    }

    // botões
    if (nextBtn) nextBtn.addEventListener('click', () => {
      slideIndex = (slideIndex + 1) % slides.length;
      updateCarousel();
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // auto-rotate
    let auto = setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);

    // pause on hover
    carouselEl.addEventListener('mouseenter', () => clearInterval(auto));
    carouselEl.addEventListener('mouseleave', () => {
      clearInterval(auto);
      auto = setInterval(() => {
        slideIndex = (slideIndex + 1) % slides.length;
        updateCarousel();
      }, 5000);
    });

    // recalc on resize
    window.addEventListener('resize', updateCarousel);

    // initial position
    updateCarousel();
  }

  /* ======= EMOJIS DE HUMOR ======= */
  const emojis = document.querySelectorAll('.emoji');
  const humorMessage = document.getElementById('humorMessage');
  if (emojis && humorMessage) {
    emojis.forEach((emoji) => {
      emoji.addEventListener('click', () => {
        const msg = emoji.getAttribute('data-msg') || '';
        humorMessage.textContent = msg;
        humorMessage.classList.add('show');
        // remove a classe depois de 3s (se quiser apagar o texto, comente a linha abaixo)
        setTimeout(() => humorMessage.classList.remove('show'), 3000);
      });
    });
  }

  /* ======= MODAL DE DICAS (cards) ======= */
  const infoModal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const closeInfoModal = document.getElementById('closeInfoModal');

  // textos (já fornecidos antes)
  const dicas = {
    ansiedade: {
      titulo: "Ansiedade",
      texto: `A ansiedade pode vir de repente, mas ela não define você. 🌿
👉 Experimente o exercício 4-7-8: inspire por 4s, segure por 7s e expire por 8s. Repita 3x.
Tente também: caminhada curta, música calma ou escrever o que sente.`
    },
    depressao: {
      titulo: "Depressão",
      texto: `A depressão é uma batalha silenciosa, não precisa ser enfrentada sozinha/o. 💙
👉 Faça uma pequena tarefa (abrir janela, banho rápido, caminhar). Cada passo conta.
Procure um amigo de confiança ou ajuda profissional quando puder.`
    },
    luto: {
      titulo: "Luto",
      texto: `O luto é o amor em processo de reorganização. 🕊️
👉 Permita-se sentir; escrever uma carta pode ajudar a expressar emoções.
Compartilhar lembranças com alguém de confiança ajuda a transformar a saudade em carinho.`
    },
    autismo: {
      titulo: "Autismo",
      texto: `O autismo é um jeito único de experienciar o mundo. 💫
👉 Ofereça paciência, reduza estímulos excessivos e respeite o tempo da pessoa.
Valorize pequenas conquistas e comunique-se de forma clara e gentil.`
    },
    conflitos: {
      titulo: "Conflitos familiares",
      texto: `Conflitos são normais, mas podem ser oportunidades de crescimento. ❤️
👉 Respire antes de responder, evite acusações e fale sobre sentimentos.
Proponha um momento calmo para conversar e busque escuta ativa.`
    }
  };

  // abre modal ao clicar no card
  document.querySelectorAll('.card[data-topic]').forEach(card => {
    card.addEventListener('click', () => {
      const topic = card.dataset.topic;
      if (dicas[topic]) {
        modalTitle.textContent = dicas[topic].titulo;
        modalText.textContent = dicas[topic].texto;
        if (infoModal) infoModal.style.display = 'block';
      }
    });
  });

  // fecha modal ao clicar no X
  if (closeInfoModal) closeInfoModal.addEventListener('click', () => {
    if (infoModal) infoModal.style.display = 'none';
  });

  /* ======= BLOCO DE NOTAS (modal separado) ======= */
  const notesModal = document.getElementById('notesModal');
  const addNoteBtn = document.getElementById('addNoteBtn');
  const closeNotesBtn = document.getElementById('closeModal');
  const newNoteBtn = document.getElementById('newNoteBtn');
  const notesContainer = document.getElementById('notesContainer');

  if (addNoteBtn && notesModal) {
    addNoteBtn.addEventListener('click', () => notesModal.style.display = 'block');
  }
  if (closeNotesBtn && notesModal) {
    closeNotesBtn.addEventListener('click', () => notesModal.style.display = 'none');
  }
  if (newNoteBtn && notesContainer) {
    newNoteBtn.addEventListener('click', () => {
      const div = document.createElement('div');
      div.className = 'note';
      div.contentEditable = true;
      div.textContent = 'Nova nota...'; 
      notesContainer.appendChild(div);
    });
  }

  /* ======= EVENTO GLOBAL DE CLIQUE PARA FECHAR MODAIS (sem sobrescrever) ======= */
  document.addEventListener('click', (e) => {
    // se clicou no fundo do infoModal
    if (infoModal && e.target === infoModal) infoModal.style.display = 'none';
    // se clicou no fundo do notesModal
    if (notesModal && e.target === notesModal) notesModal.style.display = 'none';
  });

});