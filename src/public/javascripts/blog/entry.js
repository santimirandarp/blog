import {$} from "../common/common.js";

// After blog page loads get metadata and display a grid.
const ULOfPosts = $("#listOfPosts");

const listOfPostsToHTML= (postsMetadata, HTMLel) => {
//takes array of posts' metadata 
//adds each element to HTML element 'el'
postsMetadata.forEach(post => {
const {title,tags,brief,date,path} = post;
const listing = `
<div class="postGridElement">
<h2>${title}</h2>
<p>${brief}</p>
<p>${date}</p>
<p>${tags}</p>
<a href=/blog/post/${path}> Read Full Post </a>
</div>
`;
HTMLel.insertAdjacentHTML("afterbegin",listing);
return 0;
});};

window.addEventListener("load", () => {
fetch("/blog/listOfPosts")
.then(r=>r.json())
.then(r=>listOfPostsToHTML(r, ULOfPosts))
.catch(e=>e);
});
