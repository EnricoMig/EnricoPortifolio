
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
        Object.values(p.formacao).forEach(f => {
          const div = document.createElement('div');
          div.textContent = `${f.curso} – ${f.instituicao} (${f.inicio} – ${f.termino})`;
          ed.appendChild(div);
        });

        // Experiência
        const ex = document.getElementById('experience-list');
        Object.values(p.experiencia)
          .filter(x => x.id)
          .forEach(x => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${x.nome}</strong><br><span>${x.inicio} – ${x.termino}${x.ocupacao ? ' | '+x.ocupacao : ''}</span>${x.descricao ? `<p>${x.descricao}</p>` : ''}`;
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

          const perc = lvl[l.nivel.charAt(0).toUpperCase() + l.nivel.slice(1)] || 0;
          new Chart(canvas, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: [perc, 100 - perc],
                backgroundColor: [`rgba(33,150,243,${perc/100})`, '#eee'],
                borderWidth: 0
              }]
            },
            options: {
              responsive: false,
              cutout: '70%',
              plugins: { legend: { display: false }, tooltip: { enabled: false } }
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