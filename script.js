/* ============================================
   🎂 Nanduu's 22nd Birthday Experience
   Interactive Logic
   ============================================ */

(function () {
  'use strict';

  /* ── Gallery Data ── */
  const galleryPhotos = [
    { src: 'IMG_20221013_090715_868.jpg', caption: 'A moment to remember ✨', alt: 'Pranathi in red dress' },
    { src: 'IMG_20230516_203835.jpg', caption: 'A little adventure, a lot of joy 🚲', alt: 'Pranathi with a bicycle' },
    { src: 'IMG_20220926_203538_193.jpg', caption: 'The people who make life beautiful 💛', alt: 'Group photo on rooftop' },
    { src: 'IMG_20241101_134158_010.jpg', caption: 'Glowing from the inside out 🪔', alt: 'Pranathi in festive saree' },
    { src: 'IMG_20251012_152039.jpg', caption: 'One for the memory books 📖', alt: 'Friends at restaurant' },
    { src: 'IMG_20251012_152103.jpg', caption: 'Good times with great people 🤗', alt: 'Friends group photo' },
    { src: 'IMG_20251012_152104.jpg', caption: 'A little memory, a lot of happiness 💗', alt: 'Friends together' },
  ];

  /* ── Quiz Data ── */
  const quizData = [
    {
      question: "What's the perfect birthday morning?",
      options: [
        { emoji: '☀️', text: 'Sleeping in until noon — birthday queen rules', response: "Absolutely! Rest is self-care, and you deserve ALL of it. 😴✨" },
        { emoji: '🥞', text: 'Waking up to a surprise breakfast', response: "The best kind of morning — food and love! 🥰" },
        { emoji: '🎶', text: 'Dancing to your favourite song first thing', response: "Main character energy right there! Dance like nobody's watching! 💃" },
        { emoji: '📱', text: 'Reading all those sweet birthday messages', response: "Each message is a little hug from someone who loves you! 💗" },
      ],
    },
    {
      question: 'Choose your perfect birthday celebration:',
      options: [
        { emoji: '🎉', text: 'A big surprise party with everyone', response: "The more the merrier! You deserve a room full of love! 🥳" },
        { emoji: '🍰', text: 'A cozy hangout with your closest people', response: "Small circles, big hearts — the best kind of celebration! 💛" },
        { emoji: '✈️', text: 'A surprise trip to somewhere new', response: "Adventure awaits! The world is your birthday gift! 🌍" },
        { emoji: '🎬', text: 'Movie marathon with snacks and zero plans', response: "Pure comfort. Zero stress. Maximum vibes. Perfect! 🍿" },
      ],
    },
    {
      question: 'Pick a superpower for your 22nd year:',
      options: [
        { emoji: '⏰', text: 'The ability to pause time on happy moments', response: "Imagine freezing every laugh, every sunset, every hug. Beautiful choice! ⏸️✨" },
        { emoji: '🌟', text: 'Attracting good luck wherever you go', response: "You already have this one, honestly. It's called being YOU! 🍀" },
        { emoji: '🗣️', text: 'Always knowing the perfect thing to say', response: "Smooth, witty, and kind — the ultimate combo! 😎" },
        { emoji: '💫', text: 'Making everyone around you smile', response: "Spoiler alert: you already have this power, Nanduu! 💗" },
      ],
    },
    {
      question: 'Choose your next big adventure:',
      options: [
        { emoji: '🏔️', text: 'Trekking through mountains at sunrise', response: "The world looks different from the top. Go conquer those peaks! 🌄" },
        { emoji: '🎨', text: 'Learning something creative and surprising', response: "You've got the spark of an artist. Create something beautiful! 🖌️" },
        { emoji: '📚', text: 'Getting lost in a new city or a great book', response: "Whether it's pages or places, the journey is always worth it! 🗺️" },
        { emoji: '🎤', text: "Doing something bold you've never tried", response: "22 is your year to be fearless. Go for it! 🔥" },
      ],
    },
    {
      question: "What's the ideal birthday treat?",
      options: [
        { emoji: '🎂', text: 'A giant, over-the-top birthday cake', response: "Go big or go home! You deserve the tallest, prettiest cake! 🍰" },
        { emoji: '🍫', text: 'Chocolate — in any form, all forms', response: "A fellow chocolate lover! Life is short, eat the chocolate! 🍫💗" },
        { emoji: '🍕', text: 'Forget cake, give me pizza', response: "Honestly? Pizza IS a birthday cake if you believe hard enough! 🤣" },
        { emoji: '🧁', text: 'Something small and homemade with love', response: "The sweetest treats are the ones made with love. Just like this website! 🥰" },
      ],
    },
  ];

  /* ── DOM Elements ── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const introOverlay = $('#introOverlay');
  const introBtn = $('#introBtn');
  const mainContent = $('#mainContent');
  const progressBar = $('#progressBar');
  const backToTop = $('#backToTop');
  const confettiCanvas = $('#confetti-canvas');

  // Lightbox
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxCaption = $('#lightboxCaption');
  const lightboxClose = $('#lightboxClose');
  const lightboxPrev = $('#lightboxPrev');
  const lightboxNext = $('#lightboxNext');

  // Quiz
  const quizProgress = $('#quizProgress');
  const quizQNum = $('#quizQNum');
  const quizQuestion = $('#quizQuestion');
  const quizOptions = $('#quizOptions');
  const quizQuestionArea = $('#quizQuestionArea');
  const quizResponse = $('#quizResponse');
  const quizResponseEmoji = $('#quizResponseEmoji');
  const quizResponseText = $('#quizResponseText');
  const quizNextBtn = $('#quizNextBtn');
  const quizResult = $('#quizResult');
  const quizRestartBtn = $('#quizRestartBtn');

  // Gift
  const giftBox = $('#giftBox');
  const giftBoxWrapper = $('#giftBoxWrapper');
  const giftHint = $('#giftHint');
  const giftMessage = $('#giftMessage');

  // Wish
  const wishRevealBtn = $('#wishRevealBtn');
  const wishCard = $('#wishCard');

  // Replay
  const replayBtn = $('#replayBtn');

  /* ── State ── */
  let lightboxIndex = 0;
  let quizIndex = 0;
  let giftOpened = false;

  /* ═══════════════════════════════════════
     INTRO
     ═══════════════════════════════════════ */
  // Generate floating hearts for intro
  function createIntroHearts() {
    const container = $('#introHearts');
    if (!container) return;
    const hearts = ['💗', '💖', '💕', '🌸', '✨', '🎀', '🎂', '💝', '♥'];
    for (let i = 0; i < 20; i++) {
      const span = document.createElement('span');
      span.className = 'fh';
      span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
      span.style.animationDelay = (Math.random() * 6) + 's';
      span.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(span);
    }
  }
  createIntroHearts();

  // Open surprise button
  introBtn.addEventListener('click', function () {
    introOverlay.classList.add('hidden');
    mainContent.classList.add('visible');
    // Fire confetti for the grand entrance
    setTimeout(() => fireConfetti(3), 400);
    // Remove overlay from DOM after animation
    setTimeout(() => {
      introOverlay.style.display = 'none';
    }, 1000);
  });

  /* ═══════════════════════════════════════
     SCROLL PROGRESS & BACK TO TOP
     ═══════════════════════════════════════ */
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    if (scrollTop > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ═══════════════════════════════════════
     SCROLL REVEAL (Intersection Observer)
     ═══════════════════════════════════════ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  $$('.reveal').forEach((el) => revealObserver.observe(el));

  /* ═══════════════════════════════════════
     LIGHTBOX / GALLERY
     ═══════════════════════════════════════ */
  function openLightbox(index) {
    lightboxIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const photo = galleryPhotos[lightboxIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    lightboxCaption.textContent = photo.caption;
  }

  function lightboxPrevFn() {
    lightboxIndex = (lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    updateLightboxImage();
  }

  function lightboxNextFn() {
    lightboxIndex = (lightboxIndex + 1) % galleryPhotos.length;
    updateLightboxImage();
  }

  // Memory card clicks
  $$('.memory-card').forEach((card) => {
    card.addEventListener('click', function () {
      const idx = parseInt(this.dataset.index, 10);
      openLightbox(idx);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', lightboxPrevFn);
  lightboxNext.addEventListener('click', lightboxNextFn);

  // Close on backdrop click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard nav
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrevFn();
    if (e.key === 'ArrowRight') lightboxNextFn();
  });

  // Touch swipe for lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) lightboxNextFn();
      else lightboxPrevFn();
    }
  }, { passive: true });

  /* ═══════════════════════════════════════
     QUIZ ENGINE
     ═══════════════════════════════════════ */
  function initQuiz() {
    quizIndex = 0;
    quizResult.classList.remove('active');
    quizResult.style.display = 'none';
    quizQuestionArea.style.display = '';
    quizResponse.classList.remove('active');
    renderQuizProgress();
    renderQuizQuestion();
  }

  function renderQuizProgress() {
    quizProgress.innerHTML = '';
    for (let i = 0; i < quizData.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'quiz-progress-dot';
      if (i < quizIndex) dot.classList.add('completed');
      if (i === quizIndex) dot.classList.add('active');
      quizProgress.appendChild(dot);
    }
  }

  function renderQuizQuestion() {
    const data = quizData[quizIndex];
    quizQNum.textContent = `Question ${quizIndex + 1} of ${quizData.length}`;
    quizQuestion.textContent = data.question;
    quizOptions.innerHTML = '';
    quizQuestionArea.style.display = '';
    quizResponse.classList.remove('active');

    data.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="quiz-option-emoji">${opt.emoji}</span><span>${opt.text}</span>`;
      btn.addEventListener('click', () => selectQuizOption(i));
      quizOptions.appendChild(btn);
    });
  }

  function selectQuizOption(optIndex) {
    // Highlight selected
    $$('.quiz-option').forEach((btn, i) => {
      btn.classList.toggle('selected', i === optIndex);
      btn.disabled = true;
    });

    const data = quizData[quizIndex];
    const opt = data.options[optIndex];

    // Show response after a brief moment
    setTimeout(() => {
      quizQuestionArea.style.display = 'none';
      quizResponseEmoji.textContent = opt.emoji;
      quizResponseText.textContent = opt.response;
      quizResponse.classList.add('active');

      // Update button text for last question
      if (quizIndex >= quizData.length - 1) {
        quizNextBtn.textContent = 'See My Result 🎉';
      } else {
        quizNextBtn.textContent = 'Next Question →';
      }
    }, 500);
  }

  quizNextBtn.addEventListener('click', function () {
    quizIndex++;
    if (quizIndex >= quizData.length) {
      // Show final result
      quizQuestionArea.style.display = 'none';
      quizResponse.classList.remove('active');
      quizResult.style.display = '';
      quizResult.classList.add('active');
      quizProgress.innerHTML = '';
      // Confetti!
      fireConfetti(2);
    } else {
      renderQuizProgress();
      renderQuizQuestion();
    }
  });

  quizRestartBtn.addEventListener('click', initQuiz);

  // Init quiz on load
  initQuiz();

  /* ═══════════════════════════════════════
     GIFT BOX
     ═══════════════════════════════════════ */
  giftBoxWrapper.addEventListener('click', function () {
    if (giftOpened) return;
    giftOpened = true;

    giftBox.classList.add('opened');
    giftHint.style.display = 'none';

    // Fire confetti
    setTimeout(() => fireConfetti(4), 300);

    // Show message
    setTimeout(() => {
      giftBoxWrapper.style.display = 'none';
      giftMessage.classList.add('visible');
    }, 1200);
  });

  /* ═══════════════════════════════════════
     WISH WALL
     ═══════════════════════════════════════ */
  wishRevealBtn.addEventListener('click', function () {
    wishRevealBtn.classList.add('is-hidden');
    wishCard.classList.add('visible');

    // Animate lines one by one
    const lines = wishCard.querySelectorAll('.wish-line');
    lines.forEach((line) => {
      const delay = parseInt(line.dataset.delay, 10) || 0;
      setTimeout(() => {
        line.classList.add('visible');
      }, delay);
    });
  });

  /* ═══════════════════════════════════════
     FINAL PARTICLES
     ═══════════════════════════════════════ */
  function createFinalParticles() {
    const container = $('#finalParticles');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.className = 'final-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 3) + 's';
      p.style.animationDuration = (2 + Math.random() * 3) + 's';
      p.style.width = (2 + Math.random() * 4) + 'px';
      p.style.height = p.style.width;
      const colors = ['#f9a8d4', '#d8b4fe', '#fbcfe8', '#fde68a', '#ffffff'];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(p);
    }
  }
  createFinalParticles();

  /* ═══════════════════════════════════════
     REPLAY
     ═══════════════════════════════════════ */
  replayBtn.addEventListener('click', function () {
    // Reset gift
    giftOpened = false;
    giftBox.classList.remove('opened');
    giftBoxWrapper.style.display = '';
    giftHint.style.display = '';
    giftMessage.classList.remove('visible');

    // Reset wish
    wishRevealBtn.classList.remove('is-hidden');
    wishCard.classList.remove('visible');
    wishCard.querySelectorAll('.wish-line').forEach((l) => l.classList.remove('visible'));

    // Reset quiz
    initQuiz();

    // Show intro overlay
    introOverlay.style.display = '';
    mainContent.classList.remove('visible');
    // Small delay then show intro
    requestAnimationFrame(() => {
      introOverlay.classList.remove('hidden');
    });

    window.scrollTo({ top: 0, behavior: 'auto' });
  });

  /* ═══════════════════════════════════════
     CONFETTI SYSTEM (Canvas)
     ═══════════════════════════════════════ */
  const ctx = confettiCanvas.getContext('2d');
  let confettiParticles = [];
  let confettiAnimating = false;

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class ConfettiPiece {
    constructor() {
      this.x = Math.random() * confettiCanvas.width;
      this.y = -10 - Math.random() * 100;
      this.w = 6 + Math.random() * 6;
      this.h = 4 + Math.random() * 4;
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = 2 + Math.random() * 3;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 8;
      this.opacity = 1;
      this.decay = 0.003 + Math.random() * 0.005;
      const colors = [
        '#ec4899', '#f472b6', '#c084fc', '#d8b4fe',
        '#f9a8d4', '#fde68a', '#a78bfa', '#fb7185',
        '#f0abfc', '#e879f9', '#f59e0b', '#ffffff',
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx;
      this.vy += 0.04; // gravity
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.opacity -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      ctx.restore();
    }
    isDead() {
      return this.opacity <= 0 || this.y > confettiCanvas.height + 20;
    }
  }

  function fireConfetti(waves) {
    waves = waves || 1;
    for (let w = 0; w < waves; w++) {
      setTimeout(() => {
        for (let i = 0; i < 60; i++) {
          confettiParticles.push(new ConfettiPiece());
        }
      }, w * 300);
    }
    if (!confettiAnimating) {
      confettiAnimating = true;
      animateConfetti();
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach((p) => {
      p.update();
      p.draw();
    });
    confettiParticles = confettiParticles.filter((p) => !p.isDead());
    if (confettiParticles.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimating = false;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  /* ═══════════════════════════════════════
     IMAGE ERROR HANDLING
     ═══════════════════════════════════════ */
  $$('img').forEach((img) => {
    img.addEventListener('error', function () {
      this.style.display = 'none';
      const parent = this.parentElement;
      if (parent) {
        parent.style.background = 'linear-gradient(135deg, #fce7f3, #e9d5ff)';
        parent.style.display = 'flex';
        parent.style.alignItems = 'center';
        parent.style.justifyContent = 'center';
        const placeholder = document.createElement('span');
        placeholder.textContent = '📷';
        placeholder.style.fontSize = '3rem';
        placeholder.style.opacity = '0.4';
        parent.appendChild(placeholder);
      }
    });
  });

})();
