    // Função para corrigir caminhos de imagens
    function fixImagePath(imgPath) {
        // Remove './' do início se existir
        if (imgPath.startsWith('./')) {
            imgPath = imgPath.substring(2);
        }
        
        // Se já começa com assets/, ajusta para relativo
        if (imgPath.startsWith('assets/')) {
            return `../${imgPath}`;
        }
        
        // Se começa com images/, assume assets/images/
        if (imgPath.startsWith('images/')) {
            return `../assets/${imgPath}`;
        }
        
        // Padrão final para outros casos
        return `../assets/images/${imgPath}`;
    }

    document.addEventListener("DOMContentLoaded", async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        if (!projectId) {
            window.location.href = "../index.html";
            return;
        }

        try {
            const response = await fetch("../assets/data/projects.json");
            const data = await response.json();
            const project = data.projetos.find(p => p.id == projectId);

            if (!project) throw new Error("Projeto não encontrado");

            // Preenche os dados do projeto
            document.getElementById("project-title").textContent = project.nome;
            
            // Descrição + História
            document.getElementById("project-description").innerHTML = `
                <h2 class="section-title">Descrição</h2>
                <p class="paragraph">${project.descricao}</p>
                
                ${project.historia ? `
                <h2 class="section-title">História do Projeto</h2>
                <p class="paragraph">${project.historia}</p>
                ` : ''}
            `;

            // Tecnologias
            const techDiv = document.getElementById("project-technologies");
            techDiv.innerHTML = `
                <h2 class="section-title">Tecnologias Utilizadas</h2>
                <div class="tech-badges">
                    ${project.techs.map(tech => `
                        <span class="tech-badge">${tech}</span>
                    `).join('')}
                </div>
            `;

            // Galeria de Imagens
            const gallery = document.getElementById("project-media");
            project.midias.imagens.forEach(img => {
                if (!img.includes("[Adicione")) {
                    const correctedPath = fixImagePath(img);
                    gallery.innerHTML += `
                        <div class="media-item">
                            <img src="${correctedPath}" 
                                 alt="${project.nome}" 
                                 class="media-image"
                                 onerror="this.parentElement.style.display='none'">
                            <div class="media-caption">${project.nome}</div>
                        </div>
                    `;
                }
            });

            // Links do Projeto
            const linksDiv = document.getElementById("project-links");
            let linksHTML = '<h2 class="section-title">Links Relacionados</h2><div class="links-grid">';
            
            for (const [key, value] of Object.entries(project.links)) {
                if (value && !value.includes("[Adicione")) {
                    const icon = key === 'github' ? '<i class="fab fa-github"></i>' : 
                                key === 'documentacao' ? '<i class="fas fa-file-alt"></i>' : '<i class="fas fa-link"></i>';
                    const linkText = key === 'github' ? 'Repositório' : 
                                    key === 'documentacao' ? 'Documentação' : 'Link';
                    linksHTML += `
                        <a href="${value}" target="_blank" class="project-link">
                            ${icon} ${linkText}
                        </a>
                    `;
                }
            }
            
            linksDiv.innerHTML = linksHTML + '</div>';

        } catch (error) {
            console.error("Erro ao carregar projeto:", error);
            alert("Projeto não encontrado ou erro ao carregar dados!");
            window.location.href = "../index.html";
        }
    });