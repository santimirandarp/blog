const toggler=e=>{""==e.style.display||"none"==e.style.display?e.style.display="block":e.style.display="none"},form=document.getElementById("comments_form"),toggleForm=document.getElementById("comments_toggleForm"),commentList=document.getElementById("comments_commentList"),moreComments=document.getElementById("comments_moreComments"),post=async e=>{const o=await fetch("/comments",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",redirect:"follow",referrerPolicy:"no-referrer",body:new FormData(e)});return o.json()},postMsg=e=>{e.preventDefault(),post(form).then(e=>{form.insertAdjacentHtml("beforebegin",`<p style='background-color:rgba(0,125,0,0.1);border:1px solid rgba(0,125,0,0.6)'>${JSON.stringify(e)}</p>`),console.log(e)}).catch(e=>console.log(e))},skipLimit=e=>[e,e+10],get=async e=>{let o="comments/";o+=e?`${e[0]}/${e[1]}`:"0/10";const t=await fetch(o,{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",redirect:"follow",referrerPolicy:"no-referrer"});return t.json()};window.addEventListener("load",e=>get().then(e=>console.log(e)).catch(e=>console.log(e))),moreComments.addEventListener("click",e=>{var o=commentList.children.length;console.log("nOfComments is ",o),get(skipLimit(o)).then(e=>console.log(e)).catch(e=>console.log(e))}),toggleForm.addEventListener("click",()=>toggler(form)),form.addEventListener("submit",postMsg);const spans=document.querySelectorAll(".places .reviewSpan");spans.forEach(t=>{t.addEventListener("click",e=>{var o=t.nextElementSibling;toggler(o)})});