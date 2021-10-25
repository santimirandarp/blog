import {$} from "../common/common.js";
const gallery = $("#gallery .imgGal");

window.addEventListener("load", async()=>{
const response = await fetch("/gallery");
const imgFilenames = response.json().images;
//filenames for small, gallery images.
imgFilenames.forEach(imgName => {

//build name for the big scale image
const bigImageName = imgName.slice(8,);

//build the description text.
const text= bigImageName.replace(/_/g, " ").split(".")[0];
const imageHTML = `<a href="images/gallery/${bigImageName}">
    <figure class="pictures">
    <img loading='lazy' src='images/gallery/${imgName}' alt='${text}'/>
    <figcaption>${text}</figcaption>
    </figure></a>`;
gallery.insertAdjacentHTML("beforeend", imageHTML);
});
});
