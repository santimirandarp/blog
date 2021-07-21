const gallery = $("#gallery .imgGal");

window.addEventListener("load", ()=>{
const response = await fetch("gallery");
const images = response.json().images;
images.forEach(img => {
const bigImageName = img.slice(8,);
const text= bigImageName.replace(/_/g, " ").split('.')[0];
const imageHTML = `<a href="images/gallery/${bigImageName}">
    <figure class="pictures">
    <img loading='lazy' src='images/gallery/${img}' alt='${text}'/>
    <figcaption>${text}</figcaption>
    </figure></a>`;
gallery.insertAdjacentHTML("beforeend", imageHTML);
})
}
