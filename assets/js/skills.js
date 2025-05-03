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