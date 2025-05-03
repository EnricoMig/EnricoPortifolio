document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Altera o ícone do botão
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fecha o menu quando um link é clicado
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuButton.querySelector('i').classList.remove('fa-times');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        });
    });
});