// Demo data and render for continue watching
const demo = [
    {title:'Demon Slayer', img:'assets/images/demon-slayer.jpg', progress:'22/44', year:2019},
    {title:'One Piece', img:'assets/images/one-piece.jpg.avif', progress:'1050/1100', year:1999},
    {title:'Attack on Titan', img:'assets/images/attack-on-titan.avif', progress:'75/75', year:2013}
  ];
  
  function renderContinue(){
    const container = document.getElementById('continueGrid');
    if(!container) return;
    container.innerHTML = '';
    demo.forEach(item=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img class="thumb" src="${item.img}" alt="${item.title}">
        <div class="card-body">
          <div class="card-title">${item.title}</div>
          <div class="muted">Progress <strong style="float:right">${item.progress}</strong></div>
          <div class="progress"><i style="width:${Math.min(100, (parseInt(item.progress.split('/')[0]) / parseInt(item.progress.split('/')[1]) * 100) || 50)}%"></i></div>
          <p class="muted" style="margin-top:8px">${item.year}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded',renderContinue);
  
  