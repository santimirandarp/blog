import {$} from "../common/common.js";
const gallery = $("#gallery .imgGal");

const insertImg = imgName=>{
//name for the big scale image
const bigImageName = imgName.slice(8,);

//build the description text.
const text= bigImageName.replace(/_/g, " ").split(".")[0];
const imageHTML = ` <a href="images/gallery/${bigImageName}">
    <figure class="pictures">
    <img loading='lazy' src='images/gallery/${imgName}' alt='${text}'/>
    <figcaption>${text}</figcaption>
    </figure></a>`;
gallery.insertAdjacentHTML("beforeend", imageHTML);
};



window.addEventListener("load", ()=>{
fetch("/gallery").then(r=>r.json())
.then(imgFilenames=>imgFilenames.images.forEach(imgName => insertImg(imgName)))
.catch(e=>{ 
gallery.innerHTML = "We couldn't load the images. Please refresh the page or try again later.";
console.error(e);
});});
