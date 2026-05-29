document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.querySelector('.navbar');
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileMenuClose = document.querySelector('.mobile-menu-close');
  var mobileLinks = document.querySelectorAll('.mobile-menu a');

  // Navbar scroll
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function () {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Intersection Observer animations
  var animatedEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Reservation form -> WhatsApp
  var form = document.getElementById('reservation-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('res-name').value.trim();
      var date = document.getElementById('res-date').value;
      var time = document.getElementById('res-time').value;
      var guests = document.getElementById('res-guests').value;
      var notes = document.getElementById('res-notes').value.trim();

      var msg = 'Hola! Quiero hacer una reserva en Kajue Caf\u00e9:\n';
      if (name) msg += '*Nombre:* ' + name + '\n';
      if (date) msg += '*Fecha:* ' + date + '\n';
      if (time) msg += '*Horario:* ' + time + '\n';
      if (guests) msg += '*Personas:* ' + guests + '\n';
      if (notes) msg += '*Nota:* ' + notes + '\n';

      var whatsappUrl = 'https://wa.me/5491125440989?text=' + encodeURIComponent(msg);
      window.open(whatsappUrl, '_blank');
    });
  }
});
