// projects.js - Versão corrigida e completa
document.addEventListener('DOMContentLoaded', function() {
    // 1. Configurações iniciais
    const projectsUrl = '/assets/data/projects.json';
    const container = document.getElementById('projetosContainer');
    
    // 2. Mostra estado de carregamento
    container.innerHTML = '<div class="loading-state"><i class="fas fa-spinner fa-spin"></i> Carregando projetos...</div>';

    // 3. Função para corrigir caminhos de imagens
    const resolveImagePath = (imgPath) => {
        if (!imgPath || imgPath.includes("[Adicione")) {
            return 'assets/images/cardBlank.svg';
        }
        
        // Remove './' do início se existir
        if (imgPath.startsWith('./')) {
            imgPath = imgPath.substring(2);
        }
        
        // Se já começa com assets/, mantém
        if (imgPath.startsWith('assets/')) {
            return imgPath;
        }
        
        // Se começa com images/, assume assets/images/
        if (imgPath.startsWith('images/')) {
            return `assets/${imgPath}`;
        }
        
        // Padrão final: assume assets/images/
        return `assets/images/${imgPath}`;
    };

    // 4. Função para criar um card de projeto
    function createProjectCard(project) {
        const card = document.createElement('article');
        card.className = 'project-card';
        
        // Obtém a imagem de capa correta
        const coverImage = resolveImagePath(project.midias?.capa);
        
        // HTML do card
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${coverImage}" 
                     alt="Capa do projeto ${project.nome}" 
                     class="card-image"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='assets/images/cardBlank.svg'">
            </div>
            <div class="card-content">
                <h3>${project.nome}</h3>
                <div class="tech-tags">
                    ${project.techs.map(tech => `
                        <span class="tech-tag" data-tech="${tech.toLowerCase()}">${tech}</span>
                    `).join('')}
                </div>
                <p>${project.descricao}</p>
                <div class="card-actions">
                    <a href="projects/index.html?id=${project.id}" class="card-button">
                        Ver Detalhes <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
        
        // 5. Evento para links externos (se existirem)
        if (project.links?.demo) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.card-button')) {
                    window.open(project.links.demo, '_blank');
                }
            });
            card.style.cursor = 'pointer';
        }
        
        return card;
    }

    // 6. Carrega os projetos
    fetch(projectsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Limpa mensagem de carregamento
            container.innerHTML = '';
            
            // Filtra projetos válidos
            const validProjects = data.projetos.filter(project => 
                !project.nome.includes("[Adicione") && 
                !project.descricao.includes("[Adicione")
            );
            
            // Adiciona cards ao container
            validProjects.forEach(project => {
                container.appendChild(createProjectCard(project));
            });
            
            // Mensagem se não houver projetos
            if (validProjects.length === 0) {
                container.innerHTML = `
                    <div class="no-projects">
                        <i class="fas fa-info-circle"></i>
                        <p>Nenhum projeto disponível no momento</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Falha ao carregar projetos:', error);
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Erro ao carregar projetos</h3>
                    <p>${error.message}</p>
                    <button onclick="window.location.reload()" class="retry-button">
                        <i class="fas fa-sync-alt"></i> Tentar novamente
                    </button>
                </div>
            `;
        });
});

