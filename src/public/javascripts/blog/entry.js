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
<article>
<div class="postListItem_head">
<div class="dateAndTag">
<p class="small">Posted in: ${formatDate(date)}</p>  
<p class="small">Tags: ${formatTags(tags).join(" ")} </p>
</div>
<h2>${title}</h2>
</div>
<p>${brief}</p>
<a href=/blog/post/${path}> Read Full Post </a>
</article>
</li>
`;
HTMLel.insertAdjacentHTML("afterbegin",listing);
return 0;
});};

window.addEventListener("load", () => {
fetch("/blog/listOfPosts")
.then(r=>r.json())
.then(r=>listOfPostsToHTML(r, ULOfPosts))
.catch(e => e);
});
