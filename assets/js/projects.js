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
            <img src="${projeto.imagem}" alt="${projeto.titulo}" loading="lazy">
            <div class="projeto-content">
                <h3>${projeto.titulo}</h3>
                <div class="tech-tags">
                    ${projeto.tecnologias.map(tech => 
                        `<span class="tech-tag" data-tech="${tech.toLowerCase()}">${tech}</span>`
                    ).join('')}
                </div>
                <p>${projeto.descricao}</p>
            </div>
        `;

        // Adiciona clique se houver link
        if (projeto.link && projeto.link !== '#') {
            card.addEventListener('click', () => {
                window.open(projeto.link, '_blank');
            });
            card.style.cursor = 'pointer';
            card.title = "Abrir projeto";
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
            
            // Cria e adiciona os cards
            data.projetos.forEach(projeto => {
                const card = createProjectCard(projeto);
                container.appendChild(card);
            });
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

// Adiciona este CSS dinâmico para mensagens
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
`;
document.head.appendChild(style);