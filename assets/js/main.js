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
    // Abrir Drawer
    /*
    $('.btn-open-drawer').on('click', function(e) {
        e.preventDefault();
        var targetId = $(this).data('target');
        $('#' + targetId).toggleClass('show')
    });
    $('.btn-close-drawer').on('click', function(e) {
        e.preventDefault();
        var targetId = $(this).data('target');
        $('#' + targetId).toggleClass('show')
    }); */

    // === DRAWER UX ENHANCEMENTS ===
// Fecha TODOS os drawers
// Fecha TODOS os drawers + restaura scroll da página
function closeAllDrawers() {
  $('#tech-drawer, #mic-drawer').removeClass('show');
  $('body').removeClass('is-drawer-visible');
  
  // Restaura scroll da página ao fechar
  $('body').css({
    'overflow': '',
    'position': '',
    'width': '',
    'height': ''
  });
}

// Fecha drawer ao pressionar ESC
$(document).on('keydown', function(e) {
  if ((e.key === 'Escape' || e.keyCode === 27) && $('body').hasClass('is-drawer-visible')) {
    closeAllDrawers();
  }
});

// Fecha drawer ao clicar FORA da área do drawer
$(document).on('click', function(e) {
  // Só fecha se houver drawer aberto
  if (!$('body').hasClass('is-drawer-visible')) return;
  
  // Ignora cliques DENTRO de qualquer drawer
  if ($(e.target).closest('#tech-drawer, #mic-drawer').length) return;
  
  // Ignora cliques nos botões que ABREM drawers (evita flicker)
  if ($(e.target).closest('.btn-open-drawer').length) return;
  
  // Fecha todos os drawers
  closeAllDrawers();
});

  // Botão para ABRIR drawer (fecha outros antes de abrir)
$('.btn-open-drawer').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
    
  const targetId = $(this).data('target');
  const $targetDrawer = $('#' + targetId);
    
  // Fecha outros drawers antes de abrir
    if (!$targetDrawer.hasClass('show')) {
      closeAllDrawers();
      $targetDrawer.addClass('show');
      $('body').addClass('is-drawer-visible');
    }
  });

  // Botão para FECHAR drawer (dentro do drawer)
$('.btn-close-drawer').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeAllDrawers();
  });

})(jQuery);