/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $('body'),
    $wrapper = $('#page-wrapper'),
    $banner = $('#banner'),
    $header = $('#header');

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px'],
  });

  // Play initial animations on page load.
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Mobile?
  if (browser.mobile) $body.addClass('is-mobile');
  else {
    breakpoints.on('>medium', function () {
      $body.removeClass('is-mobile');
    });

    breakpoints.on('<=medium', function () {
      $body.addClass('is-mobile');
    });
  }

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1500,
    offset: $header.outerHeight(),
  });

  // Menu.
  $('#menu')
    .append('<a href="#menu" class="close"></a>')
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'right',
      target: $body,
      visibleClass: 'is-menu-visible',
    });

  // Header.
  if ($banner.length > 0 && $header.hasClass('alt')) {
    $window.on('resize', function () {
      $window.trigger('scroll');
    });

    $banner.scrollex({
      bottom: $header.outerHeight() + 1,
      terminate: function () {
        $header.removeClass('alt');
      },
      enter: function () {
        $header.addClass('alt');
      },
      leave: function () {
        $header.removeClass('alt');
      },
    });
  }
})(jQuery);


document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('carouselTrack');
  const reviewCards = document.querySelectorAll('.review-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  let currentIndex = 0;
  const cardWidth = reviewCards[0].offsetWidth + 30; // largura + gap
  const totalCards = reviewCards.length;
  
  // Calcular quantas cards mostrar por vez
  function getVisibleCards() {
    const containerWidth = track.parentElement.offsetWidth;
    return Math.floor(containerWidth / cardWidth);
  }
  
  // Criar dots
  function createDots() {
    const visibleCards = getVisibleCards();
    const totalDots = Math.max(1, totalCards - visibleCards + 1);
    
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    
    updateDots();
  }
  
  // Atualizar dots
  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Ir para slide específico
  function goToSlide(index) {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    
    const offset = -currentIndex * cardWidth;
    track.style.transform = `translateX(${offset}px)`;
    
    updateDots();
    updateButtons();
  }
  
  // Próximo slide
  function nextSlide() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    if (currentIndex < maxIndex) {
      currentIndex++;
      goToSlide(currentIndex);
    }
  }
  
  // Slide anterior
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      goToSlide(currentIndex);
    }
  }
  
  // Atualizar botões
  function updateButtons() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Navegação por teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
  
  // Auto-play (opcional)
  let autoPlay = setInterval(() => {
    if (currentIndex < Math.max(0, totalCards - getVisibleCards())) {
      nextSlide();
    } else {
      goToSlide(0);
    }
  }, 5000);
  
  // Parar auto-play ao hover
  track.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
  });
  
  track.parentElement.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
      if (currentIndex < Math.max(0, totalCards - getVisibleCards())) {
        nextSlide();
      } else {
        goToSlide(0);
      }
    }, 5000);
  });
  
  // Responsividade
  window.addEventListener('resize', () => {
    createDots();
    goToSlide(currentIndex);
  });
  
  // Inicializar
  createDots();
  updateButtons();
  
  // Atualizar ao carregar
  setTimeout(() => {
    createDots();
    goToSlide(0);
  }, 100);
});

