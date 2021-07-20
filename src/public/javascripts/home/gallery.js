const gallery = document.getElementById("gallery");
const loadGallery = async (route)=>{
const response = await fetch(route, {   
method: "GET", 
headers: { "Content-Type": "application/json" },
});
return response.json();
};

window.addEventListener("load", ()=>{
const images = await loadGallery("gallery")
images.forEach(img => {
const bigImageName = img.slice(8,) 
const text= bigImageName.replace(/_/g, " ").split('.')[0] 
const imageHTML = `<a href="images/gallery/${bigImageName}">
    <figure class="pictures">
    <img loading='lazy' src='images/gallery/${img}' alt='${text}'/>
    <figcaption>${text}</figcaption>
    </figure></a>`
gallery.insertAdjacentHTML("beforeend", imageHTML)
})
}
