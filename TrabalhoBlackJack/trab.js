function carregar(pagina, classe) {
  fetch(pagina)
    .then(res => res.text())
    .then(html => {
      const section = document.getElementById('content');
      section.innerHTML = html;
      section.className = '';        
      section.classList.add(classe); 
    });
}