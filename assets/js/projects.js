document.addEventListener('DOMContentLoaded', function() {
    // URL do JSON (com barra no início para caminho absoluto)
    const projectsUrl = '/assets/data/projects.json';
    
    // Elemento container onde os cards serão inseridos
    const container = document.getElementById('projetosContainer');
    
    // Mostra estado de carregamento
    container.innerHTML = '<p class="loading-message">Carregando projetos...</p>';

    // Função para criar um card de projeto
    function createProjectCard(projeto) {
        const card = document.createElement('article');
        card.className = 'projeto-card';
        
        if (projeto.placeholder) {
            card.classList.add('placeholder');
        }

        // Template do card
        card.innerHTML = `
            <img src="${projeto.imagem || 'assets/images/default-project.jpg'}" 
                 alt="${projeto.nome || 'Projeto sem nome'}" 
                 loading="lazy">
            <div class="projeto-content">
                <h3>${projeto.nome || 'Novo Projeto'}</h3>
                <div class="tech-tags">
                    ${(projeto.techs || []).map(tech => 
                        `<span class="tech-tag" data-tech="${tech.toLowerCase()}">${tech}</span>`
                    ).join('')}
                </div>
                <p>${projeto.descricao || 'Descrição não disponível'}</p>
                <div class="card-actions">
                    <button class="view-details-btn">Ver detalhes</button>
                </div>
            </div>
        `;

        // Adiciona evento de clique para redirecionar para a página de detalhes
        const detailsBtn = card.querySelector('.view-details-btn');
        detailsBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflito com outros event listeners
            window.location.href = `pages/projects.html?id=${projeto.id}`;
        });

        // Se houver link externo, mantemos a funcionalidade original
        if (projeto.links && projeto.links.demo) {
            card.addEventListener('click', () => {
                window.open(projeto.links.demo, '_blank');
            });
            card.style.cursor = 'pointer';
            card.title = "Abrir demonstração do projeto";
        }

        return card;
    }

    // Carrega os projetos
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
            
            // Verifica se existem projetos
            if (!data.projetos || data.projetos.length === 0) {
                throw new Error('Nenhum projeto encontrado no arquivo.');
            }
            
            // Filtra projetos que não são placeholders
            const projetosValidos = data.projetos.filter(projeto => 
                !projeto.nome.includes('[Adicione') && 
                !projeto.descricao.includes('[Adicione')
            );
            
            // Cria e adiciona os cards
            projetosValidos.forEach(projeto => {
                const card = createProjectCard(projeto);
                container.appendChild(card);
            });

            // Se não houver projetos válidos
            if (projetosValidos.length === 0) {
                container.innerHTML = `
                    <div class="no-projects-message">
                        <p>Nenhum projeto disponível no momento</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Falha ao carregar projetos:', error);
            container.innerHTML = `
                <div class="error-message">
                    <h3>Não foi possível carregar os projetos</h3>
                    <p>${error.message}</p>
                    <p>Por favor, tente recarregar a página ou entre em contato.</p>
                </div>
            `;
        });
});

// Adiciona este CSS dinâmico para mensagens e botões
const style = document.createElement('style');
style.textContent = `
    .loading-message {
        text-align: center;
        padding: 2rem;
        color: #666;
        font-style: italic;
    }
    .error-message {
        text-align: center;
        padding: 2rem;
        color: #d32f2f;
        background: rgba(211, 47, 47, 0.1);
        border-radius: 8px;
        max-width: 600px;
        margin: 0 auto;
    }
    .error-message h3 {
        color: inherit;
    }
    .no-projects-message {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    .card-actions {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }
    .view-details-btn {
        background-color: #00cec9;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .view-details-btn:hover {
        background-color: #00a8a5;
    }
    .projeto-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);