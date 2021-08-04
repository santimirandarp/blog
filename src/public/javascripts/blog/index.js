// When the /blog page loads we call the database for the metadata and display a grid.
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
</div>
`;
HTMLel.insertAdjacentHTML("afterstart",listing);
});};

window.addEventListener("load", async() => {
const response = await fetch("postsMetadata");
const postsMetadata = response.json();
listOfPostsToHTML(postsMetadata, ULOfPosts);
});
