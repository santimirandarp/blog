const ULOfPosts=$("#listOfPosts"),listOfPostsToHTML=(e,a)=>{e.forEach(e=>{var{title:t,tags:s,brief:n,date:o,path:e}=e;a.insertAdjacentHTML("afterstart",`
<div class="postGridElement">
<h2>${t}</h2>
<p>${n}</p>
<p>${o}</p>
<p>${s}</p>
<a href=${e}> Read Full Post </a>
</div>
`)})};window.addEventListener("load",async()=>{const e=await fetch("postsMetadata");var t=e.json();listOfPostsToHTML(t,ULOfPosts)});const $=document.querySelector,mytoggler=e=>{""==e.style.display||"none"==e.style.display?e.style.display="block":e.style.display="none"},comments=$("#comments"),commentsList=comments.getElementById("commentsList"),loadOlderComments=comments.getElementById("loadOlderComments"),thatsIt=comments.querySelector(".comments_thatsIt");thatsIt.style.display="none";const info=$("#comments .comments_info");info.style.display="none";const post=async e=>{const t=await fetch("/comments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return t.json()},postMsg=e=>{const t=$("#comments form");var s=t.querySelector("input[name='name']"),n=t.querySelector("input[name='email']"),o=t.querySelector("textarea[name='msg']");e.preventDefault();const a={name:s.value,email:n.value,msg:o.value};post(a).then(e=>{t.style.display="none",info.style.display="block",info.innerHTML=`<happy/>; ${e.msg}. Comment will be public shortly (we show a preview).`,commentsList.insertAdjacentHTML("afterbegin",commentToHTML(a)),setTimeout(()=>{info.style.display="none",info.innerHTML=""},3e3)}).catch(()=>console.log("There was an error"))},commentToDOM=e=>{0!=e.length?e.forEach(e=>commentsList.insertAdjacentHTML("beforeend",commentToHTML(e))):(thatsIt.innerHTML="All comments were loaded.",thatsIt.style.display="block",setTimeout(()=>thatsIt.style.display="none",3e3))},commentToHTML=({name:e,msg:t,date:s},n=!0)=>`<li class="comments_message ${n=n?"comments_message-preview":null}">`+`<h3>${e}</h3><p>${t}</p><p>${s}</p>`+"</li>",skipLimit=e=>[e,e+10],getComments=async e=>{e=`comments/${e[0]}/${e[1]}`;const t=await fetch(e);return t.json()};window.addEventListener("load",()=>getComments(skipLimit(0)).then(e=>commentToDOM(e)).catch(()=>console.error("There was a problem"))),loadOlderComments.addEventListener("click",()=>{var e=commentsList.children.length;get(skipLimit(e)).then(e=>commentToDOM(e)).catch(()=>console.error("There was a problem"))}),toggleForm.addEventListener("click",()=>mytoggler($("#comments form"))),form.addEventListener("submit",postMsg);const gallery=$("#gallery .imgGal");window.addEventListener("load",async()=>{const e=await fetch("/gallery"),t=e.json().images;t.forEach(e=>{const t=e.slice(8);var s=t.replace(/_/g," ").split(".")[0],s=`<a href="images/gallery/${t}">
    <figure class="pictures">
    <img loading='lazy' src='images/gallery/${e}' alt='${s}'/>
    <figcaption>${s}</figcaption>
    </figure></a>`;gallery.insertAdjacentHTML("beforeend",s)})});const spans=document.querySelectorAll(".places .reviewSpan");spans.forEach(t=>{t.addEventListener("click",()=>{var e=t.nextElementSibling();mytoggler(e)})});