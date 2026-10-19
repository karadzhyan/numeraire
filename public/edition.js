
(()=>{
 const sections=[...document.querySelectorAll('.ne-volume')];
 const input=document.getElementById('ne-query'),result=document.getElementById('ne-result');
 function filter(){
  const query=input.value.trim().toLocaleLowerCase();let count=0;
  for(const section of sections){
   const match=!query||section.textContent.toLocaleLowerCase().includes(query);
   section.hidden=!match;if(match)count++;
   if(query&&match)section.open=true;
  }
  result.textContent=query?`${count} of 26 volumes`:'26 volumes';
 }
 input.addEventListener('input',filter);
 document.getElementById('ne-expand').addEventListener('click',()=>sections.filter(s=>!s.hidden).forEach(s=>s.open=true));
 document.getElementById('ne-collapse').addEventListener('click',()=>sections.forEach(s=>s.open=false));
 function revealHash(){const id=decodeURIComponent(location.hash.slice(1));const target=document.getElementById(id);if(target?.classList.contains('ne-volume')){input.value='';filter();target.open=true;target.scrollIntoView();}}
 addEventListener('hashchange',revealHash);revealHash();
})();
