  // Textos para a animação
  const texts = ["Enrico Migliorini", "EnricoMig DEV"];
  const subtitle = "\"Programando sempre o Melhor Possivel.\"";
  
  // Variáveis de controle
  let currentText = "";
  let isDeleting = false;
  let typingSpeed = 150;
  let phase = 0; // 0: Digitar nome, 1: Apagar nome, 2: Digitar RICKMIG DEV

  function type() {
      const typingElement = document.getElementById("typing-text");
      const subtitleElement = document.getElementById("typing-subtitle");
      
      // Fase 0: Digita "Enrico Migliorini"
      if (phase === 0) {
          currentText = texts[0].substring(0, currentText.length + 1);
          typingElement.innerHTML = currentText;
          
          if (currentText === texts[0]) {
              phase = 1;
              setTimeout(type, 2000); // Pausa antes de apagar
          } else {
              setTimeout(type, typingSpeed);
          }
      } 
      // Fase 1: Apaga "Enrico Migliorini"
      else if (phase === 1) {
          currentText = texts[0].substring(0, currentText.length - 1);
          typingElement.innerHTML = currentText;
          
          if (currentText === "") {
              phase = 2;
              setTimeout(type, 500); // Pausa antes de RICKMIG DEV
          } else {
              setTimeout(type, 50);
          }
      } 
      // Fase 2: Digita "RICKMIG DEV" (final)
      else if (phase === 2) {
          currentText = texts[1].substring(0, currentText.length + 1);
          typingElement.innerHTML = currentText;
          
          if (currentText === texts[1]) {
              typingElement.classList.add("complete"); // Remove cursor
              subtitleElement.classList.remove("hidden");
              typeSubtitle(); // Inicia animação do subtítulo
              return; // Encerra a animação principal
          } else {
              setTimeout(type, typingSpeed);
          }
      }
  }

  // Animação do subtítulo
  function typeSubtitle() {
      let i = 0;
      const subtitleElement = document.getElementById("typing-subtitle");
      subtitleElement.innerHTML = "";
      
      const typingInterval = setInterval(() => {
          if (i < subtitle.length) {
              subtitleElement.innerHTML += subtitle.charAt(i);
              i++;
          } else {
              subtitleElement.classList.add("complete"); // Remove cursor
              clearInterval(typingInterval);
          }
      }, 50);
  }

  // Inicia a animação quando a página carrega
  window.onload = function() {
      type();
  };