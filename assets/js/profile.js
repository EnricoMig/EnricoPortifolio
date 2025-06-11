fetch('../assets/data/profile.json')
  .then(r => r.json())
  .then(data => {
    const p = data.profile[0];
    // Foto e infos pessoais
    document.getElementById('photo').src = p.photo;
    const i = p.infos, e = i.endereco;
    document.getElementById('personal-info').innerHTML = `
      <p><strong>${i.nacionalidade}</strong></p>
      <p>${i["estado-civil"]}, ${i.idade} anos</p>
      <p>${e.logradouro}, ${e.numero}</p>
      <p>${e.bairro}, ${e.municipio} - ${e.UF}</p>`;
    document.getElementById('personal-links').innerHTML = `
      <a href="${p.links.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
      <a href="${p.links.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
      <a href="${p.links.github}" target="_blank"><i class="fab fa-github"></i></a>
      <a href="mailto:${p.links.email}"><i class="fas fa-envelope"></i></a>`;

    // Overview
    document.getElementById('nome').textContent = p.nome;
    document.getElementById('objetivo').textContent = p.objetivo;
    document.getElementById('qualificacoes').textContent = p.qualificacoes;

    // Formação
    const ed = document.getElementById('education-list');
    const formacoes = Object.values(p.formacao)
      .sort((a, b) => new Date(b.termino) - new Date(a.termino)); // continua ordenando por termino

      formacoes.forEach((f, idx) => {
        const div = document.createElement('div');
        div.innerHTML = `${f.curso} (${f.inicio} – ${f.termino})<br><small>${f.instituicao}</small>`;
        if (idx === 0) div.classList.add('destaque-recente');
        ed.appendChild(div);
      });
      

    function parseDataInicio(data) {
      if (!data) return new Date(0);
      const lower = data.toLowerCase();
      if (lower === 'atualmente' || lower === 'atuando') {
        return new Date(8640000000000000);
      }
      return new Date(data);
    }

    const ex = document.getElementById('experience-list');

    const experiencias = Object.values(p.experiencia)
      .filter(x => x.id)
      .sort((a, b) => parseDataInicio(b.inicio) - parseDataInicio(a.inicio)); // ordena pela data de início

    experiencias.forEach((x) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${x.nome}</strong><br>
        <span>${x.inicio} – ${x.termino}${x.ocupacao ? ' | ' + x.ocupacao : ''}</span>
        ${x.descricao ? `<p>${x.descricao}</p>` : ''}
      `;
      if (x.nome && x.nome.toUpperCase().includes('ZOE')) {
        div.querySelector('strong').textContent =x.nome + '  ⭐';
      }
      ex.appendChild(div);
    });

    // Tecnologias – barras
    const lvl = { Basico:25, Intermediario:50, Avancado:75, Profissional:100 };
    const techGrid = document.getElementById('tech-grid');
    const mapPac = {};
    Object.values(p.tecnologias).forEach(t => {
      const pack = t.pacote || 'Outros';
      if (!mapPac[pack]) mapPac[pack] = [];
      mapPac[pack].push(t);
    });
    Object.keys(mapPac).forEach(pack => {
      const col = document.createElement('div');
      col.className = 'tech-col';
      const ul = document.createElement('ul');
      mapPac[pack].forEach(t => {
        const perc = lvl[t.nivel] || 0;
        const li = document.createElement('li');
        li.innerHTML = `
          <div>${t.titulo} (${t.nivel})</div>
          <div class="tech-bar"><div class="tech-bar-fill" style="width:${perc}%"></div></div>`;
        ul.appendChild(li);
      });
      col.appendChild(ul);
      techGrid.appendChild(col);
    });

    // Idiomas – roscas
    const langGrid = document.getElementById('lang-grid');
    const mapNivel = {
      basico: 25,
      intermediario: 50,
      avancado: 75,
      profissional: 100,
      fluente: 100,
      nativo: 100
    };
    Object.values(p.idiomas).forEach(l => {
      const div = document.createElement('div');
      div.className = 'lang-item';
      const canvas = document.createElement('canvas');
      div.appendChild(canvas);
      const lbl = document.createElement('div');
      lbl.textContent = `${l.titulo} — ${l.nivel}`;
      lbl.style.marginTop = '8px';
      div.appendChild(lbl);
      langGrid.appendChild(div);

      const nivelKey = l.nivel.trim().toLowerCase();
      const perc = mapNivel[nivelKey] || 0;

      new Chart(canvas, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [perc, Math.max(0.01, 100 - perc)],
            backgroundColor: [
              '#2196f3',
              '#3f3f40'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: false,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });
    });

    // Atividades complementares
    const xl = document.getElementById('extra-list');
    p.complementares.forEach(txt => {
      const li = document.createElement('li');
      li.textContent = txt;
      xl.appendChild(li);
    });
  })
  .catch(console.error);
