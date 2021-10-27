const $ = document.querySelector.bind(document);

const mytoggler = element => {
  element.style.display=="" || element.style.display=="none"? 
    element.style.display="block": element.style.display="none";
};

const formatTags = (tags)=>{
let newTags = [];
let randomRGB = []; 

for(let i=0;i<3;i++){ const val = Math.floor(Math.random()*256)+1;
randomRGB.push(val);}
tags.forEach(tag=>
newTags.push(`<span 
style="background-color:rgba(${randomRGB.toString(",")},0.5)" 
class="small">${tag}</span>`));
return newTags;
};
const formatDate = (date)=>date.slice(0,10).replace(/-/g,"/");

export {$,mytoggler,formatTags,formatDate};
