document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/data/tech.json')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar habilidades');
            return response.json();
        })
        .then(data => {
            const skillsTrack = document.getElementById('skillsTrack');
            
            data.skills.forEach(skill => {
                const skillIcon = document.createElement('div');
                skillIcon.className = 'skill-icon';
                skillIcon.setAttribute('data-name', skill.name);
                
                if (skill.type === 'devicon') {
                    skillIcon.innerHTML = `<i class="${skill.iconClass}"></i>`;
                } else if (skill.type === 'svg') {
                    skillIcon.innerHTML = skill.iconSVG;
                } else if (skill.type === 'image') {
                    skillIcon.innerHTML = `<img src="${skill.iconPath}" alt="${skill.name}">`;
                }
                
                skillsTrack.appendChild(skillIcon);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            // Fallback estático
            const fallbackSkills = [
                {name: 'HTML5', icon: 'devicon-html5-plain', type: 'devicon'},
                {name: 'CSS3', icon: 'devicon-css3-plain', type: 'devicon'},
                {name: 'JavaScript', icon: 'devicon-javascript-plain', type: 'devicon'}
            ];
            
            fallbackSkills.forEach(skill => {
                const skillIcon = document.createElement('div');
                skillIcon.className = 'skill-icon';
                skillIcon.innerHTML = `<i class="${skill.icon}"></i>`;
                document.getElementById('skillsTrack').appendChild(skillIcon);
            });
        });
});


// assets/js/skills.js
document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('.skill-icon');
    
    skills.forEach(skill => {
        // Tooltip para desktop
        skill.addEventListener('mouseenter', function(e) {
            if (window.innerWidth > 768) {
                const tooltip = document.createElement('div');
                tooltip.className = 'skill-tooltip';
                tooltip.textContent = this.getAttribute('data-name');
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
                tooltip.style.top = `${rect.top - 40}px`;
                
                this.addEventListener('mouseleave', () => {
                    tooltip.remove();
                }, { once: true });
            }
        });
        
        // Feedback tátil para mobile
        skill.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        skill.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
});