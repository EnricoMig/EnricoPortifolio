document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('skillsTrack');
    const speed = 0.5; // pixels por frame
    
    // Cria tags e duplica para efeito contínuo
    function createTags() {
        // Cria 3 cópias do conjunto de skills para looping suave
        for (let i = 0; i < 3; i++) {
            skills.forEach((skill, index) => {
                const tag = document.createElement('span');
                tag.className = `skill-tag ${skill.class}`;
                tag.textContent = skill.name;
                track.appendChild(tag);
                
                // Adiciona o separador após cada skill, exceto a última de cada bloco
                // (mas adiciona em todos os blocos para manter a continuidade)
                const separator = document.createElement('span');
                separator.className = 'separator-dot';
                track.appendChild(separator);
            });
        }
    }
    
    createTags();
    
    // Animação suave com requestAnimationFrame
    let position = 0;
    let animationId;
    const trackWidth = track.scrollWidth / 3; // Largura de uma cópia completa
    
    function animate() {
        position -= speed;
        
        // Reinicia a posição quando uma cópia completa sai da tela
        if (position < -trackWidth) {
            position += trackWidth;
        }
        
        track.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
    }
    
    // Inicia animação
    animationId = requestAnimationFrame(animate);
    
    // Pausa/Restaura no hover (opcional)
    track.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
    });
    
    track.addEventListener('mouseleave', () => {
        animationId = requestAnimationFrame(animate);
    });
});