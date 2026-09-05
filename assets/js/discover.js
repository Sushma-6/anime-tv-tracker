const discoverData = [
    {title:'Jujutsu Kaisen', img:'assets/images/jujustu-kaisen.png', year:2020},
    {title:'Chainsaw Man', img:'assets/images/chainsaw-man.jpg', year:2022},
    {title:'Spy x Family', img:'assets/images/spy-x-family.jpg', year:2022},
    {title:'Made in Abyss', img:'assets/images/made-in-abbys.jpeg', year:2017}
  ];
  
  function renderDiscover(list){
    const grid = document.getElementById('discoverGrid');
    grid.innerHTML = '';
    list.forEach(it=>{
      const c = document.createElement('div'); c.className='card';
      c.innerHTML = `
        <img class="thumb" src="${it.img}" alt="${it.title}">
        <div class="card-body">
          <div class="card-title">${it.title}</div>
          <p class="muted">${it.year}</p>
        </div>
      `;
      grid.appendChild(c);
    });
  }
  
  document.addEventListener('DOMContentLoaded',()=>{
    renderDiscover(discoverData);
    const s = document.getElementById('discoverSearch');
    if(s) s.addEventListener('input', e=>{
      const q = e.target.value.toLowerCase();
      renderDiscover(discoverData.filter(it=>it.title.toLowerCase().includes(q)));
    });
  });
  