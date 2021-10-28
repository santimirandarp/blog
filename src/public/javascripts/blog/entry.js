import {$,formatTags,formatDate} from "../common/common.js";
import {enableComments} from "../common/db.js";

enableComments();

const ULOfPosts = $("#listOfPosts");

const listOfPostsToHTML= (postsMetadata, HTMLel) => {
//takes array of posts' metadata 
//adds each element to HTML element 'el'

postsMetadata.forEach(post => {
const {title,tags,brief,date,path} = post;
const listing = `
<li class="postListItem">
<div class="postListItem_head">
<div class="dateAndTags">
<p class="small">Posted in: ${formatDate(date)}</p>  
<p class="small">Tags: ${formatTags(tags).join(" ")}</p>
</div>
<h1>${title}</h1>
</div>
<p>${brief}</p>
<a href=/blog/post/${path}> Read Full Post </a>
</li>
`;
HTMLel.insertAdjacentHTML("afterbegin",listing);
return 0;
});};

window.addEventListener("load", () => {
const xhrInfo = $("#lastPosts .lastPosts_info");
fetch("/blog/listOfPosts")
.then(r=>{ 
xhrInfo.innerHTML = "Querying the Database for last posts...";
return r.json();
})
.then(r=>{
xhrInfo.innerHTML = "";
return listOfPostsToHTML(r, ULOfPosts);
})
.catch(e => e);
});
