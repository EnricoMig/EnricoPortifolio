document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.getElementById('navLinks');

    mobileMenuButton.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  });