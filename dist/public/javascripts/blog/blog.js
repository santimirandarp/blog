import $ from"./../common/index.js";const ULOfPosts=$("#listOfPosts"),listOfPostsToHTML=(t,i)=>{t.forEach(t=>{var{title:s,tags:a,brief:o,date:e,path:t}=t;i.insertAdjacentHTML("afterstart",`
<div class="postGridElement">
<h2>${s}</h2>
<p>${o}</p>
<p>${e}</p>
<p>${a}</p>
<a href=${t}> Read Full Post </a>
</div>
`)})};window.addEventListener("load",async()=>{const t=await fetch("postsMetadata");var s=t.json();listOfPostsToHTML(s,ULOfPosts)});