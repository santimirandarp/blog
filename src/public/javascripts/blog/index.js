const ULOfPosts = $("#listOfPosts");

const listOfPostsToHTML= (arr, el) => {
arr.forEach(post => {
const {title,date,brief,tags} = post;
const listing = `
<h2>${title}</h2>
<p>${brief}</p>
<p>${date}</p>
<p>${tags}</p>
`
el.insertAdjacentHTML("afterstart",listing);
})
}
window.addEventListener("load", async() => {
const postsMetadata = (await fetch("postsMetadata")).json();
listOfPostsToHTML(listOfPosts, ULOfPosts);
})
