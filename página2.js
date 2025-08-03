const toggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.navbar a');

  toggle.addEventListener('click', () => {
    navbar.classList.toggle('mostrar');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('mostrar');
    });
  });