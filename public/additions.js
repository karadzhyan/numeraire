
(()=>{const root=document.getElementById('ne-source-editions');if(!root)return;
const shelves=[...root.querySelectorAll('.ne-source-edition')],input=document.getElementById('ne-shelf-query'),status=document.getElementById('ne-shelf-result');
function filter(){const q=input.value.trim().toLocaleLowerCase();let count=0;
for(const shelf of shelves){const items=[...shelf.querySelectorAll('.ne-source-list li')];let visible=0;
for(const item of items){const match=!q||item.textContent.toLocaleLowerCase().includes(q)||shelf.querySelector('summary').textContent.toLocaleLowerCase().includes(q);item.hidden=!match;if(match)visible++;}
shelf.hidden=q&&!visible;if(q&&visible)shelf.open=true;count+=visible;}
status.textContent=q?`${count} matching pages`:'347 reading pages';}
input.addEventListener('input',filter);
function reveal(){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target?.classList.contains('ne-source-edition')){input.value='';filter();target.open=true;target.scrollIntoView();}}
addEventListener('hashchange',reveal);reveal();})();
