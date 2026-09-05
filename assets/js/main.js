// Main shared scripts: theme toggle, year
(function(){
    const yearEls = ['year','year2','year3','year4'];
    yearEls.forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.textContent = new Date().getFullYear();
    });
  
    function initToggle(btnId){
      const btn = document.getElementById(btnId);
      if(!btn) return;
      btn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        btn.textContent = isDark ? 'Light' : 'Dark';
      });
    }
    ['themeToggle','themeToggle2','themeToggle3','themeToggle4'].forEach(initToggle);
  })();