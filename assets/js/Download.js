
  document.getElementById('btnDownloadCV').addEventListener('click', () => {
    const url = '../assets/files/Enrico_Curriculo.pdf';
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Curriculo_Enrico_Migliorini.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });