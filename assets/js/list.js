const listData = [
    {title:'Attack on Titan', img:'assets/images/attack-on-titan.avif', progress:'75/75', state:'Completed'},
    {title:'Demon Slayer', img:'assets/images/demon-slayer.jpg', progress:'22/44', state:'Watching'},
    {title:'One Piece', img:'assets/images/one-piece.jpg.avif', progress:'1050/1100', state:'Watching'},
    {title:'My Hero Academia', img:'assets/images/my-hero-academia.jpg', progress:'0/138', state:'Plan to Watch'}
  ];
  
  function renderList(items){
    const grid = document.getElementById('listGrid');
    grid.innerHTML = '';
    items.forEach(i=>{
      const c = document.createElement('div'); c.className='card';
      c.innerHTML = `
        <img class="thumb" src="${i.img}" alt="${i.title}">
        <div class="card-body">
          <div class="card-title">${i.title} <span style="float:right;color:var(--muted);font-weight:600">${i.state}</span></div>
          <div class="muted">Progress <strong style="float:right">${i.progress}</strong></div>
          <div class="progress"><i style="width:${Math.min(100, (parseInt(i.progress.split('/')[0]) / parseInt(i.progress.split('/')[1]) * 100) || 0)}%"></i></div>
        </div>
      `;
      grid.appendChild(c);
    });
  }
  
  document.addEventListener('DOMContentLoaded',()=>{
    renderList(listData);
    const s = document.getElementById('listSearch');
    if(s) s.addEventListener('input', e=>{
      const q = e.target.value.toLowerCase();
      renderList(listData.filter(it=>it.title.toLowerCase().includes(q)));
    });
  });