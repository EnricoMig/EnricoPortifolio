document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/data/tech.json')
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar habilidades");
        return response.json();
      })
      .then(data => {
        const container = document.getElementById('skillsTrack');
        container.innerHTML = '';

        data.skills.forEach(skill => {
          const skillDiv = document.createElement('div');
          skillDiv.className = 'skill-item';

          let iconContent;
          if (skill.type === "svg" && skill.iconSVG) {
            iconContent = `
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                ${skill.iconSVG.replace('fill="#fff"', 'fill="white"')}
              </div>
            `;
          } else {
            iconContent = `<i class="devicon ${skill.iconClass}"></i>`;
          }

          skillDiv.innerHTML = `
            <div class="skill-icon">
              ${iconContent}
            </div>
          `;

          container.appendChild(skillDiv);
        });
      })
      .catch(error => {
        console.error("Erro:", error);
        document.getElementById('skillsTrack').innerHTML = `
          <p class="error">⚠️ Falha ao carregar habilidades. Recarregue a página.</p>
        `;
      });
  });
